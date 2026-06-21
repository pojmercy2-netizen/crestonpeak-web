"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2, CheckCircle2, X, AlertCircle, Eye, Copy } from "lucide-react";
import apiClient from "@/lib/apiClient";

type Tx = {
    id: string;
    user_id: string;
    user_email?: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    txn_hash?: string;
    withdrawal_address?: string;
    withdrawal_network?: string;
    admin_note?: string;
    usd_equivalent?: number;
    created_at: string;
};

const TYPE_LABEL: Record<string, string> = {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    roi: "ROI Payout",
    referral: "Referral",
    investment: "Investment",
};

const TYPE_STYLES: Record<string, string> = {
    deposit:    "bg-emerald-500/10 text-emerald-400",
    withdrawal: "bg-rose-500/10    text-rose-400",
    roi:        "bg-sky-500/10     text-sky-400",
    referral:   "bg-yellow-500/10  text-yellow-400",
    investment: "bg-purple-500/10  text-purple-400",
};

const STATUS_STYLES: Record<string, string> = {
    pending:   "bg-amber-500/10   text-amber-400   border-amber-500/30",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    approved:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    rejected:  "bg-rose-500/10    text-rose-400    border-rose-500/30",
    failed:    "bg-rose-500/10    text-rose-400    border-rose-500/30",
};

function CopyBtn({ value }: { value: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            className="ml-1 text-slate-500 hover:text-sky-400 transition-colors"
            onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
            title="Copy"
        >
            {copied ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
        </button>
    );
}

export default function AdminTransactionsPage() {
    const [transactions, setTransactions] = useState<Tx[]>([]);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Deposit approve modal
    const [approvingTx, setApprovingTx] = useState<Tx | null>(null);
    const [usdAmount, setUsdAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Detail modal
    const [detailTx, setDetailTx] = useState<Tx | null>(null);

    const fetchAll = async () => {
        try {
            const resp = await apiClient.listAllTransactions();
            setTransactions(resp?.data || []);
        } catch (err: any) {
            setError(err.message || "Failed to load transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAll(); }, []);

    const filtered = transactions.filter(tx => {
        const matchType = typeFilter === "all" || tx.type === typeFilter;
        const q = search.toLowerCase();
        const matchSearch =
            tx.id.toLowerCase().includes(q) ||
            tx.user_id.toLowerCase().includes(q) ||
            (tx.user_email?.toLowerCase().includes(q) ?? false) ||
            tx.type.toLowerCase().includes(q) ||
            tx.status.toLowerCase().includes(q);
        return matchType && matchSearch;
    });

    const handleApproveDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!approvingTx || !usdAmount) return;
        setIsSubmitting(true);
        try {
            await apiClient.approveDeposit(approvingTx.id, parseFloat(usdAmount));
            await fetchAll();
            setApprovingTx(null);
            setUsdAmount("");
        } catch (err: any) { setError(err.message); }
        finally { setIsSubmitting(false); }
    };

    const handleReject = async (tx: Tx) => {
        const reason = prompt("Rejection reason (optional):") ?? "";
        try {
            if (tx.type === "withdrawal") {
                await apiClient.rejectWithdrawal(tx.id, reason);
            } else {
                await apiClient.rejectDeposit(tx.id, reason);
            }
            await fetchAll();
        } catch (err: any) { setError(err.message); }
    };

    const handleApproveWithdrawal = async (tx: Tx) => {
        if (!confirm(`Approve withdrawal of $${tx.amount} to ${tx.withdrawal_address}?`)) return;
        try {
            await apiClient.approveWithdrawal(tx.id);
            await fetchAll();
        } catch (err: any) { setError(err.message); }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Transactions</h1>
                <p className="text-slate-550 dark:text-slate-400 mt-1">All platform transactions — deposits, withdrawals, payouts.</p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle size={18} /> {error}
                    <button className="ml-auto" onClick={() => setError("")}><X size={16} /></button>
                </div>
            )}

            <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="border-b border-slate-200 dark:border-slate-800 p-4 sm:px-6 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <Input
                            placeholder="Search by ID, email, type, status..."
                            className="pl-10 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-44 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shrink-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="deposit">Deposits</SelectItem>
                            <SelectItem value="withdrawal">Withdrawals</SelectItem>
                            <SelectItem value="roi">ROI Payouts</SelectItem>
                            <SelectItem value="referral">Referrals</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-16 text-slate-400 gap-3">
                            <Loader2 className="animate-spin" size={20} /> Loading transactions...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-950/50">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">User / ID</th>
                                        <th className="px-6 py-4 font-semibold">Type</th>
                                        <th className="px-6 py-4 font-semibold">Amount</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                    {filtered.length > 0 ? filtered.map(tx => (
                                        <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors text-slate-600 dark:text-slate-300">
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-slate-900 dark:text-white text-xs">{tx.user_email ?? tx.user_id.slice(0, 12) + "…"}</p>
                                                <p className="text-xs text-slate-500 font-mono">{tx.id.slice(0, 12)}…</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${TYPE_STYLES[tx.type] ?? "bg-slate-700 text-slate-300"}`}>
                                                    {TYPE_LABEL[tx.type] ?? tx.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold">
                                                <span className={tx.type === "withdrawal" || tx.type === "investment" ? "text-rose-400" : "text-emerald-400"}>
                                                    ${Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                                </span>
                                                {tx.currency && tx.currency !== "USD" && (
                                                    <span className="text-slate-500 font-normal ml-1 text-xs">{tx.currency}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${STATUS_STYLES[tx.status] ?? STATUS_STYLES.pending}`}>
                                                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-xs">{new Date(tx.created_at).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setDetailTx(tx)}>
                                                        <Eye size={15} />
                                                    </Button>
                                                    {tx.status === "pending" && tx.type === "deposit" && (
                                                        <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10" onClick={() => { setApprovingTx(tx); setUsdAmount(""); }}>
                                                            <CheckCircle2 size={15} className="mr-1" /> Approve
                                                        </Button>
                                                    )}
                                                    {tx.status === "pending" && tx.type === "withdrawal" && (
                                                        <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10" onClick={() => handleApproveWithdrawal(tx)}>
                                                            <CheckCircle2 size={15} className="mr-1" /> Pay Out
                                                        </Button>
                                                    )}
                                                    {tx.status === "pending" && (
                                                        <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10" onClick={() => handleReject(tx)}>
                                                            Reject
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No transactions found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ── Deposit approve modal ───────────────────────────────── */}
            {approvingTx && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Approve Deposit</h2>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 dark:hover:text-white" onClick={() => setApprovingTx(null)}>
                                <X size={20} />
                            </Button>
                        </div>
                        <form onSubmit={handleApproveDeposit} className="p-6 space-y-5">
                            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-slate-400">User</span><span className="text-slate-900 dark:text-white">{approvingTx.user_email ?? approvingTx.user_id.slice(0, 12)}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Amount</span><span className="text-emerald-500 dark:text-emerald-400 font-bold">{approvingTx.amount} {approvingTx.currency}</span></div>
                                {approvingTx.txn_hash && (
                                    <div className="flex justify-between items-center"><span className="text-slate-400">TX Hash</span><span className="text-slate-900 dark:text-white font-mono text-xs flex items-center">{approvingTx.txn_hash.slice(0, 20)}… <CopyBtn value={approvingTx.txn_hash} /></span></div>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">USD Equivalent to Credit *</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                    <Input type="number" step="0.01" min="0" required placeholder="0.00" className="pl-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white" value={usdAmount} onChange={e => setUsdAmount(e.target.value)} autoFocus />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-1">
                                <Button type="button" variant="outline" className="flex-1 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white" onClick={() => setApprovingTx(null)}>Cancel</Button>
                                <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white" disabled={isSubmitting || !usdAmount}>
                                    {isSubmitting ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                                    {isSubmitting ? "Processing…" : "Approve & Credit"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Detail modal ────────────────────────────────────────── */}
            {detailTx && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Transaction Details</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{TYPE_LABEL[detailTx.type] ?? detailTx.type} · {detailTx.status}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 dark:hover:text-white" onClick={() => setDetailTx(null)}><X size={20} /></Button>
                        </div>
                        <div className="p-6 space-y-3 text-sm">
                            {[
                                ["Transaction ID", detailTx.id, true],
                                ["User ID", detailTx.user_id, true],
                                ["User Email", detailTx.user_email, false],
                                ["Type", TYPE_LABEL[detailTx.type] ?? detailTx.type, false],
                                ["Amount", `${detailTx.amount} ${detailTx.currency}`, false],
                                ["USD Equivalent", detailTx.usd_equivalent ? `$${detailTx.usd_equivalent}` : "—", false],
                                ["Status", detailTx.status, false],
                                ["Date", new Date(detailTx.created_at).toLocaleString(), false],
                                ["TX Hash", detailTx.txn_hash, true],
                                ["Withdrawal Address", detailTx.withdrawal_address, true],
                                ["Network", detailTx.withdrawal_network, false],
                                ["Admin Note", detailTx.admin_note, false],
                            ].filter(([, v]) => v).map(([label, value, mono]) => (
                                <div key={label as string} className="flex justify-between items-start gap-4">
                                    <span className="text-slate-500 dark:text-slate-400 shrink-0 w-36">{label as string}</span>
                                    <span className={`text-slate-900 dark:text-white text-right break-all flex items-center gap-1 ${mono ? "font-mono text-xs" : ""}`}>
                                        {value as string}
                                        {mono && value && <CopyBtn value={value as string} />}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
