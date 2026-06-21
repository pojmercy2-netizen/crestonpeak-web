"use client"

import React from "react";
import Image from "next/image";
import { ShieldCheck, CheckCircle2, Maximize2, FileText, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function Certificate() {
    return (
        <section id="certificate-section" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F8F1] dark:bg-[#030d0a] overflow-hidden border-t border-b border-slate-200/50 dark:border-slate-900 transition-colors duration-500">
            {/* Background elements */}
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#A2B585]/10 dark:bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-[#3F5933]/5 dark:bg-emerald-950/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Write-up Column */}
                    <div className="lg:col-span-7 space-y-6 md:space-y-8">
                        <div className="space-y-3">
                            <p className="text-xs sm:text-sm font-bold tracking-widest text-[#3F5933] dark:text-[#A2B585] uppercase flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-[#3F5933] dark:bg-[#A2B585]"></span>
                                Trust & Security
                            </p>
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                                Fully Certified & <br className="hidden sm:block" />
                                <span className="text-[#A2B585]">Regulated Platform</span>
                            </h2>
                        </div>

                        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
                            <p>
                                At <strong className="text-[#3F5933] dark:text-[#A2B585]">Creston Peak</strong>, transparency and security are the core pillars of our investment framework. We operate in strict adherence to international financial standards and corporate compliance regulations.
                            </p>
                            <p>
                                Our platform is legally incorporated and officially certified to carry out global financial operations, forex brokerage, and digital asset management. This ensures that every investment you make is shielded by robust legal structures and premium security protocols.
                            </p>
                        </div>

                        {/* Feature checklist */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className="flex items-start gap-3 bg-white dark:bg-[#0f172a] border border-slate-200/50 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm">
                                <div className="p-2 bg-[#EBF1E6] dark:bg-emerald-950/40 rounded-xl mt-0.5 shrink-0">
                                    <ShieldCheck className="text-[#3F5933] dark:text-[#A2B585] h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">Asset Safeguarding</h4>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Isolated custody accounts protect investor capital.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 bg-white dark:bg-[#0f172a] border border-slate-200/50 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm">
                                <div className="p-2 bg-[#EBF1E6] dark:bg-emerald-950/40 rounded-xl mt-0.5 shrink-0">
                                    <CheckCircle2 className="text-[#3F5933] dark:text-[#A2B585] h-5 w-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">Anti-Fraud Compliance</h4>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Strict AML and KYC protocols to safeguard our ecosystem.</p>
                                </div>
                            </div>
                        </div>

                        {/* Extra trust badges */}
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center gap-6 text-slate-400 dark:text-slate-500">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">Verified Active Status</span>
                            </div>
                            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>
                            <div className="text-xs sm:text-sm font-medium">Registration No: Class A Brokerage License</div>
                        </div>
                    </div>

                    {/* Certificate Image Column */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-white dark:border-[#0f172a] bg-white dark:bg-[#0f172a] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(63,89,51,0.15)] dark:hover:shadow-[0_20px_50px_rgba(162,181,133,0.1)] w-full max-w-sm md:max-w-md">
                                    {/* Certificate Preview Image */}
                                    <div className="relative aspect-[3/4] w-full">
                                        <Image
                                            src="/certificate.jpeg"
                                            alt="Creston Peak Incorporation Certificate"
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-w-768px) 100vw, 400px"
                                            priority
                                        />
                                        
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white transition-transform duration-300 scale-95 group-hover:scale-100">
                                                <Maximize2 className="h-6 w-6" />
                                            </div>
                                            <span className="text-white text-xs sm:text-sm font-bold tracking-wider uppercase">View Full Certificate</span>
                                        </div>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl bg-white dark:bg-[#0b1311] border-slate-200 dark:border-slate-800 p-2 md:p-4 rounded-2xl">
                                <DialogTitle className="sr-only">Creston Peak Certificate of Incorporation</DialogTitle>
                                <DialogDescription className="sr-only">High resolution view of the Creston Peak official corporate incorporation certificate.</DialogDescription>
                                <div className="relative w-full aspect-[3/4] max-h-[85vh]">
                                    <Image
                                        src="/certificate.jpeg"
                                        alt="Creston Peak Incorporation Certificate"
                                        fill
                                        className="object-contain rounded-lg"
                                        sizes="(max-w-1200px) 95vw, 1000px"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Image Subtitle / Button */}
                        <div className="mt-4 text-center">
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-300 flex items-center gap-1.5 justify-center">
                                <FileText className="h-4 w-4 text-[#3F5933] dark:text-[#A2B585]" />
                                Certificate of Incorporation
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="text-xs text-[#3F5933] dark:text-[#A2B585] font-semibold hover:underline mt-1 flex items-center gap-0.5 mx-auto cursor-pointer">
                                        Click to enlarge Certificate <ArrowUpRight className="h-3 w-3" />
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl bg-white dark:bg-[#0b1311] border-slate-200 dark:border-slate-800 p-2 md:p-4 rounded-2xl">
                                    <DialogTitle className="sr-only">Creston Peak Certificate of Incorporation - Enlarged View</DialogTitle>
                                    <DialogDescription className="sr-only">Enlarged high resolution view of the Creston Peak official corporate incorporation certificate.</DialogDescription>
                                    <div className="relative w-full aspect-[3/4] max-h-[85vh]">
                                        <Image
                                            src="/certificate.jpeg"
                                            alt="Creston Peak Incorporation Certificate"
                                            fill
                                            className="object-contain rounded-lg"
                                            sizes="(max-w-1200px) 95vw, 1000px"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
