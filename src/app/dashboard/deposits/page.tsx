"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bitcoin, Wallet, Copy, CheckCircle2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/apiClient";

export default function DepositsPage() {
    const { user } = useAuth();
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("");
    const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
    const [copied, setCopied] = useState(false);
    const [walletAddresses, setWalletAddresses] = useState<Record<string, string>>({});
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await apiClient.getDepositAddresses();
                if (response.success) {
                    setWalletAddresses(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch deposit addresses:", err);
                setError("Failed to load deposit addresses");
            }
        };

        fetchAddresses();
    }, []);

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("processing");
        setError("");

        try {
            const response = await apiClient.submitDeposit({
                type: "deposit",
                amount: parseFloat(amount),
                currency: method.toUpperCase(),
                crypto_network: method.toUpperCase(),
            });

            if (response.success) {
                setStatus("success");
                setCopied(false);
            } else {
                setError(response.message || "Deposit submission failed");
                setStatus("idle");
            }
        } catch (err: any) {
            setError(err.message || "Failed to submit deposit");
            setStatus("idle");
        }
    };

    const copyAddress = () => {
        if (method && walletAddresses[method]) {
            navigator.clipboard.writeText(walletAddresses[method]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Fund Your Account</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Add funds securely using cryptocurrency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Deposit Details</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400">Select your preferred payment method and amount.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="p-3 mb-4 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
                                {error}
                            </div>
                        )}
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                                <div className="w-16 h-16 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center mb-2">
                                    <Wallet size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Awaiting Payment</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                                    Please send exactly <span className="text-slate-900 dark:text-white font-bold">${amount}</span> via {method.toUpperCase()} to the address below. Your balance will be credited by our admin once the deposit is verified.
                                </p>

                                <div className="w-full max-w-sm mt-4 p-4 bg-slate-50 dark:bg-[#020617] border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 text-left">
                                        {{
                                            BTC: "Bitcoin Address",
                                            ETH: "Ethereum Address",
                                            USDT_TRC20: "USDT TRC20 Address",
                                            USDT_ERC20: "USDT BEP20 Address",
                                            ZELLE: "Zelle Email / Phone",
                                            APPLE_PAY: "Apple Pay ID",
                                            PAYPAL: "PayPal Email",
                                            BANK_TRANSFER: "Bank Transfer Details",
                                        }[method] || "Deposit Address"}:
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            readOnly
                                            value={walletAddresses[method] || ""}
                                            className="bg-slate-100 dark:bg-[#0f172a] border border-slate-200 dark:border-none text-sky-500 dark:text-sky-400 font-mono text-xs cursor-text font-bold"
                                        />
                                        <Button
                                            onClick={copyAddress}
                                            variant="secondary"
                                            className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white shrink-0"
                                            size="icon"
                                        >
                                            {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                        </Button>
                                    </div>
                                    {copied && <p className="text-xs text-emerald-400 text-left">Address copied to clipboard!</p>}
                                </div>

                                <Button onClick={() => setStatus("idle")} variant="outline" className="mt-6 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                                    Make Another Deposit
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleDeposit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Amount (USD)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                        <Input
                                            type="number"
                                            required
                                            min="50"
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="pl-8 bg-slate-50 dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">Minimum deposit: $50.00</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Payment Method</label>
                                    <Select required value={method} onValueChange={setMethod}>
                                        <SelectTrigger className="w-full bg-slate-50 dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12">
                                            <SelectValue placeholder="Select Payment Method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                                            <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                                            <SelectItem value="USDT_TRC20">Tether (USDT TRC20)</SelectItem>
                                            <SelectItem value="USDT_ERC20">Tether (USDT BEP20)</SelectItem>
                                            <SelectItem value="ZELLE">Zelle</SelectItem>
                                            <SelectItem value="APPLE_PAY">Apple Pay</SelectItem>
                                            <SelectItem value="PAYPAL">PayPal</SelectItem>
                                            <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={status === "processing" || !amount || !method}
                                    className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold h-12"
                                >
                                    {status === "processing" ? "Processing..." : "Proceed to Payment"}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl h-fit">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Deposit Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-start gap-3">
                            <Wallet className="w-5 h-5 text-sky-400 shrink-0" />
                            <p>Funds will be credited manually by our admin after blockchain network confirmations.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Bitcoin className="w-5 h-5 text-amber-400 shrink-0" />
                            <p>Send only the selected cryptocurrency to the generated address. Other assets will be lost.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
