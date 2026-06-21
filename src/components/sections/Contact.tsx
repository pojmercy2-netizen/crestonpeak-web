import { MapPin, Mail, Phone, Bitcoin, BarChart3, Lock, Bell, PieChart, User } from "lucide-react";
import apiClient from "@/lib/apiClient";

export async function Contact() {
    let whatsappNumber = "+1 (217) 335-0197";
    let contactEmail = "investment@crestonpeak.com";
    try {
        const [waRes, emailRes] = await Promise.all([
            apiClient.getWhatsappNumber().catch(() => null),
            apiClient.getContactEmail().catch(() => null)
        ]);
        if (waRes?.value) {
            whatsappNumber = waRes.value;
        }
        if (emailRes?.value) {
            contactEmail = emailRes.value;
        }
    } catch (e) {
        // Fallback
    }
    return (
        <section id="contact-section" className="contact py-12 md:py-24 px-4 px-4 md:px-8 bg-white dark:bg-[#020617] overflow-hidden transition-colors duration-300">
            {/* Custom keyframes for smooth 3D floating */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(-5deg); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
                    50% { transform: translateY(-25px) rotate(10deg) scale(1.05); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
                .animate-float-slow { animation: float-slow 8s ease-in-out infinite 2s; }
                
                .perspective-container { perspective: 1000px; }
                .phone-3d { transform: rotateX(15deg) rotateY(-20deg) rotateZ(5deg); transform-style: preserve-3d; }
            `}} />

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            Contact <span className="text-[#A2B585]">CrestonPeak</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                            Have questions or need assistance? Our support team is available
                            24/7 to help you with trading, investments, and account inquiries.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-[#A2B585] transition-colors">
                            <div className="w-14 h-14 bg-white dark:bg-[#0B1E19]/40 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <MapPin className="h-6 w-6 text-[#A2B585]" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Headquarters</p>
                                <p className="font-bold text-[#A2B585]">Global Offices • Online Support</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-[#A2B585] transition-colors">
                            <div className="w-14 h-14 bg-white dark:bg-[#0B1E19]/40 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <Mail className="h-6 w-6 text-[#A2B585]" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Email Us</p>
                                <p className="font-bold text-[#A2B585]">{contactEmail}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-[#A2B585] transition-colors">
                            <div className="w-14 h-14 bg-white dark:bg-[#0B1E19]/40 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm">
                                <Phone className="h-6 w-6 text-[#A2B585]" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Call Us</p>
                                <p className="font-bold text-[#A2B585]">{whatsappNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3D Animation Space */}
                <div className="hidden md:flex relative w-full h-[500px] perspective-container items-center justify-center">
                    {/* Glowing background behind animation */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#A2B585]/10 rounded-full blur-[80px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#0F2E23]/10 rounded-full blur-[60px] translate-x-10 translate-y-10"></div>

                    {/* Floating Icons Background Layer */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-10 left-10 animate-float-delayed bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-lg">
                            <BarChart3 className="w-8 h-8 text-[#A2B585]" />
                        </div>
                        <div className="absolute bottom-20 left-4 animate-float bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-4 rounded-3xl shadow-lg">
                            <PieChart className="w-10 h-10 text-[#0F2E23] dark:text-[#A2B585]" />
                        </div>
                        <div className="absolute top-1/4 right-0 animate-float-slow bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-4 rounded-[2rem] shadow-lg">
                            <Bell className="w-8 h-8 text-[#A2B585]" />
                        </div>
                    </div>

                    {/* Center 3D Phone/Card */}
                    <div className="relative z-10 phone-3d animate-float">
                        <div className="w-[280px] h-[550px] bg-white dark:bg-[#0B1E19]/90 border-8 border-slate-200 dark:border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden relative">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded-b-3xl z-20"></div>
                            
                            {/* Screen Content */}
                            <div className="w-full h-full bg-white dark:bg-[#020617] p-6 pt-12 flex flex-col items-center">
                                <div className="w-14 h-14 bg-[#A2B585]/20 rounded-full flex items-center justify-center mb-6 border border-[#A2B585]/30">
                                    <Bitcoin className="w-7 h-7 text-[#0F2E23] dark:text-[#A2B585]" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Get Paid in Bitcoin</h3>
                                <p className="text-slate-555 dark:text-slate-400 text-center text-sm mb-8">Secure, instant crypto withdrawals straight to your wallet.</p>
                                
                                <div className="w-full bg-white dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-800/80 mb-4 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Balance</span>
                                        <span className="text-[#A2B585] dark:text-[#A2B585] bg-[#EBF1E6] dark:bg-[#0F2E23]/40 px-2 py-0.5 rounded-full text-xs font-bold">+2.4%</span>
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900 dark:text-white">0.452 BTC</div>
                                    <div className="text-slate-500 dark:text-slate-400 text-sm mt-1">≈ $31,540.00</div>
                                </div>
                                
                                <div className="w-full space-y-3 mt-auto mb-4">
                                    <div className="h-12 w-full bg-[#0F2E23] dark:bg-[#A2B585] text-white dark:text-[#0B1E19] rounded-xl flex items-center justify-center font-bold shadow-lg hover:opacity-90 transition-opacity cursor-pointer">
                                        Withdraw Now
                                    </div>
                                    <div className="h-12 w-full bg-white dark:bg-[#0f172a] rounded-xl flex items-center justify-center text-slate-705 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-800 cursor-pointer">
                                        View History
                                    </div>
                                </div>
                            </div>
                            
                            {/* Glare effect */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none rounded-[2.5rem]"></div>
                        </div>
                    </div>

                    {/* Floating Icons Foreground Layer */}
                    <div className="absolute inset-0 pointer-events-none z-20">
                        <div className="absolute top-1/3 left-0 animate-float bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-3 rounded-full shadow-lg">
                            <Bitcoin className="w-7 h-7 text-yellow-500 dark:text-yellow-400" />
                        </div>
                        <div className="absolute bottom-1/4 right-8 animate-float-delayed bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-lg">
                            <Lock className="w-8 h-8 text-[#A2B585]" />
                        </div>
                        <div className="absolute bottom-4 right-1/4 animate-float-slow bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 p-3 rounded-full shadow-lg">
                            <User className="w-6 h-6 text-[#A2B585]" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}




