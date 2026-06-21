"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const traders = [
    { name: "Alex K.", roi: "+145.2%", followers: "12.4K", risk: "Medium", avatar: "A" },
    { name: "Sarah M.", roi: "+210.8%", followers: "8.1K", risk: "High", avatar: "S" },
    { name: "David T.", roi: "+85.4%", followers: "15.2K", risk: "Low", avatar: "D" },
];

export default function SocialTradingPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Social Trading</h1>
                    <p className="text-slate-550 dark:text-slate-400 mt-1">Copy trades from top performing investors automatically.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {traders.map((trader, idx) => (
                    <Card key={idx} className="group bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] hover:border-sky-300 dark:hover:ring-sky-500/30">
                        <CardContent className="p-6 text-center space-y-4">
                            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-1 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                                <div className="w-full h-full rounded-full bg-slate-100 dark:bg-[#0f172a] flex items-center justify-center text-2xl font-bold text-slate-900 dark:text-white">
                                    {trader.avatar}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{trader.name}</h3>
                                <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
                                    <Users size={12}/> {trader.followers} copiers
                                </p>
                            </div>

                            <div className="bg-slate-50 dark:bg-[#020617]/50 rounded-xl p-4 flex justify-between items-center border border-slate-200 dark:border-slate-800/50">
                                <div className="text-left">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Total ROI</p>
                                    <p className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1"><TrendingUp size={14} /> {trader.roi}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Risk Score</p>
                                    <p className={`font-bold ${trader.risk === 'High' ? 'text-rose-600 dark:text-rose-400' : trader.risk === 'Medium' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{trader.risk}</p>
                                </div>
                            </div>

                            <Button className="w-full bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white dark:bg-sky-500/10 dark:hover:bg-sky-500 dark:text-sky-400 dark:hover:text-slate-955 border border-sky-200 dark:border-sky-500/20 transition-all font-bold">
                                <Copy className="mr-2" size={16} /> Copy Trades
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
