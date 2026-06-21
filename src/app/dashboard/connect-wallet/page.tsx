"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Wallet, CheckCircle2, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import apiClient from "@/lib/apiClient";

export default function ConnectWalletPage() {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState("");
    const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const res = await apiClient.getWallet();
                if (res.data && res.data.connected_wallet) {
                    setAddress(res.data.connected_wallet);
                    setConnected(true);
                }
            } catch (err) {
                console.error("Failed to fetch wallet info:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWallet();
    }, []);

    const wallets = [
        { id: "metamask", name: "MetaMask", description: "Connect to your MetaMask wallet", color: "orange" },
        { id: "trustwallet", name: "Trust Wallet", description: "Connect using Trust Wallet app", color: "blue" },
        { id: "coinbase", name: "Coinbase Wallet", description: "Use Coinbase Wallet extension", color: "indigo" },
        { id: "walletconnect", name: "WalletConnect", description: "Scan QR code with your mobile wallet", color: "sky" },
    ];

    const generateMockAddress = () => {
        const chars = "0123456789abcdef";
        let addr = "0x";
        for(let i=0; i<40; i++) addr += chars[Math.floor(Math.random() * chars.length)];
        return addr;
    };

    const handleConnect = async (walletId: string) => {
        setConnectingWallet(walletId);
        // Simulate a 2-second connection delay to mimic real web3 behavior
        setTimeout(async () => {
            try {
                const newAddress = generateMockAddress();
                // Store in backend
                await apiClient.connectWallet({ address: newAddress });
                
                setAddress(newAddress);
                setConnected(true);
                toast.success("Wallet connected securely!");
            } catch (err: any) {
                toast.error(err.message || "Failed to save wallet connection.");
            } finally {
                setConnectingWallet(null);
            }
        }, 2000);
    };

    const handleDisconnect = async () => {
        try {
            // Unset in backend by sending empty string or handling a disconnect route
            // For now we just set it to empty
            await apiClient.connectWallet({ address: "" });
            setConnected(false);
            setAddress("");
            toast.success("Wallet disconnected.");
        } catch(err: any) {
            toast.error(err.message || "Failed to disconnect wallet.");
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Connect Wallet</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Link your cryptocurrency wallet for seamless deposits and withdrawals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="group bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl overflow-hidden relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] hover:border-sky-300 dark:hover:ring-sky-500/50">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        <Wallet size={80} />
                    </div>
                    <CardHeader className="relative z-10">
                        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Wallet className="text-sky-500 dark:text-sky-400" /> My Wallet
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10">
                        {connected ? (
                            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-emerald-500" />
                                        <div>
                                            <p className="text-sm text-emerald-400 font-medium">Wallet Connected</p>
                                            <p className="text-lg font-bold text-slate-900 dark:text-white tracking-wider">{address}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white" onClick={() => {
                                        navigator.clipboard.writeText(address);
                                        toast.success("Address copied");
                                    }}>
                                        <Copy size={16} />
                                    </Button>
                                </div>
                                <Button onClick={handleDisconnect} variant="outline" className="w-full bg-transparent border-rose-500/50 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400 h-12 transition-all">
                                    Disconnect Wallet
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-sm text-slate-400 mb-6">Select a wallet provider to connect securely to your Noble Edge account. We will never ask for your seed phrase.</p>
                                
                                <div className="grid gap-3">
                                    {wallets.map((wallet) => (
                                        <button
                                            key={wallet.id}
                                            onClick={() => handleConnect(wallet.id)}
                                            disabled={connectingWallet !== null}
                                            className={`w-full group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${connectingWallet === wallet.id ? 'bg-sky-50 dark:bg-slate-800 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.2)] dark:shadow-[0_0_15px_rgba(14,165,233,0.3)]' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'} ${connectingWallet && connectingWallet !== wallet.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${wallet.color}-500/10 text-${wallet.color}-500 group-hover:scale-110 transition-transform`}>
                                                    <Wallet size={20} />
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="text-slate-900 dark:text-white font-bold text-sm">{wallet.name}</h3>
                                                    <p className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">{wallet.description}</p>
                                                </div>
                                            </div>
                                            
                                            {connectingWallet === wallet.id ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                                                    <span className="text-xs font-bold text-sky-400 animate-pulse">Connecting...</span>
                                                </div>
                                            ) : (
                                                <Link2 size={18} className="text-slate-400 group-hover:text-sky-500 dark:group-hover:text-white transition-colors" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
