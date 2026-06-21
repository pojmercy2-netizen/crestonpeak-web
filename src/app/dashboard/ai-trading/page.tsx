"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Power, Activity, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function AITradingPage() {
    const [botActive, setBotActive] = useState(false);

    const toggleBot = () => {
        setBotActive(!botActive);
        toast.success(botActive ? "AI Bot deactivated." : "AI Bot activated successfully.");
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">AI Trading Bots</h1>
                <p className="text-slate-550 dark:text-slate-400 mt-1">Automate your trading strategies using our advanced AI algorithms.</p>
            </div>

            <Card className={`relative overflow-hidden transition-all duration-700 border ${botActive ? 'bg-sky-50/20 dark:bg-sky-950/40 border-sky-500 shadow-[0_4px_40px_rgba(14,165,233,0.15)] dark:shadow-[0_0_50px_rgba(14,165,233,0.15)]' : 'bg-white dark:bg-[#0f172a] border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-2xl'}`}>
                {botActive && <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-indigo-500/5 animate-[shimmer_3s_infinite]" />}
                
                <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className={`relative w-24 h-24 rounded-full flex items-center justify-center border-4 ${botActive ? 'border-sky-500 shadow-[0_4px_20px_rgba(14,165,233,0.3)] dark:shadow-[0_0_30px_rgba(14,165,233,0.5)]' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'}`}>
                            {botActive && <div className="absolute inset-0 rounded-full border-4 border-sky-400 animate-ping opacity-20" />}
                            <Bot size={40} className={botActive ? "text-sky-500 dark:text-sky-400 animate-pulse" : "text-slate-400 dark:text-slate-500"} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Nexus Alpha Bot</h2>
                            <p className={`text-sm font-medium mt-1 flex items-center gap-2 ${botActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500'}`}>
                                <span className={`w-2 h-2 rounded-full ${botActive ? 'bg-sky-500 dark:bg-sky-400 animate-pulse' : 'bg-slate-400 dark:bg-slate-600'}`}></span>
                                {botActive ? "Running Active Trades" : "Standby Mode"}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 h-12 px-6">
                            <Settings2 className="mr-2" size={18} /> Configure
                        </Button>
                        <Button 
                            onClick={toggleBot} 
                            className={`flex-1 md:flex-none h-12 px-8 font-bold transition-all shadow-lg ${botActive ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20 hover:shadow-rose-500/40' : 'bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 shadow-sky-500/20 hover:shadow-sky-500/40'}`}
                        >
                            <Power className="mr-2" size={18} /> {botActive ? "Stop Bot" : "Start Bot"}
                        </Button>
                    </div>
                </CardContent>
                
                {botActive && (
                    <div className="border-t border-sky-100 dark:border-sky-500/20 bg-sky-50/30 dark:bg-sky-950/20 p-4 grid grid-cols-3 gap-4 text-center divide-x divide-sky-100 dark:divide-sky-500/20">
                        <div>
                            <p className="text-xs text-sky-600 dark:text-sky-400/70 uppercase">Daily Profit</p>
                            <p className="text-lg font-bold text-sky-600 dark:text-sky-400">+$124.50</p>
                        </div>
                        <div>
                            <p className="text-xs text-sky-600 dark:text-sky-400/70 uppercase">Win Rate</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">78.5%</p>
                        </div>
                        <div>
                            <p className="text-xs text-sky-600 dark:text-sky-400/70 uppercase">Active Trades</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">4</p>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
