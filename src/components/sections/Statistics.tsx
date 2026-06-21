import { Users, Clock, CheckCircle, TrendingUp } from "lucide-react";

export function Statistics() {
    const statsCards = [
        {
            icon: Users,
            label: "Active Users",
            value: "100M",
            suffix: "+",
            color: "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900",
        },
        {
            icon: Clock,
            label: "Years in Business",
            value: "9",
            suffix: " years",
            color: "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900",
        },
        {
            icon: CheckCircle,
            label: "Completed Projects",
            value: "500M",
            suffix: "+",
            color: "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900",
        },
        {
            icon: TrendingUp,
            label: "Assets Under Management",
            value: "90B",
            suffix: "+",
            color: "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900",
        },
    ];

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-900 relative overflow-hidden transition-colors duration-500">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#A2B585]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-2xl md:text-4xl lg:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Our <span className="text-[#A2B585]">Achievements</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        Join thousands of investors who trust us with their portfolio. Here's what we've accomplished together.
                    </p>
                </div>

                {/* Stats grid: combined on small screens, grid of cards on desktop */}
                <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 hidden">
                    {statsCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-white dark:bg-[#0f172a] border border-slate-200/50 dark:border-slate-800 rounded-2xl p-8 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-2 shadow-sm"
                            >
                                {/* Icon background */}
                                <div className="bg-[#EBF1E6] dark:bg-emerald-950/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-8 h-8 text-[#3F5933] dark:text-[#A2B585]" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">{card.label}</p>
                                    <div className="flex items-baseline gap-1">
                                        <h3 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                                            {card.value}
                                        </h3>
                                        <span className="text-xl text-[#3F5933] dark:text-[#A2B585] font-semibold">{card.suffix}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile view: all stats inside a single box */}
                <div className="md:hidden block bg-white dark:bg-[#0f172a] border border-slate-200/50 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        {statsCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div key={index} className="flex flex-col items-center text-center p-2">
                                    <div className="bg-[#EBF1E6] dark:bg-emerald-950/30 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                                        <Icon className="w-6 h-6 text-[#3F5933] dark:text-[#A2B585]" />
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1 truncate max-w-full">{card.label}</p>
                                    <div className="flex items-baseline gap-0.5 justify-center">
                                        <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
                                            {card.value}
                                        </h3>
                                        <span className="text-sm text-[#3F5933] dark:text-[#A2B585] font-semibold">{card.suffix}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Trusted by traders worldwide */}
                <div className="mt-16">
                    <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8">
                        Trusted by traders worldwide
                    </p>

                    <div className="relative overflow-hidden">
                        {/* Fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white dark:from-[#020617] to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white dark:from-[#020617] to-transparent pointer-events-none" />

                        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-10 px-4 md:px-8">

                            {/* Binance */}
                            <div className="group flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-lg md:rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-[#A2B585] dark:hover:border-[#A2B585] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7">
                                    <path d="M16 4L19.09 10.26L26 11.27L21 16.14L22.18 23.02L16 19.77L9.82 23.02L11 16.14L6 11.27L12.91 10.26L16 4Z" fill="#F3BA2F"/>
                                    <path d="M9.5 7.5L7 10L9.5 12.5L12 10L9.5 7.5Z" fill="#F3BA2F"/>
                                    <path d="M22.5 7.5L20 10L22.5 12.5L25 10L22.5 7.5Z" fill="#F3BA2F"/>
                                    <path d="M16 20L13.5 22.5L16 25L18.5 22.5L16 20Z" fill="#F3BA2F"/>
                                </svg>
                                <span className="font-bold text-xs md:text-[15px] text-[#A2B585] group-hover:text-[#3F5933] dark:group-hover:text-[#A2B585] transition-colors">Binance</span>
                            </div>

                            {/* MetaTrader */}
                            <div className="group flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-lg md:rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-[#A2B585] dark:hover:border-[#A2B585] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7">
                                    <rect width="32" height="32" rx="6" fill="#1565C0"/>
                                    <path d="M8 22V10L13 16L16 12L19 16L24 10V22H21V16L19 19L16 15L13 19L11 16V22H8Z" fill="white"/>
                                </svg>
                                <span className="font-bold text-xs md:text-[15px] text-[#A2B585] group-hover:text-[#3F5933] dark:group-hover:text-[#A2B585] transition-colors">MetaTrader</span>
                            </div>

                            {/* TradingView */}
                            <div className="group flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-lg md:rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-[#A2B585] dark:hover:border-[#A2B585] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7">
                                    <rect width="32" height="32" rx="6" fill="#131722"/>
                                    <path d="M6 22L12 14L16 18L22 10L26 14" stroke="#2196F3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="26" cy="14" r="2" fill="#2196F3"/>
                                </svg>
                                <span className="font-bold text-xs md:text-[15px] text-[#A2B585] group-hover:text-[#3F5933] dark:group-hover:text-[#A2B585] transition-colors">TradingView</span>
                            </div>

                            {/* Bloomberg */}
                            <div className="group flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-lg md:rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-[#A2B585] dark:hover:border-[#A2B585] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7">
                                    <rect width="32" height="32" rx="6" fill="#000000"/>
                                    <text x="5" y="22" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial">B</text>
                                    <rect x="14" y="9" width="12" height="3" rx="1.5" fill="#F26522"/>
                                    <rect x="14" y="14.5" width="10" height="3" rx="1.5" fill="#F26522"/>
                                    <rect x="14" y="20" width="12" height="3" rx="1.5" fill="#F26522"/>
                                </svg>
                                <span className="font-bold text-xs md:text-[15px] text-[#A2B585] group-hover:text-[#3F5933] dark:group-hover:text-[#A2B585] transition-colors">Bloomberg</span>
                            </div>

                            {/* Reuters */}
                            <div className="group flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-lg md:rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-[#A2B585] dark:hover:border-[#A2B585] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7">
                                    <rect width="32" height="32" rx="6" fill="#FF8000"/>
                                    <path d="M8 10H18C21 10 23 12 23 14.5C23 17 21 19 18 19H14V22H11V19H8V10ZM11 16H18C19.1 16 20 15.3 20 14.5C20 13.7 19.1 13 18 13H11V16Z" fill="white"/>
                                </svg>
                                <span className="font-bold text-xs md:text-[15px] text-[#A2B585] group-hover:text-[#3F5933] dark:group-hover:text-[#A2B585] transition-colors">Reuters</span>
                            </div>

                            {/* NASDAQ */}
                            <div className="group flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-lg md:rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-[#A2B585] dark:hover:border-[#A2B585] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7">
                                    <rect width="32" height="32" rx="6" fill="#0033A0"/>
                                    <path d="M6 22V10L11 18V10H14V22L9 14V22H6Z" fill="white"/>
                                    <path d="M16 10H22C24.2 10 26 11.8 26 14V18C26 20.2 24.2 22 22 22H16V10ZM19 13V19H22C22.6 19 23 18.6 23 18V14C23 13.4 22.6 13 22 13H19Z" fill="white"/>
                                </svg>
                                <span className="font-bold text-xs md:text-[15px] text-[#A2B585] group-hover:text-[#3F5933] dark:group-hover:text-[#A2B585] transition-colors">NASDAQ</span>
                            </div>

                            {/* Coinbase */}
                            <div className="group flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-lg md:rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-[#A2B585] dark:hover:border-[#A2B585] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7">
                                    <rect width="32" height="32" rx="14" fill="#0052FF"/>
                                    <circle cx="16" cy="16" r="8" fill="white"/>
                                    <circle cx="16" cy="16" r="5" fill="#0052FF"/>
                                </svg>
                                <span className="font-bold text-xs md:text-[15px] text-[#A2B585] group-hover:text-[#3F5933] dark:group-hover:text-[#A2B585] transition-colors">Coinbase</span>
                            </div>

                            {/* eToro */}
                            <div className="group flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-5 md:py-3 rounded-lg md:rounded-xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 hover:border-[#A2B585] dark:hover:border-[#A2B585] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-7 md:h-7">
                                    <rect width="32" height="32" rx="6" fill="#76C044"/>
                                    <path d="M9 16C9 12.13 12.13 9 16 9C19.87 9 23 12.13 23 16C23 19.87 19.87 23 16 23C12.13 23 9 19.87 9 16Z" fill="white"/>
                                    <path d="M13 16C13 14.34 14.34 13 16 13C17.66 13 19 14.34 19 16C19 17.66 17.66 19 16 19C14.34 19 13 17.66 13 16Z" fill="#76C044"/>
                                </svg>
                                <span className="font-bold text-xs md:text-[15px] text-[#A2B585] group-hover:text-[#3F5933] dark:group-hover:text-[#A2B585] transition-colors">eToro</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}




