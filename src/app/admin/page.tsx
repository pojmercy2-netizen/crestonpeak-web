"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import { Users, TrendingUp, DollarSign, Activity } from "lucide-react";

const charts = [
    { name: "Bitcoin", symbol: "BINANCE:BTCUSDT" },
    { name: "Ethereum", symbol: "BINANCE:ETHUSDT" },
    { name: "BNB", symbol: "BINANCE:BNBUSDT" },
    { name: "Gold", symbol: "OANDA:XAUUSD" },
    { name: "Tesla", symbol: "NASDAQ:TSLA" },
];

export default function AdminDashboardOverview() {
    const [activeChart, setActiveChart] = useState(charts[0].symbol);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiClient.getDashboardStats();
                setStats(response.data);
            } catch (err: any) {
                setError(err.message || "Failed to load dashboard stats");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Admin Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Platform overview and real-time market data.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Users</CardTitle>
                        <Users className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                            {loading ? "..." : stats?.total_users || 0}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Investments</CardTitle>
                        <Activity className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900 dark:text-white">
                            {loading ? "..." : stats?.active_investments || 0}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Deposits</CardTitle>
                        <DollarSign className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {loading ? "..." : `$${stats?.total_deposits ? stats.total_deposits.toLocaleString() : 0}`}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Withdrawals</CardTitle>
                        <TrendingUp className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                            {loading ? "..." : `$${stats?.total_withdrawals ? stats.total_withdrawals.toLocaleString() : 0}`}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden flex flex-col min-h-[600px]">
                    <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 gap-4">
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Market Charts</CardTitle>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time trading data.</p>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                            {charts.map(c => (
                                <Button
                                    key={c.symbol}
                                    variant={activeChart === c.symbol ? "default" : "ghost"}
                                    size="sm"
                                    className={`rounded-full transition-all flex-shrink-0 ${activeChart === c.symbol ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'}`}
                                    onClick={() => setActiveChart(c.symbol)}
                                >
                                    {c.name}
                                </Button>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 relative min-h-[500px]">
                        <iframe
                            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_1&symbol=${encodeURIComponent(activeChart)}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC`}
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen
                        ></iframe>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
