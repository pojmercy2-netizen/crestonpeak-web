"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, ShieldCheck, AlertCircle } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import apiClient from "@/lib/apiClient";

export default function WithdrawalsPage() {
    const { user } = useAuth();
    const [amount, setAmount] = useState("");
    const [wallet, setWallet] = useState("");
    const [network, setNetwork] = useState("");
    const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
    const [error, setError] = useState("");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await apiClient.getWallet();
                setBalance(response.data?.balance || 0);
            } catch (err) {
                console.error("Failed to fetch balance:", err);
            }
        };

        if (user) {
            fetchBalance();
        }
    }, [user]);

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (Number(amount) > balance) {
            setError("Insufficient balance.");
            return;
        }

        setStatus("processing");

        try {
            const response = await apiClient.submitWithdrawal({
                type: "withdrawal",
                amount: parseFloat(amount),
                currency: "USD",
                withdrawal_address: wallet,
                withdrawal_network: network,
            });

            if (response.success) {
                setStatus("success");
                setAmount("");
                setWallet("");
                setNetwork("");
            } else {
                setError(response.message || "Withdrawal request failed");
                setStatus("idle");
            }
        } catch (err: any) {
            setError(err.message || "Failed to submit withdrawal");
            setStatus("idle");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Withdraw Funds</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Securely withdraw your profits to your crypto wallet.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Withdrawal Details</CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400">Enter withdrawal amount and destination address.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
                                    <ShieldCheck size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Withdrawal Requested!</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
                                        Your request for <span className="text-slate-900 dark:text-white font-bold">${amount}</span> has been received and is under review.
                                    </p>
                                </div>
                                <Button onClick={() => setStatus("idle")} variant="outline" className="mt-4 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                                    New Withdrawal
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleWithdraw} className="space-y-6">
                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded flex items-center gap-2 text-sm">
                                        <AlertCircle size={16} /> {error}
                                    </div>
                                )}
                                <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">Available Balance</span>
                                    <span className="text-xl font-bold text-emerald-500 dark:text-emerald-400">${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Amount (USD)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                            <Input
                                                type="number"
                                                required
                                                min="10"
                                                placeholder="0.00"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="pl-8 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Withdrawal Method / Network</label>
                                        <Select required value={network} onValueChange={setNetwork}>
                                            <SelectTrigger className="w-full bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12">
                                                <SelectValue placeholder="Select Method" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="BTC">Bitcoin Network</SelectItem>
                                                <SelectItem value="ETH">Ethereum (ERC20)</SelectItem>
                                                <SelectItem value="TRC20">Tron (TRC20)</SelectItem>
                                                <SelectItem value="ZELLE">Zelle</SelectItem>
                                                <SelectItem value="APPLE_PAY">Apple Pay</SelectItem>
                                                <SelectItem value="PAYPAL">PayPal</SelectItem>
                                                <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Wallet / Payment Address</label>
                                        <Input
                                            type="text"
                                            required
                                            placeholder="Paste destination address"
                                            value={wallet}
                                            onChange={(e) => setWallet(e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-12 font-mono text-sm"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={status === "processing" || !amount || !wallet || !network}
                                    className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold h-12 disabled:opacity-50 disabled:bg-sky-500/50"
                                >
                                    {status === "processing" ? "Processing..." : "Submit Withdrawal"}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl h-fit">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Security Notice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                            <p>For your security, large withdrawals may require an extra manual review process.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                            <p>Ensure your wallet address is correct. Transactions on the blockchain cannot be reversed.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
