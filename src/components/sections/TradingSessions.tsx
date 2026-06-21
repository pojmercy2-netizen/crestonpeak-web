export function TradingSessions() {
    return (
        <section id="global-trading-session" className="sessions py-12 md:py-24 px-4 px-4 md:px-12 bg-white dark:bg-[#020617] text-center border-b border-slate-100 dark:border-slate-900 transition-colors duration-500">
            <h2 className="text-3xl md:text-2xl md:text-4xl font-black text-[#0B1E19] dark:text-white mb-2 tracking-tight">Global Trading Sessions</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">The Forex market operates 24 hours a day across major global sessions.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

                {/* London Session */}
                <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl text-left border-l-4 border-[#3F5933] dark:border-[#A2B585] border border-slate-200/50 dark:border-slate-800/80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">London Session</h3>
                    <span className="inline-block text-[#3F5933] dark:text-[#A2B585] text-sm font-semibold mb-4">08:00 – 17:00 GMT</span>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        The London session is the most active trading period, accounting for the highest trading volume.
                        Major pairs like EUR/USD and GBP/USD show strong volatility.
                    </p>
                </div>

                {/* New York Session */}
                <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl text-left border-l-4 border-sky-500 border border-slate-200/50 dark:border-slate-800/80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">New York Session</h3>
                    <span className="inline-block text-sky-600 dark:text-sky-400 text-sm font-semibold mb-4">13:00 – 22:00 GMT</span>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        This session overlaps with London, creating high liquidity and strong price movements,
                        especially for USD pairs.
                    </p>
                </div>

                {/* Asian Session */}
                <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl text-left border-l-4 border-amber-500 border border-slate-200/50 dark:border-slate-800/80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Asian Session</h3>
                    <span className="inline-block text-amber-600 dark:text-amber-400 text-sm font-semibold mb-4">00:00 – 09:00 GMT</span>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        The Asian session is generally calmer, suitable for range trading.
                        JPY, AUD, and NZD pairs are most active.
                    </p>
                </div>

                {/* Sydney Session */}
                <div className="bg-white dark:bg-[#0f172a] p-6 rounded-2xl text-left border-l-4 border-pink-500 border border-slate-200/50 dark:border-slate-800/80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 shadow-sm hover:border-slate-300 dark:hover:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Sydney Session</h3>
                    <span className="inline-block text-pink-600 dark:text-pink-400 text-sm font-semibold mb-4">22:00 – 07:00 GMT</span>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        This session opens the trading day and is often less volatile,
                        setting the tone for the Asian market.
                    </p>
                </div>

            </div>
        </section>
    );
}




