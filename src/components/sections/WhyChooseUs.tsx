import { ShieldCheck, TrendingUp, Headset, Zap } from "lucide-react";

export function WhyChooseUs() {
    const benefits = [
        {
            icon: ShieldCheck,
            title: "Bank-Grade Security",
            description: "Your assets are protected with state-of-the-art encryption and cold storage solutions.",
            color: "text-[#3F5933] dark:text-[#A2B585]",
            bg: "bg-[#EBF1E6] dark:bg-emerald-950/30",
        },
        {
            icon: TrendingUp,
            title: "Consistent Returns",
            description: "Leverage our advanced AI trading algorithms for steady, compounding growth.",
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            icon: Zap,
            title: "Instant Withdrawals",
            description: "Access your funds whenever you need them with our automated, instant processing system.",
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-500/10",
        },
        {
            icon: Headset,
            title: "24/7 Expert Support",
            description: "Our dedicated account managers and support team are available around the clock.",
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-900 relative overflow-hidden transition-colors duration-500">
            {/* Background Accents */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#A2B585]/5 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-2xl md:text-4xl lg:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Why Choose <span className="text-[#A2B585]">Creston Peak</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        We combine cutting-edge technology with financial expertise to deliver a premium investment experience unmatched in the industry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div 
                                key={index}
                                className="bg-white dark:bg-[#0f172a] border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-8 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-colors duration-300 group shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
                            >
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${benefit.bg} transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon className={`w-7 h-7 ${benefit.color}`} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{benefit.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}




