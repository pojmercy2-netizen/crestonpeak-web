"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Activity,
    TrendingUp,
    CreditCard,
    ChevronRight,
    Settings,
    ArrowRight,
    Compass,
    TrendingDown,
    Zap,
    Users,
    DollarSign,
    Briefcase,
    Clock,
    Gift,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { TransactionRead, InvestmentRead, InvestmentPlanRead, WalletRead } from "@/lib/types";
import { TradingViewTickerWidget } from "@/components/dashboard/TradingViewTickerWidget";
import { CoinGeckoWidget } from "@/components/dashboard/CoinGeckoWidget";



const TYPE_LABEL: Record<string, string> = {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    roi: "ROI Payout",
    roi_profit: "ROI Payout",
    referral: "Referral Bonus",
    referral_bonus: "Referral Bonus",
    investment: "Investment",
    plan_buy: "Plan Purchase",
};

const STATUS_STYLES: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rejected: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    failed: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

function TxIcon({ type }: { type: string }) {
    if (type === "withdrawal" || type === "investment" || type === "plan_buy") return <ArrowUpRight size={16} />;
    if (type === "roi" || type === "roi_profit") return <TrendingUp size={16} />;
    if (type === "referral" || type === "referral_bonus") return <Gift size={16} />;
    return <ArrowDownRight size={16} />;
}

function txIconBg(type: string) {
    if (type === "withdrawal") return "bg-rose-500/10 text-rose-400";
    if (type === "investment" || type === "plan_buy") return "bg-purple-500/10 text-purple-400";
    if (type === "roi" || type === "roi_profit") return "bg-sky-500/10 text-sky-400";
    if (type === "referral" || type === "referral_bonus") return "bg-yellow-500/10 text-yellow-400";
    return "bg-emerald-500/10 text-emerald-400";
}

export default function DashboardOverview() {
    const { user } = useAuth();
    const router = useRouter();
    const [wallet, setWallet] = useState<WalletRead | null>(null);
    const [investments, setInvestments] = useState<InvestmentRead[]>([]);
    const [transactions, setTransactions] = useState<TransactionRead[]>([]);
    const [plans, setPlans] = useState<InvestmentPlanRead[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchOrNull = async (promise: Promise<any>) => {
            try {
                return await promise;
            } catch (err) {
                console.error("Dashboard sub-request failed:", err);
                return null;
            }
        };

        const fetchDashboardData = async () => {
            try {
                const [walletResp, investmentsResp, transactionsResp, plansResp] = await Promise.all([
                    fetchOrNull(apiClient.getWallet()),
                    fetchOrNull(apiClient.listInvestments()),
                    fetchOrNull(apiClient.listTransactions()),
                    fetchOrNull(apiClient.getInvestmentPlans()),
                ]);
                if (walletResp?.data) setWallet(walletResp.data);
                if (investmentsResp?.data) setInvestments(investmentsResp.data);
                if (transactionsResp?.data) setTransactions(transactionsResp.data);
                if (plansResp?.data) setPlans(plansResp.data);
            } catch (err) {
                console.error("Failed to load dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const activeInvestments = (investments || []).filter((i) => i && i.status === "active");
    const recentTxs = (transactions || []).slice(0, 5);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both dashboard-overview-page">
            <style>{`
                html:not(.dark) .dashboard-overview-page .text-sky-400 {
                    color: #223228 !important;
                }
                html:not(.dark) .dashboard-overview-page .text-sky-500 {
                    color: #223228 !important;
                }
                html:not(.dark) .dashboard-overview-page .bg-sky-500 {
                    background-color: #223228 !important;
                }
                html:not(.dark) .dashboard-overview-page .hover\\:bg-sky-600:hover {
                    background-color: #1a271f !important;
                }
                html:not(.dark) .dashboard-overview-page .bg-sky-500\\/10 {
                    background-color: rgba(34, 50, 40, 0.1) !important;
                }
            `}</style>
            <TradingViewTickerWidget />
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                        Welcome back, {user?.full_name?.split(" ")[0] ?? user?.username ?? "Trader"}
                    </h1>
                    <p className="text-xs md:text-sm text-slate-400 mt-0.5">Here's your portfolio overview for today.</p>
                </div>
                <div className="hidden sm:flex gap-2 flex-shrink-0">
                    <Button asChild variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                        <Link href="/dashboard/deposits">
                            <ArrowDownRight size={16} className="mr-1" /> Deposit
                        </Link>
                    </Button>
                    <Button asChild size="sm" className="bg-sky-500 hover:bg-sky-600 text-white">
                        <Link href="/dashboard/plans">
                            <Zap size={16} className="mr-1" /> Invest Now
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Account Overview Card */}
            <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl overflow-hidden relative group">
                <CardContent className="p-4 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800/80">
                        {/* Available Balance */}
                        <div className="flex items-center justify-between pb-4 md:pb-0 md:pr-6">
                            <div>
                                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Available Balance</p>
                                <p className="text-xl md:text-2xl font-extrabold text-sky-400 mt-1">
                                    {loading ? (
                                        <span className="inline-block w-24 h-7 bg-slate-800 animate-pulse rounded" />
                                    ) : wallet ? (
                                        `$${(wallet.balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                    ) : (
                                        "—"
                                    )}
                                </p>
                                <p className="text-[10px] md:text-xs text-slate-500 mt-1 hidden md:block">Withdrawable funds</p>
                            </div>
                            <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-sky-500/10 shrink-0">
                                <Wallet className="w-5 h-5 md:w-6 md:h-6 text-sky-400" />
                            </div>
                        </div>

                        {/* Total Profit */}
                        <div className="flex items-center justify-between py-4 md:py-0 md:px-6">
                            <div>
                                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Total Profit</p>
                                <p className="text-xl md:text-2xl font-extrabold text-emerald-400 mt-1">
                                    {loading ? (
                                        <span className="inline-block w-24 h-7 bg-slate-800 animate-pulse rounded" />
                                    ) : wallet ? (
                                        `$${(wallet.total_earned ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                    ) : (
                                        "—"
                                    )}
                                </p>
                                <p className="text-[10px] md:text-xs text-slate-500 mt-1 hidden md:block">ROI + bonuses</p>
                            </div>
                            <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-emerald-500/10 shrink-0">
                                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                            </div>
                        </div>

                        {/* Total Deposited */}
                        <div className="flex items-center justify-between pt-4 md:pt-0 md:pl-6">
                            <div>
                                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Total Deposited</p>
                                <p className="text-xl md:text-2xl font-extrabold text-teal-400 mt-1">
                                    {loading ? (
                                        <span className="inline-block w-24 h-7 bg-slate-800 animate-pulse rounded" />
                                    ) : wallet ? (
                                        `$${(wallet.total_deposited ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                    ) : (
                                        "—"
                                    )}
                                </p>
                                <p className="text-[10px] md:text-xs text-slate-500 mt-1 hidden md:block">Funded capital</p>
                            </div>
                            <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-teal-500/10 shrink-0">
                                <ArrowDownRight className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl overflow-hidden">
                <CardHeader className="border-b border-slate-200 dark:border-slate-800/50 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <CreditCard className="text-sky-400" size={20} /> Recent Transactions
                    </CardTitle>
                    <Link href="/dashboard/transactions" className="text-xs text-sky-400 hover:underline flex items-center gap-1">
                        View All <ArrowRight size={12} />
                    </Link>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="space-y-2 p-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800/50 animate-pulse rounded-xl" />
                            ))}
                        </div>
                    ) : recentTxs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                            <Clock size={36} className="text-slate-700 mb-3" />
                            <p className="text-slate-400 text-sm font-medium">No transactions yet</p>
                            <p className="text-slate-600 text-xs mt-1 mb-4">Make your first deposit to get started.</p>
                            <Button asChild size="sm" variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                                <Link href="/dashboard/deposits">Deposit Now</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-200 dark:divide-slate-800/50">
                            {recentTxs.map((tx) => (
                                <div key={tx.id} className="flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${txIconBg(tx.type)}`}>
                                        <TxIcon type={tx.type} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{TYPE_LABEL[tx.type] ?? tx.type}</p>
                                        <p className="text-xs text-slate-500">{new Date(tx.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className={`text-sm font-bold ${tx.type === "withdrawal" || tx.type === "plan_buy" ? "text-rose-400" : "text-emerald-400"}`}>
                                            {tx.type === "withdrawal" || tx.type === "plan_buy" ? "−" : "+"}
                                            ${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${STATUS_STYLES[tx.status] ?? STATUS_STYLES.pending}`}>
                                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <CoinGeckoWidget />
        </div>
    );
}