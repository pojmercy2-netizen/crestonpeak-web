"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, BarChart3, Zap, Headphones } from "lucide-react";

export function Hero() {
    const tickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!tickerRef.current) return;

        const scriptId = "tradingview-ticker-script";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
            script.type = "module";
            script.async = true;
            document.head.appendChild(script);
        }

        tickerRef.current.innerHTML = "";

        // @ts-ignore
        const ticker = document.createElement("tv-ticker-tape");
        ticker.setAttribute("symbols", "FOREXCOM:SPXUSD,FOREXCOM:NSXUSD,FOREXCOM:DJI,FX:EURUSD,BITSTAMP:BTCUSD,BITSTAMP:ETHUSD,CMCMARKETS:GOLD");
        ticker.setAttribute("show-hover", "true");
        ticker.setAttribute("transparent", "true");

        tickerRef.current.appendChild(ticker);
    }, []);

    return (
        <section className="relative bg-white dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 pt-2 pb-10 md:pt-12 md:pb-20 overflow-hidden border-b border-slate-100 dark:border-slate-900">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#EBF1E6]/40 to-transparent dark:from-[#1e293b]/10 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-sky-100/30 to-transparent dark:from-sky-950/5 rounded-full blur-[80px] pointer-events-none z-0" />

            {/* Watermark Logo Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
                <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] opacity-[0.035] dark:opacity-[0.015] transition-opacity duration-300">
                    <Image src="/logo.png" alt="Creston Peak Watermark" fill className="object-contain" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                    {/* Left Column (Copy and Call to Action) */}
                    <div className="lg:col-span-6 flex flex-col items-start text-left">
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBF1E6] dark:bg-[#152e21] text-[#3F5933] dark:text-[#A2B585] text-xs font-semibold tracking-wide mb-6 border border-[#D5E1CB] dark:border-[#204a35] transition-all hover:scale-105 duration-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3F5933] dark:bg-[#A2B585]" />
                            Trade Crypto & Forex with Confidence
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0B1E19] dark:text-white leading-[1.1] tracking-tight mb-6">
                            Trade. Invest. <br />
                            <span className="text-[#A2B585]">Grow</span> Beyond Limits.
                        </h1>

                        {/* Subheading */}
                        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-[480px]">
                            CrestonPeak provides powerful tools, deep liquidity, and expert insights to help you navigate crypto and forex markets with confidence.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-row gap-3 items-center w-full sm:w-auto mb-6 lg:mb-12">
                            <Button asChild className="flex-1 sm:flex-initial bg-[#0F2E23] hover:bg-[#1a4b3b] dark:bg-[#A2B585] dark:hover:bg-[#b0c493] text-white dark:text-[#0F2E23] font-bold h-11 px-5 rounded-lg flex items-center justify-center gap-2 text-sm transition-all duration-300 shadow-[0_4px_15px_rgba(15,46,35,0.2)] dark:shadow-[0_4px_15px_rgba(162,181,133,0.3)]">
                                <Link href="/signup">
                                    Start Trading Now <ArrowRight size={16} />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="flex-1 sm:flex-initial bg-white hover:bg-slate-100 text-[#A2B585] border border-slate-200 font-bold h-11 px-5 rounded-lg flex items-center justify-center text-sm transition-all duration-300 dark:bg-[#0f172a] dark:hover:bg-slate-800 dark:border-slate-800 dark:text-[#A2B585]">
                                <Link href="/login">Explore Markets</Link>
                            </Button>
                        </div>

                        {/* Key Features row */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/80 w-full">
                            <div className="flex gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 h-fit">
                                    <ShieldCheck size={18} />
                                </div>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">Secure & Regulated</h4>
                                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-normal mt-0.5">Bank-level security to protect your funds</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 h-fit">
                                    <BarChart3 size={18} />
                                </div>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">Advanced Tools</h4>
                                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-normal mt-0.5">Professional charts and indicators</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="p-2 rounded-lg bg-amber-500/5 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 h-fit">
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">Lightning Fast</h4>
                                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-normal mt-0.5">Ultra-low latency execution</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/5 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 h-fit">
                                    <Headphones size={18} />
                                </div>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">24/7 Support</h4>
                                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-normal mt-0.5">Our team is here whenever you need us</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Advanced Dynamic Visual Mockups) */}
                    <div className="lg:col-span-6 relative flex items-center justify-center min-h-[300px] lg:min-h-[480px] w-full -mt-6 lg:-mt-16 select-none z-10">
                        {/* 1. Dashboard Mockup Card */}
                        <div className="relative z-10 w-full max-w-[460px] bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-2xl overflow-hidden flex flex-row aspect-[1.38/1] transition-transform duration-500 hover:scale-[1.02] ml-auto">
                            {/* Mockup Sidebar */}
                            <div className="w-[28%] bg-white dark:bg-[#020617]/20 border-r border-slate-100 dark:border-slate-800/80 p-2.5 flex flex-col gap-3.5">
                                <div className="flex items-center gap-1 px-1">
                                    <div className="w-2 h-2 rounded-full bg-[#A2B585]" />
                                    <span className="text-[8px] font-black text-[#0B1E19] dark:text-white tracking-wider">CRESTON</span>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-[#EBF1E6] dark:bg-slate-800/80 text-[#3F5933] dark:text-[#A2B585] text-[7.5px] font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#3F5933] dark:bg-[#A2B585]" /> Overview
                                    </div>
                                    {['Markets', 'Watchlist', 'Portfolio', 'Orders', 'Analytics', 'Alerts', 'Settings'].map((item) => (
                                        <div key={item} className="flex items-center gap-1.5 px-2 py-1.5 text-slate-400 dark:text-slate-500 text-[7.5px] font-medium hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer transition-colors">
                                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Mockup Main Panel */}
                            <div className="w-[72%] p-3.5 flex flex-col gap-3 overflow-hidden">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-slate-800 dark:text-slate-100 font-bold text-[11px] tracking-tight">Portfolio Overview</h3>
                                        <p className="text-slate-400 text-[7.5px] mt-0.5">Track your performance in real-time</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {['1D', '1W', '1M', '1Y'].map(t => (
                                            <span key={t} className={`text-[7px] font-bold px-1.5 py-0.5 rounded ${t === '1D' ? 'bg-[#0F2E23] text-white' : 'text-slate-400'}`}>{t}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Balance Card */}
                                <div className="bg-white dark:bg-[#020617]/40 rounded-xl p-2.5 border border-slate-100 dark:border-slate-800/50 flex flex-col gap-1">
                                    <span className="text-slate-400 text-[7px] uppercase font-bold tracking-wider">Total Balance</span>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-slate-900 dark:text-white font-black text-sm tracking-tight">$125,430.50</span>
                                        <span className="text-emerald-500 font-bold text-[7.5px] bg-emerald-500/10 px-1 rounded">+8.24%</span>
                                    </div>
                                    
                                    {/* SVG Sparkline Area Chart */}
                                    <svg viewBox="0 0 300 80" className="w-full h-12 mt-1.5 overflow-visible">
                                        <defs>
                                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25"/>
                                                <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                                            </linearGradient>
                                        </defs>
                                        <path d="M 0 50 Q 30 30, 60 55 T 120 40 T 180 60 T 240 25 T 300 35" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M 0 50 Q 30 30, 60 55 T 120 40 T 180 60 T 240 25 T 300 35 L 300 80 L 0 80 Z" fill="url(#chartGrad)" />
                                    </svg>
                                </div>

                                {/* Quick Stats Grid */}
                                <div className="grid grid-cols-4 gap-1.5">
                                    {[
                                        { label: 'Daily Profit', value: '+$9,542.32', sub: '+8.24%' },
                                        { label: 'Open Positions', value: '12', sub: 'Active' },
                                        { label: 'Win Rate', value: '72.6%', sub: '+3.6%' },
                                        { label: 'Risk Score', value: 'Low', sub: 'Safe', badge: true }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white dark:bg-[#020617]/20 p-1.5 rounded-lg border border-slate-100/50 dark:border-slate-800/20 text-center">
                                            <p className="text-slate-400 text-[6px] truncate font-medium">{stat.label}</p>
                                            <p className={`font-bold text-[8px] mt-0.5 truncate ${stat.badge ? 'text-emerald-500 bg-emerald-500/10 rounded px-1 w-fit mx-auto' : 'text-slate-800 dark:text-slate-200'}`}>{stat.value}</p>
                                            <p className="text-slate-400 dark:text-slate-500 text-[5px] truncate mt-0.5">{stat.sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 2. Phone Mockup overlay */}
                        <div className="absolute -bottom-6 left-[-16px] sm:left-[-24px] z-20 w-[140px] h-[280px] bg-[#020617] rounded-[24px] border-[4px] border-slate-900 dark:border-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col p-2 overflow-hidden transition-transform duration-500 hover:scale-[1.03]">
                            {/* Dynamic Island */}
                            <div className="w-10 h-2 bg-[#0f172a] mx-auto rounded-full mb-1.5 flex-shrink-0" />
                            
                            {/* Phone content */}
                            <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
                                <div className="flex justify-between items-center text-[6px] text-slate-500">
                                    <span>9:41</span>
                                    <span>5G</span>
                                </div>
                                
                                <div className="flex justify-between items-start mt-1">
                                    <div>
                                        <span className="text-slate-400 text-[6px] font-medium uppercase">BTC / USDT</span>
                                        <h4 className="text-white font-extrabold text-[10px] tracking-tight mt-0.5">$66,591.10</h4>
                                    </div>
                                    <span className="text-emerald-400 font-bold text-[6.5px] bg-emerald-500/10 px-1 rounded">+2.35%</span>
                                </div>

                                {/* Candle Chart (SVG) */}
                                <div className="flex-1 min-h-[110px] bg-slate-900/40 rounded-lg border border-slate-800/50 p-1 mt-1 flex flex-col justify-between overflow-hidden relative">
                                    {/* Grid Lines */}
                                    <div className="absolute inset-x-0 top-1/4 border-b border-slate-800/30" />
                                    <div className="absolute inset-x-0 top-2/4 border-b border-slate-800/30" />
                                    <div className="absolute inset-x-0 top-3/4 border-b border-slate-800/30" />
                                    
                                    <svg viewBox="0 0 120 80" className="w-full h-full relative z-10 overflow-visible">
                                        {/* Candle 1 (Green) */}
                                        <line x1="15" y1="35" x2="15" y2="65" stroke="#10B981" strokeWidth="0.75" />
                                        <rect x="12" y="42" width="6" height="15" fill="#10B981" rx="0.5" />
                                        
                                        {/* Candle 2 (Green) */}
                                        <line x1="32" y1="20" x2="32" y2="55" stroke="#10B981" strokeWidth="0.75" />
                                        <rect x="29" y="25" width="6" height="20" fill="#10B981" rx="0.5" />
                                        
                                        {/* Candle 3 (Red) */}
                                        <line x1="49" y1="30" x2="49" y2="70" stroke="#EF4444" strokeWidth="0.75" />
                                        <rect x="46" y="35" width="6" height="25" fill="#EF4444" rx="0.5" />

                                        {/* Candle 4 (Green) */}
                                        <line x1="66" y1="15" x2="66" y2="50" stroke="#10B981" strokeWidth="0.75" />
                                        <rect x="63" y="20" width="6" height="22" fill="#10B981" rx="0.5" />

                                        {/* Candle 5 (Red) */}
                                        <line x1="83" y1="25" x2="83" y2="60" stroke="#EF4444" strokeWidth="0.75" />
                                        <rect x="80" y="30" width="6" height="15" fill="#EF4444" rx="0.5" />

                                        {/* Candle 6 (Green) */}
                                        <line x1="100" y1="10" x2="100" y2="40" stroke="#10B981" strokeWidth="0.75" />
                                        <rect x="97" y="15" width="6" height="18" fill="#10B981" rx="0.5" />
                                    </svg>
                                </div>

                                {/* Quick Buy/Sell Buttons */}
                                <div className="flex gap-1.5 mt-auto">
                                    <button className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-md text-[6.5px] font-black py-1.5 flex-1 text-center cursor-pointer transition-colors shadow-sm shadow-emerald-500/20">Buy</button>
                                    <button className="bg-rose-500 hover:bg-rose-400 text-white rounded-md text-[6.5px] font-black py-1.5 flex-1 text-center cursor-pointer transition-colors shadow-sm shadow-rose-500/20">Sell</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TradingView Ticker Tape Widget */}
                <div className="w-full mt-6 md:mt-16 relative z-20">
                    <div ref={tickerRef} className="rounded-xl overflow-hidden min-h-[72px] flex items-center bg-slate-900/5 dark:bg-[#020617]/25" />
                </div>
            </div>
        </section>
    );
}





