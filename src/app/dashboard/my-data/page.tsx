"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Download, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function MyDataPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">My Data</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your personal data, privacy settings, and activity logs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl overflow-hidden transition-all duration-300 hover:shadow-[0_4px_20px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:border-indigo-300 dark:hover:ring-indigo-500/30">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b border-slate-100 dark:border-slate-800/50">
                        <div className="p-3 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-lg">
                            <Download size={24} />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Export Data</CardTitle>
                            <p className="text-xs text-slate-500 dark:text-slate-500">Download a copy of your account data.</p>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300">You can request an archive of your transaction history, active plans, and personal information.</p>
                        <Button className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold" onClick={() => toast.success("Data export initiated. You will receive an email shortly.")}>
                            Request Data Export
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl overflow-hidden transition-all duration-300 hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-300 dark:hover:ring-emerald-500/30">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b border-slate-100 dark:border-slate-800/50">
                        <div className="p-3 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-lg">
                            <Shield size={24} />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Privacy Controls</CardTitle>
                            <p className="text-xs text-slate-500 dark:text-slate-500">Manage how your data is used.</p>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Eye size={18} className="text-slate-500 dark:text-slate-400" />
                                <span className="text-sm text-slate-600 dark:text-slate-300">Public Profile Visibility</span>
                            </div>
                            <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Hidden</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
