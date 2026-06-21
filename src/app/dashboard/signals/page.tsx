"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Target, ShieldAlert, Activity } from "lucide-react";

const signals = [
    { pair: "XAUUSD", type: "BUY", entry: "2015.50", tp: "2030.00", sl: "2005.00", time: "10 mins ago", active: true },
    { pair: "EURUSD", type: "SELL", entry: "1.0850", tp: "1.0780", sl: "1.0900", time: "1 hour ago", active: true },
    { pair: "BTCUSD", type: "BUY", entry: "65,000", tp: "68,500", sl: "63,000", time: "3 hours ago", active: true },
    { pair: "GBPUSD", type: "SELL", entry: "1.2650", tp: "1.2500", sl: "1.2720", time: "5 hours ago", active: false },
];

export default function SignalsPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Trading Signals</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time market opportunities from our expert analysts.</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Updates
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {signals.map((signal, idx) => (
                    <Card key={idx} className={`group bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 ${signal.active ? 'dark:ring-slate-800 hover:border-sky-300 dark:hover:ring-sky-500/50 hover:shadow-md dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]' : 'dark:ring-slate-800 opacity-60'} transition-all duration-500 hover:-translate-y-1`}>
                        <CardHeader className="pb-2 flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${signal.type === 'BUY' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500'}`}>
                                    {signal.type === 'BUY' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">{signal.pair}</CardTitle>
                                    <p className="text-xs text-slate-500">{signal.time}</p>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wider ${signal.active ? 'bg-sky-50 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                {signal.active ? 'ACTIVE' : 'CLOSED'}
                            </span>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Entry Price</span>
                                <span className="font-bold text-slate-900 dark:text-white text-base">{signal.entry}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-emerald-50/30 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 rounded-lg p-3">
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1"><Target size={12} /> Take Profit</p>
                                    <p className="font-bold text-emerald-950 dark:text-emerald-100">{signal.tp}</p>
                                </div>
                                <div className="bg-rose-50/30 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10 rounded-lg p-3">
                                    <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 mb-1"><ShieldAlert size={12} /> Stop Loss</p>
                                    <p className="font-bold text-rose-950 dark:text-rose-100">{signal.sl}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
