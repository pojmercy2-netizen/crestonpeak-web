"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Gift, Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import { useAuth } from "@/context/AuthContext";

type Tx = {
    id: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
    txn_hash?: string;
    withdrawal_address?: string;
    withdrawal_network?: string;
    admin_note?: string;
};

// ── helpers ──────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<string, string> = {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    roi: "ROI Payout",
    referral: "Referral Bonus",
    investment: "Investment",
};

const STATUS_STYLES: Record<string, string> = {
    pending:   "bg-amber-500/10  text-amber-400  border-amber-500/20",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    approved:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rejected:  "bg-rose-500/10   text-rose-400   border-rose-500/20",
    failed:    "bg-rose-500/10   text-rose-400   border-rose-500/20",
};

function TxIcon({ type }: { type: string }) {
    if (type === "withdrawal" || type === "investment") {
        return <ArrowUpRight size={18} />;
    }
    if (type === "roi" || type === "referral") {
        return type === "referral" ? <Gift size={18} /> : <TrendingUp size={18} />;
    }
    return <ArrowDownRight size={18} />;
}

function txIconBg(type: string) {
    if (type === "withdrawal") return "bg-rose-500/10 text-rose-400";
    if (type === "investment") return "bg-purple-500/10 text-purple-400";
    if (type === "roi") return "bg-sky-500/10 text-sky-400";
    if (type === "referral") return "bg-yellow-500/10 text-yellow-400";
    return "bg-emerald-500/10 text-emerald-400";
}

// ─────────────────────────────────────────────────────────────────────────────

export default function TransactionsPage() {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<Tx[]>([]);
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;
        apiClient.listTransactions().then(r => {
            if (r?.data) setTransactions(r.data);
        }).catch(console.error);
    }, [user]);

    const filtered = transactions.filter(tx =>
        tx.id.toLowerCase().includes(search.toLowerCase()) ||
        tx.type.toLowerCase().includes(search.toLowerCase()) ||
        tx.status.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Transaction History</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">All your deposits, withdrawals, and earnings.</p>
                </div>
                <Button variant="outline" className="w-full sm:w-auto border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Download size={16} className="mr-2" /> Export CSV
                </Button>
            </div>

            <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-200 dark:border-slate-800 p-4 sm:px-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                        <Input
                            placeholder="Search by ID, type, status..."
                            className="pl-10 bg-slate-50 dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 dark:text-slate-500 uppercase bg-slate-50 dark:bg-[#020617]/50">
                                <tr>
                                    <th className="px-4 sm:px-6 py-4 font-semibold">Type / ID</th>
                                    <th className="px-4 sm:px-6 py-4 font-semibold text-center">Amount</th>
                                    <th className="hidden sm:table-cell px-6 py-4 font-semibold">Date</th>
                                    <th className="px-4 sm:px-6 py-4 font-semibold text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                {filtered.length > 0 ? filtered.map(tx => (
                                    <React.Fragment key={tx.id}>
                                        <tr
                                            className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-800/30 last:border-0"
                                            onClick={() => setExpanded(expanded === tx.id ? null : tx.id)}
                                        >
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${txIconBg(tx.type)}`}>
                                                        <TxIcon type={tx.type} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-slate-900 dark:text-white truncate">{TYPE_LABEL[tx.type] ?? tx.type}</p>
                                                        <p className="text-[10px] sm:text-xs text-slate-500 font-mono truncate">{tx.id.slice(0, 8)}…</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`px-4 sm:px-6 py-4 font-bold text-sm sm:text-base text-center whitespace-nowrap ${tx.type === "withdrawal" || tx.type === "investment" ? "text-rose-400" : "text-emerald-400"}`}>
                                                {tx.type === "withdrawal" || tx.type === "investment" ? "−" : "+"}
                                                ${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className="hidden sm:table-cell px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">{new Date(tx.created_at).toLocaleString()}</td>
                                            <td className="px-4 sm:px-6 py-4 text-right">
                                                <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full border whitespace-nowrap ${STATUS_STYLES[tx.status] ?? STATUS_STYLES.pending}`}>
                                                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>

                                        {/* Expandable detail row */}
                                        {expanded === tx.id && (
                                            <tr className="bg-slate-50 dark:bg-[#020617]/60">
                                                <td colSpan={4} className="px-4 sm:px-8 py-4">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-[11px] md:text-xs">
                                                        <div className="sm:hidden mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                                                            <p className="text-slate-500 uppercase font-semibold mb-0.5">Date</p>
                                                            <p className="text-slate-900 dark:text-white">{new Date(tx.created_at).toLocaleString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-500 uppercase font-semibold mb-0.5">Transaction ID</p>
                                                            <p className="text-slate-900 dark:text-white font-mono break-all">{tx.id}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-500 uppercase font-semibold mb-0.5">Currency</p>
                                                            <p className="text-slate-900 dark:text-white">{tx.currency || "—"}</p>
                                                        </div>
                                                        {tx.txn_hash && (
                                                            <div>
                                                                <p className="text-slate-500 uppercase font-semibold mb-0.5">TX Hash</p>
                                                                <p className="text-slate-900 dark:text-white font-mono break-all">{tx.txn_hash}</p>
                                                            </div>
                                                        )}
                                                        {tx.withdrawal_address && (
                                                            <div>
                                                                <p className="text-slate-500 uppercase font-semibold mb-0.5">Withdrawal Address</p>
                                                                <p className="text-slate-900 dark:text-white font-mono break-all">{tx.withdrawal_address}</p>
                                                            </div>
                                                        )}
                                                        {tx.withdrawal_network && (
                                                            <div>
                                                                <p className="text-slate-500 uppercase font-semibold mb-0.5">Network</p>
                                                                <p className="text-slate-900 dark:text-white">{tx.withdrawal_network}</p>
                                                            </div>
                                                        )}
                                                        {tx.admin_note && (
                                                            <div className="sm:col-span-2 md:col-span-1">
                                                                <p className="text-slate-500 uppercase font-semibold mb-0.5">Admin Note</p>
                                                                <p className="text-rose-400">{tx.admin_note}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                            No transactions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
