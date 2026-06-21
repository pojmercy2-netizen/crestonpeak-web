import { Button } from "@/components/ui/button";
import { CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

const plans = [
    {
        name: "Starter Plan",
        price: "$100 – $499",
        popular: false,
        features: ["95% – 100% ROI", "7 – 14 Days", "Forex & low-risk crypto trades", "Weekly updates"]
    },
    {
        name: "Standard Plan",
        price: "$500 – $1,999",
        popular: false,
        features: ["95% – 100% ROI", "14 – 30 Days", "Diversified Forex & crypto", "Weekly withdrawals"]
    },
    {
        name: "Professional Plan",
        price: "$2,000 – $9,999",
        popular: true,
        features: ["95% – 100% ROI", "30 Days Terms", "Automated & manual trading", "Priority 24/7 support"]
    },
    {
        name: "VIP Plan",
        price: "$10,000+",
        popular: false,
        features: ["95% – 100% ROI", "30 – 90 Days", "Dedicated account manager", "Premium market access"]
    }
];

export function PricingPlans() {
    return (
        <section id="plan-section" className="relative py-12 md:py-24 px-4 md:px-12 bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-900 transition-colors duration-500 overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A2B585]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="relative z-10 text-center mb-8 md:mb-16">
                <p className="text-sm font-bold tracking-widest text-[#3F5933] dark:text-[#A2B585] uppercase mb-3">Investment Tiers</p>
                <h2 className="text-2xl md:text-4xl lg:text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Structured Trading Plans</h2>
                <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Choose an investment tier that aligns with your financial goals. Our AI-driven algorithms and expert traders ensure consistent growth.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
                {plans.map((plan, index) => (
                    <div 
                        key={index} 
                        className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2
                            ${plan.popular 
                                ? 'bg-white dark:bg-[#0f172a] border border-[#A2B585] dark:border-[#A2B585] shadow-[0_20px_50px_rgba(162,181,133,0.15)] dark:shadow-[0_20px_50px_rgba(162,181,133,0.3)] md:-mt-4 md:mb-4 lg:-mt-8 lg:mb-8' 
                                : 'bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-2xl shadow-sm'
                            }
                        `}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 inset-x-0 flex justify-center">
                                <span className="flex items-center gap-1 bg-[#0F2E23] dark:bg-[#A2B585] text-white dark:text-[#0F2E23] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-[#0F2E23]/10">
                                    <Star className="w-3.5 h-3.5" fill="currentColor" /> Most Popular
                                </span>
                            </div>
                        )}
                        
                        <div className="mb-6">
                            <h4 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">{plan.name}</h4>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-extrabold text-black dark:text-white tracking-tight">{plan.price}</span>
                            </div>
                        </div>

                        <div className="flex-grow">
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-[#3F5933] dark:text-[#A2B585]' : 'text-slate-400'}`} />
                                        <span className="text-black dark:text-slate-300 text-sm leading-tight">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Button 
                            asChild
                            className={`w-full py-6 text-base font-bold transition-all rounded-xl cursor-pointer
                                ${plan.popular 
                                    ? 'bg-[#0F2E23] hover:bg-[#163d30] dark:bg-[#A2B585] dark:hover:bg-[#b0c493] text-white dark:text-[#0F2E23] shadow-[0_4px_15px_rgba(15,46,35,0.2)] dark:shadow-[0_4px_15px_rgba(162,181,133,0.3)]' 
                                    : 'bg-slate-100 hover:bg-slate-200 text-[#3F5933] border border-slate-200 dark:bg-white/10 dark:hover:bg-white/20 dark:text-[#A2B585] dark:border-white/5'
                                }
                            `}
                        >
                            <Link href="/login">Select {plan.name.split(' ')[0]}</Link>
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
}



