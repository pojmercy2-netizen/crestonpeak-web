import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Bitcoin, Coins } from "lucide-react";

const marketData = [
    { name: "Bitcoin (BTC)", price: "$67,250.45", change: "+2.35%", isUp: true, icon: Bitcoin },
    { name: "Ethereum (ETH)", price: "$3,100.89", change: "-0.45%", isUp: false, icon: Coins },
    { name: "BNB (BNB)", price: "$590.20", change: "+1.12%", isUp: true, icon: Coins },
    { name: "Solana (SOL)", price: "$152.67", change: "+4.65%", isUp: true, icon: Coins },
];

export function MarketPrice() {
    return (
        <section id="market-section" className="relative py-10 md:py-20 px-4 md:px-12 bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-900 transition-colors duration-500">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] dark:opacity-5 pointer-events-none"></div>
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-3 tracking-tight">Live Market Monitor</h2>
                <p className="text-slate-500 dark:text-slate-400 text-center mb-12 max-w-xl mx-auto">Real-time asset prices and market movements. Stay updated with the leading global cryptocurrencies.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {marketData.map((data, index) => {
                        const Icon = data.icon;
                        return (
                            <Card key={index} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(15,46,35,0.04)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 rounded-2xl overflow-hidden group shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="p-3 rounded-xl bg-white dark:bg-white/5 group-hover:bg-[#EBF1E6] dark:group-hover:bg-slate-800 transition-colors">
                                            <Icon className="w-6 h-6 text-[#3F5933] dark:text-[#A2B585]" />
                                        </div>
                                        <div className={`flex items-center gap-1 font-bold px-3 py-1 rounded-full text-xs
                                            ${data.isUp 
                                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                                                : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}
                                        `}>
                                            {data.isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                            {data.change}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{data.name}</p>
                                        <h3 className="text-slate-900 dark:text-white text-2xl sm:text-3xl font-bold tracking-tight">{data.price}</h3>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}



