import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export function LatestNews() {
    const articles = [
        {
            title: "Bitcoin Surges Past New All-Time Highs",
            category: "Market Update",
            date: "Oct 24, 2026",
            image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop",
            excerpt: "As institutional adoption grows, Bitcoin crosses major resistance levels, signaling a new bullish phase for major cryptocurrencies.",
            link: "#",
        },
        {
            title: "CrestonPeak Announces Upgraded AI Algorithms",
            category: "Platform News",
            date: "Oct 21, 2026",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=2070&auto=format&fit=crop",
            excerpt: "Our engineering team has deployed v4 of our proprietary trading algorithm, expected to increase monthly yields by an average of 1.5%.",
            link: "#",
        },
        {
            title: "The Future of DeFi and Smart Contracts",
            category: "Education",
            date: "Oct 18, 2026",
            image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1969&auto=format&fit=crop",
            excerpt: "Learn how decentralized finance is reshaping traditional banking systems and how you can capitalize on the transition.",
            link: "#",
        },
    ];

    return (
        <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#020617] relative border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            Latest <span className="text-[#A2B585]">Insights</span>
                        </h2>
                        <p className="text-black dark:text-slate-400 text-lg max-w-xl">
                            Stay updated with the latest market trends, platform announcements, and educational resources.
                        </p>
                    </div>
                    <Link href="/blog" className="hidden md:flex items-center gap-2 text-[#A2B585] hover:text-[#0F2E23] dark:hover:text-[#C5D3B3] transition-colors font-semibold">
                        View All Articles <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <div 
                            key={index}
                            className="bg-white dark:bg-[#0B1E19]/40 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden group hover:border-[#A2B585]/40 dark:hover:border-[#A2B585]/40 transition-all duration-300 shadow-sm"
                        >
                            <div className="h-40 overflow-hidden relative">
                                <div className="absolute top-4 left-4 z-10 bg-white/95 dark:bg-[#020617]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0F2E23] dark:text-[#A2B585] border border-slate-200 dark:border-slate-800">
                                    {article.category}
                                </div>
                                <img 
                                    src={article.image} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                                    <Calendar className="w-4 h-4 text-[#A2B585]" />
                                    {article.date}
                                </div>
                                
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#A2B585] transition-colors">
                                    {article.title}
                                </h3>
                                
                                <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                    {article.excerpt}
                                </p>
                                
                                <Link href={article.link} className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-[#A2B585] dark:hover:text-[#A2B585] transition-colors">
                                    Read More <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-10 text-center md:hidden">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-[#A2B585] hover:text-[#0F2E23] dark:hover:text-[#C5D3B3] transition-colors font-medium">
                        View All Articles <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}




