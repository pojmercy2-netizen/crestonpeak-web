import { Star, Quote } from "lucide-react";

export function Testimonials() {
    const reviews = [
        {
            name: "Sarah Jenkins",
            role: "Professional Trader",
            image: "https://i.pravatar.cc/150?img=47",
            text: "CrestonPeak completely transformed my portfolio. The automated trading systems are incredibly precise, and the withdrawals are instantly processed. Highly recommended.",
            rating: 5,
        },
        {
            name: "Michael Chen",
            role: "Venture Capitalist",
            image: "https://i.pravatar.cc/150?img=11",
            text: "I've been with several luxury investment platforms, but the transparency and security here are unmatched. The dashboard gives me exactly the metrics I need.",
            rating: 5,
        },
        {
            name: "Elena Rodriguez",
            role: "Retail Investor",
            image: "https://i.pravatar.cc/150?img=32",
            text: "As someone relatively new to crypto investments, the 24/7 support team made everything so simple. I've seen steady returns for the past 6 months.",
            rating: 5,
        },
    ];

    return (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-900 relative overflow-hidden transition-colors duration-500">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A2B585]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-2xl md:text-4xl lg:text-3xl md:text-5xl font-black text-[#0B1E19] dark:text-white mb-6 tracking-tight">
                        What Our <span className="text-[#A2B585]">Clients Say</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        Don't just take our word for it. Read the experiences of our investors from around the globe.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div 
                            key={index}
                            className="bg-white dark:bg-[#0f172a] border border-slate-200/50 dark:border-slate-800 rounded-3xl p-8 relative group hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-300 shadow-sm"
                        >
                            <Quote className="absolute top-6 right-8 w-12 h-12 text-[#3F5933]/5 dark:text-slate-800/20 group-hover:text-[#A2B585]/10 transition-colors" />
                            
                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-[#3F5933] text-[#3F5933] dark:fill-[#A2B585] dark:text-[#A2B585]" />
                                ))}
                            </div>
                            
                            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-8 relative z-10">
                                "{review.text}"
                            </p>
                            
                            <div className="flex items-center gap-4">
                                <img 
                                    src={review.image} 
                                    alt={review.name} 
                                    className="w-12 h-12 rounded-full border-2 border-slate-200 dark:border-slate-800 object-cover"
                                />
                                <div>
                                    <h4 className="text-slate-800 dark:text-white font-bold">{review.name}</h4>
                                    <p className="text-slate-500 text-sm">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}




