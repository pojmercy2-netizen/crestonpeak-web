import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function CallToAction() {
    return (
        <section className="cta-section py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#020617] relative overflow-hidden transition-colors duration-300">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#020617] dark:via-[#020617]/80 dark:to-transparent"></div>
            
            <div className="max-w-5xl mx-auto relative z-10">
                <div
                    className="bg-gradient-cta dark:from-[#0F2E23]/20 dark:to-[#0B1E19]/20 border border-slate-200 dark:border-slate-800/80 rounded-[2.5rem] p-8 md:p-16 text-center shadow-lg relative overflow-hidden"
                    style={{ background: 'linear-gradient(to bottom right, #EBF1E6, #ffffff)' }}
                >
                    
                    {/* Decorative glowing orb */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#A2B585]/15 dark:bg-[#0F2E23]/30 rounded-full blur-[100px]"></div>

                    <div className="relative z-10">
                        <div className="cta-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 mb-8">
                            <ShieldCheck className="cta-badge-icon w-5 h-5 text-[#3F5933] dark:text-[#A2B585]" />
                            <span className="cta-badge-text text-sm font-medium text-[#3F5933] dark:text-slate-300">Regulated & Secure Platform</span>
                        </div>
                        
                        <h2 className="cta-heading text-2xl md:text-4xl lg:text-5xl lg:text-3xl md:text-5xl lg:text-6xl font-bold text-[#0B1E19] dark:text-white mb-6 tracking-tight keep-color">
                            Ready to Transform Your <br className="hidden md:block" />
                            <span className="text-[#A2B585]">Financial Future?</span>
                        </h2>
                        
                        <p className="cta-body text-[#3F5933] dark:text-slate-300 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Join over 5,000 investors worldwide who trust Creston Peak to grow their wealth through precision AI-driven strategies.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link 
                                href="/signup" 
                                className="w-full sm:w-auto px-8 py-4 bg-[#0F2E23] hover:bg-[#0F2E23]/90 text-white dark:bg-[#A2B585] dark:hover:bg-[#A2B585]/90 dark:text-[#0B1E19] font-bold rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                            >
                                Start Investing Now <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link 
                                href="/login" 
                                className="cta-contact w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-[#3F5933] dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-bold rounded-full transition-all border border-[#3F5933]/30 dark:border-slate-700 flex items-center justify-center shadow-sm"
                            >
                                Contact Sales
                            </Link>
                        </div>
                        
                        <p className="cta-disclaimer text-slate-600 dark:text-slate-500 text-sm mt-8">
                            * Capital at risk. Please read our risk disclosure before investing.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}




