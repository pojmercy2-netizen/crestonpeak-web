"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Calendar, Clock, MessageSquare, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const plans = [
    { name: "Basic", price: "Free", icon: Zap, features: ["Daily Market Updates", "Basic Signals", "Standard Support"], color: "slate" },
    { name: "Pro Trader", price: "$49/mo", icon: Star, features: ["Premium Signals", "1-on-1 Coaching Session", "Priority Support", "Advanced Analytics"], color: "sky", popular: true },
];

export default function SubscriptionsPage() {
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
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsBookingModalOpen(false);
            setBookingData({ date: "", time: "", topic: "" });
            toast.success("Session booked successfully! Your account manager will send you the meeting link shortly.");
        }, 1500);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
            <div className="text-center max-w-2xl mx-auto space-y-2">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Manage Subscriptions</h1>
                <p className="text-slate-500 dark:text-slate-400">Upgrade your plan to unlock advanced trading features and premium signals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
                {plans.map((plan, idx) => (
                    <Card key={idx} className={`relative group bg-white dark:bg-[#0f172a] border ${plan.popular ? 'border-sky-500 shadow-[0_4px_30px_rgba(14,165,233,0.15)] dark:shadow-[0_0_40px_rgba(14,165,233,0.2)] scale-105 z-10' : 'border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl'} overflow-hidden transition-all duration-500 hover:-translate-y-2`}>
                        {plan.popular && (
                            <div className="absolute top-0 right-0 bg-sky-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-bl-lg z-20">
                                MOST POPULAR
                            </div>
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-br from-${plan.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        <CardHeader className="text-center relative z-10 pt-8">
                            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${plan.popular ? 'bg-sky-50 dark:bg-sky-500/20 text-sky-500 dark:text-sky-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                <plan.icon size={24} />
                            </div>
                            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</CardTitle>
                            <div className="mt-4">
                                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10 space-y-6 px-8 pb-8">
                            <ul className="space-y-3">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                        <Check size={18} className={plan.popular ? "text-sky-500 dark:text-sky-400" : "text-slate-400 dark:text-slate-500"} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button className={`w-full h-12 font-bold ${plan.popular ? 'bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 shadow-[0_4px_14px_rgba(14,165,233,0.3)] dark:shadow-[0_0_20px_rgba(14,165,233,0.4)]' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white'}`}>
                                {plan.popular ? 'Upgrade Now' : 'Current Plan'}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="max-w-4xl mx-auto mt-12 text-center bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-sky-500/20 rounded-3xl p-8 shadow-md dark:shadow-none backdrop-blur-md">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ready for your 1-on-1 Coaching Session?</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xl mx-auto">Exclusive to Pro Traders. Schedule a private session with our expert analysts to review your portfolio and refine your trading strategy.</p>
                <Button onClick={() => setIsBookingModalOpen(true)} className="bg-sky-500 hover:bg-sky-400 text-white dark:text-slate-950 font-bold h-12 px-8 shadow-[0_4px_14px_rgba(14,165,233,0.3)] dark:shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] transition-all">
                    <Calendar className="mr-2" size={18} /> Book a Session Now
                </Button>
            </div>

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
