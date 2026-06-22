"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout, isInitialized } = useAuth();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="sticky top-0 z-[100] w-full bg-white dark:bg-[#020617] border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300 shadow-sm">
            <div className="max-w-[1300px] mx-auto flex items-center justify-between py-1 px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center">
                    <div className="relative w-[50px] h-[50px] sm:w-[65px] sm:h-[65px]">
                        <Image src="/logo.png" alt="Creston Peak Logo" fill className="object-contain" priority />
                    </div>
                </Link>
 
                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-5">
                    <ul className="flex gap-5 text-black dark:text-white font-medium text-[14px]">
                        <li><Link href="/" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] transition-colors">Home</Link></li>
                        <li><Link href="/#plan-section" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] transition-colors">Plans</Link></li>
                        <li><Link href="/#about-section" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] transition-colors">About</Link></li>
                        <li><Link href="/#faq-sections" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] transition-colors">FAQ's</Link></li>
                        <li><Link href="/#global-trading-session" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] transition-colors">Sessions</Link></li>
                        <li><Link href="/#contact-section" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] transition-colors">Contact</Link></li>
                    </ul>
 
                    <div className="flex items-center gap-3 ml-2">
                        <ThemeToggle className="text-slate-700 hover:text-black hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800" />
                        {!isInitialized ? null : user ? (
                            <div className="flex items-center gap-3">
                                <Button asChild variant="ghost" size="sm" className="text-emerald-700 dark:text-sky-400 hover:bg-emerald-500/10 dark:hover:bg-sky-500/20 hover:text-emerald-800 dark:hover:text-sky-300 rounded-xl font-bold">
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                                <Button onClick={logout} variant="ghost" size="sm" className="text-orange-500 hover:bg-orange-500/10 hover:text-orange-400 rounded-xl font-medium">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button asChild variant="ghost" size="sm" className="text-black dark:text-sky-100 hover:bg-slate-100 dark:hover:bg-sky-500/20 hover:text-black dark:hover:text-white rounded-xl font-medium transition-transform hover:-translate-y-0.5">
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild size="sm" className="bg-[#0F2E23] hover:bg-[#163d30] text-white dark:bg-[#A2B585] dark:hover:bg-[#b0c493] dark:text-[#0F2E23] rounded-xl font-medium transition-transform hover:-translate-y-0.5 shadow-lg shadow-emerald-500/10 dark:shadow-emerald-500/25">
                                    <Link href="/signup">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </nav>
 
                {/* Mobile Toggle & Theme Button Group */}
                <div className="flex lg:hidden items-center gap-1">
                    <ThemeToggle className="text-black dark:text-white hover:bg-slate-100 dark:hover:bg-white/10" />
                    <button className="text-black dark:text-white p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
 
            {/* Mobile Nav */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-[600px] opacity-100 p-6" : "max-h-0 opacity-0 p-0"}`}>
                <ul className="flex flex-col gap-4 text-black dark:text-white text-lg font-medium border-t border-slate-100 dark:border-white/10 pt-4">
                    <li><Link href="/" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] block py-1" onClick={toggleMenu}>Home</Link></li>
                    <li><Link href="/#plan-section" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] block py-1" onClick={toggleMenu}>Plans</Link></li>
                    <li><Link href="/#about-section" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] block py-1" onClick={toggleMenu}>About</Link></li>
                    <li><Link href="/#faq-sections" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] block py-1" onClick={toggleMenu}>FAQ's</Link></li>
                    <li><Link href="/#global-trading-session" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] block py-1" onClick={toggleMenu}>Sessions</Link></li>
                    <li><Link href="/#contact-section" className="hover:text-[#3F5933] dark:hover:text-[#A2B585] block py-1" onClick={toggleMenu}>Contact</Link></li>
                </ul>
                <div className="flex flex-col gap-3 mt-6 border-t border-slate-100 dark:border-white/10 pt-6">
                    {!isInitialized ? null : user ? (
                        <div className="flex flex-col gap-3 w-full">
                            <span className="text-slate-500 dark:text-white/70 text-sm font-medium">Welcome, {user.full_name.split(' ')[0]}</span>
                            <Button asChild className="w-full bg-[#0F2E23] hover:bg-[#163d30] text-white dark:bg-[#A2B585] dark:hover:bg-[#b0c493] dark:text-[#0F2E23] font-bold rounded-xl" onClick={toggleMenu}>
                                <Link href="/dashboard">Dashboard</Link>
                            </Button>
                            <Button onClick={() => { logout(); toggleMenu(); }} variant="outline" className="w-full border-orange-500/50 text-orange-500 hover:bg-orange-500/10 rounded-xl">
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            <Button asChild variant="outline" className="w-full border-slate-200 text-black dark:border-white/20 dark:text-white dark:hover:bg-white/10 rounded-xl" onClick={toggleMenu}>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="w-full bg-[#0F2E23] hover:bg-[#163d30] text-white dark:bg-[#A2B585] dark:hover:bg-[#b0c493] dark:text-[#0F2E23] rounded-xl" onClick={toggleMenu}>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

