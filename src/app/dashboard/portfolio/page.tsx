"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, TrendingUp, Briefcase } from "lucide-react";

export default function PortfolioPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Asset Portfolio</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Visualize and analyze your investments across different asset classes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl overflow-hidden relative">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <PieChart className="text-sky-500 dark:text-sky-400" /> Asset Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8 relative">
                        {/* CSS-based minimal pie chart placeholder */}
                        <div className="relative w-48 h-48 rounded-full border-[16px] border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 shadow-sm dark:shadow-[0_0_30px_rgba(14,165,233,0.1)]">
                            <div className="absolute inset-[-16px] rounded-full border-[16px] border-sky-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)' }}></div>
                            <div className="absolute inset-[-16px] rounded-full border-[16px] border-indigo-500" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }}></div>
                            <div className="absolute inset-[-16px] rounded-full border-[16px] border-emerald-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0)' }}></div>
                            
                            <div className="text-center z-10">
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Total Value</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">$14,250</p>
                            </div>
                        </div>

                        <div className="w-full space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500"></span><span className="text-slate-600 dark:text-slate-300">Forex</span></div>
                                <span className="font-bold text-slate-900 dark:text-white">65%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-500"></span><span className="text-slate-600 dark:text-slate-300">Crypto</span></div>
                                <span className="font-bold text-slate-900 dark:text-white">25%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-slate-600 dark:text-slate-300">Stocks</span></div>
                                <span className="font-bold text-slate-900 dark:text-white">10%</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl overflow-hidden">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800/50">
                        <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Briefcase className="text-indigo-500 dark:text-indigo-400" /> Active Holdings
                        </CardTitle>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="p-4 font-medium">Asset</th>
                                    <th className="p-4 font-medium">Amount</th>
                                    <th className="p-4 font-medium">Value</th>
                                    <th className="p-4 font-medium text-right">Performance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-slate-900 dark:text-white">EUR/USD</div>
                                        <div className="text-xs text-slate-500">Forex</div>
                                    </td>
                                    <td className="p-4 text-slate-600 dark:text-slate-300">2.5 Lots</td>
                                    <td className="p-4 font-medium text-slate-900 dark:text-white">$4,250.00</td>
                                    <td className="p-4 text-right text-emerald-600 dark:text-emerald-400 font-medium flex justify-end items-center gap-1">
                                        <TrendingUp size={14} /> +4.2%
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-slate-900 dark:text-white">Bitcoin (BTC)</div>
                                        <div className="text-xs text-slate-500">Crypto</div>
                                    </td>
                                    <td className="p-4 text-slate-600 dark:text-slate-300">0.045 BTC</td>
                                    <td className="p-4 font-medium text-slate-900 dark:text-white">$2,950.00</td>
                                    <td className="p-4 text-right text-emerald-600 dark:text-emerald-400 font-medium flex justify-end items-center gap-1">
                                        <TrendingUp size={14} /> +8.1%
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
