import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Globe2, TrendingUp, Clock } from "lucide-react";

export function About() {
    const features = [
        { title: "Secure & Transparent", icon: ShieldCheck },
        { title: "Global Market Access", icon: Globe2 },
        { title: "Expert Market Analysis", icon: TrendingUp },
        { title: "24/7 Customer Support", icon: Clock }
    ];

    return (
        <section id="about-section" className="relative about-us py-12 md:py-24 px-4 px-4 md:px-8 bg-white dark:bg-[#020617] overflow-hidden border-t border-slate-200/50 dark:border-slate-900 transition-colors duration-500">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#A2B585]/5 dark:bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">

                {/* About Text */}
                <div className="space-y-8">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-[#3F5933] dark:text-[#A2B585] uppercase mb-3 flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#3F5933] dark:bg-[#A2B585]"></span> About Us
                        </p>
                        <h2 className="text-2xl md:text-4xl lg:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                            Pioneering the Future of <br/> <span className="text-[#A2B585]">Digital Finance</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg italic mt-3 tracking-wide">Riding the waves of global financial markets.</p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                            <strong className="text-[#A2B585]">CrestonPeak</strong> is a trusted forex and cryptocurrency trading platform
                            dedicated to empowering traders with innovative tools, deep market insights, and
                            reliable investment solutions.
                        </p>

                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                            We combine advanced trading technology with professional market analysis to help
                            traders navigate market volatility and seize profitable opportunities across
                            forex, crypto, indices, and commodities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        {features.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="flex items-center gap-4 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm">
                                    <div className="p-2 bg-[#EBF1E6] dark:bg-emerald-950/30 rounded-lg">
                                        <Icon className="text-[#3F5933] dark:text-[#A2B585] h-5 w-5" />
                                    </div>
                                    <span className="text-[#A2B585] font-medium">{item.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mission & Vision Cards Collection */}
                <div className="space-y-6">
                    <Card className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300">
                        <CardContent className="p-0">
                            <div className="flex items-start gap-6">
                                <div className="text-3xl md:text-5xl font-black text-slate-100 dark:text-slate-800 tracking-tighter shrink-0 mt-1">01</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Our Mission</h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                                        To deliver reliable, innovative, and user-focused trading solutions that help
                                        our clients grow confidently in the global financial markets.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-[#0f172a] border border-[#A2B585]/30 dark:border-[#A2B585]/40 shadow-[0_10px_40px_rgba(162,181,133,0.08)] dark:shadow-[0_10px_40px_rgba(162,181,133,0.2)] rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300 transform lg:translate-x-6 xl:translate-x-8">
                        <CardContent className="p-0">
                            <div className="flex items-start gap-6">
                                <div className="text-3xl md:text-5xl font-black text-[#A2B585]/20 dark:text-[#A2B585]/10 tracking-tighter shrink-0 mt-1">02</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-[#3F5933] dark:text-[#A2B585] mb-3">Our Vision</h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                                        To become a leading global trading brand recognized for unyielding integrity,
                                        consistent performance, and long-term trader success.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </section>
    );
}





