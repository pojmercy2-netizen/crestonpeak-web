"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Clock, BookOpen, X, Calendar, MessageSquare, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const videos = [
    { title: "Introduction to Forex Trading", duration: "00:20", category: "Basics", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop" },
    { title: "Understanding Candlestick Patterns", duration: "00:20", category: "Technical", image: "https://images.unsplash.com/photo-1535320903710-d9938a11b575?q=80&w=800&auto=format&fit=crop" },
    { title: "Risk Management Strategies", duration: "00:20", category: "Advanced", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=800&auto=format&fit=crop" },
    { title: "How to use Noble Edge Platform", duration: "00:20", category: "Tutorial", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
];

const videoContent: Record<string, string[]> = {
    "Introduction to Forex Trading": [
        "Welcome to Forex Trading.",
        "Forex (Foreign Exchange) is the global marketplace for exchanging currencies.",
        "Traders profit from fluctuations in exchange rates.",
        "Key concepts: Pips, Lots, and Leverage.",
        "Let's get started on your trading journey!"
    ],
    "Understanding Candlestick Patterns": [
        "Candlestick Patterns 101.",
        "A candlestick shows the Open, High, Low, and Close prices.",
        "Green/White = Bullish (Price went up).",
        "Red/Black = Bearish (Price went down).",
        "Look for patterns like Doji, Hammer, and Engulfing."
    ],
    "Risk Management Strategies": [
        "Protecting Your Capital.",
        "Never risk more than 1-2% of your account on a single trade.",
        "Always use Stop Loss (SL) and Take Profit (TP) orders.",
        "Calculate your risk-to-reward ratio before entering.",
        "Emotion is your enemy; discipline is your shield."
    ],
    "How to use Noble Edge Platform": [
        "Mastering Noble Edge.",
        "Step 1: Connect your wallet from the dashboard.",
        "Step 2: Choose a subscription plan for premium signals.",
        "Step 3: Monitor your assets in the Portfolio section.",
        "Step 4: Enable AI Trading for automated gains!"
    ]
};

const AnimatedPlayer = ({ title }: { title: string }) => {
    const slides = videoContent[title] || ["Loading content..."];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 4000); // 4 seconds per slide
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="w-full h-full bg-[#020617] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15),transparent_60%)]" />
            
            <div className="relative z-10 max-w-3xl text-center h-40 flex items-center justify-center">
                <p key={currentSlide} className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 animate-in fade-in zoom-in-95 duration-1000">
                    {slides[currentSlide]}
                </p>
            </div>

            <div className="absolute bottom-6 flex gap-2 z-10">
                {slides.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]' : 'w-2 bg-slate-700'}`} />
                ))}
            </div>
        </div>
    );
};

export default function EducationPage() {
    const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingData, setBookingData] = useState({ date: "", time: "", topic: "" });

    const handleBookSession = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingData.date || !bookingData.time || !bookingData.topic) {
            toast.error("Please fill in all fields to book a session.");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsBookingModalOpen(false);
            setBookingData({ date: "", time: "", topic: "" });
            toast.success("Session booked successfully! Your account manager will send you the meeting link shortly.");
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Educational Videos</h1>
                <p className="text-slate-550 dark:text-slate-400 mt-1">Enhance your trading skills with our curated masterclasses.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((vid, idx) => (
                    <Card key={idx} onClick={() => setSelectedVideo(vid)} className="group bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] hover:border-sky-300 dark:hover:ring-sky-500/50 cursor-pointer">
                        <div className="relative h-40 overflow-hidden">
                            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors z-10" />
                            <img src={vid.image} alt={vid.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <PlayCircle size={48} className="text-white drop-shadow-[0_0_15px_rgba(14,165,233,0.8)] animate-pulse" />
                            </div>
                        </div>
                        <CardContent className="p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold px-2 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-md border border-sky-200 dark:border-sky-500/20">{vid.category}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1"><Clock size={12}/> {vid.duration}</span>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">{vid.title}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            <Card className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/40 dark:to-indigo-900/40 border border-sky-100 dark:border-none dark:ring-1 dark:ring-sky-500/30 shadow-md dark:shadow-none">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-sky-100 dark:bg-sky-500/20 rounded-full text-sky-600 dark:text-sky-400">
                            <BookOpen size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Want to learn 1-on-1?</h3>
                            <p className="text-slate-550 dark:text-slate-400 text-sm">Book a session with our professional traders to review your strategy.</p>
                        </div>
                    </div>
                    <button onClick={() => setIsBookingModalOpen(true)} className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 font-bold rounded-lg shadow-[0_4px_14px_rgba(14,165,233,0.3)] dark:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all hover:scale-105 whitespace-nowrap">
                        Book a Session
                    </button>
                </CardContent>
            </Card>

            {/* Video Player Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="w-full max-w-4xl bg-[#020617] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/80 hover:text-rose-400 rounded-full h-10 w-10 transition-all"
                            onClick={() => setSelectedVideo(null)}
                        >
                            <X size={24} />
                        </Button>
                        <div className="aspect-video w-full bg-black relative">
                            <AnimatedPlayer title={selectedVideo.title} />
                        </div>
                        <div className="p-6 bg-white dark:bg-[#0f172a]">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-semibold px-2 py-1 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-md border border-sky-200 dark:border-sky-500/20">{selectedVideo.category}</span>
                                <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1"><Clock size={14}/> {selectedVideo.duration}</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selectedVideo.title}</h2>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#020617]/50">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Calendar className="text-sky-500 dark:text-sky-400" size={24} /> Book a Session
                            </h2>
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 dark:hover:text-white" onClick={() => setIsBookingModalOpen(false)}>
                                <X size={20} />
                            </Button>
                        </div>
                        <form onSubmit={handleBookSession} className="p-6 space-y-5">
                            <div>
                                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 block flex items-center gap-2">
                                    <Calendar size={14} /> Preferred Date
                                </label>
                                <Input 
                                    type="date" 
                                    required
                                    value={bookingData.date}
                                    onChange={e => setBookingData({...bookingData, date: e.target.value})}
                                    className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus-visible:ring-sky-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 block flex items-center gap-2">
                                    <Clock size={14} /> Preferred Time
                                </label>
                                <Input 
                                    type="time" 
                                    required
                                    value={bookingData.time}
                                    onChange={e => setBookingData({...bookingData, time: e.target.value})}
                                    className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus-visible:ring-sky-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1.5 block flex items-center gap-2">
                                    <MessageSquare size={14} /> Topic / Questions
                                </label>
                                <Textarea 
                                    required
                                    placeholder="What would you like to discuss?"
                                    value={bookingData.topic}
                                    onChange={e => setBookingData({...bookingData, topic: e.target.value})}
                                    className="bg-white dark:bg-[#020617] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white min-h-[100px] resize-none focus-visible:ring-sky-500"
                                />
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 font-bold mt-2">
                                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Confirm Booking"}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
