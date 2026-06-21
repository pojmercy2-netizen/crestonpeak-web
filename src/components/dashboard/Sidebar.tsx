"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, WalletCards, ArrowDownToLine, ArrowUpToLine, History, Settings, FileText,
    ShieldCheck, Users, ListFilter, Link2, PlaySquare, Activity, PieChart, CreditCard, Database, Bot, Share2, User
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Connect Wallet", href: "/dashboard/connect-wallet", icon: Link2 },
    { name: "Deposits", href: "/dashboard/deposits", icon: ArrowDownToLine },
    { name: "Withdrawals", href: "/dashboard/withdrawals", icon: ArrowUpToLine },
    { name: "Asset Portfolio", href: "/dashboard/portfolio", icon: PieChart },
    { name: "My Plans", href: "/dashboard/plans", icon: FileText },
    { name: "Transactions", href: "/dashboard/transactions", icon: History },
    { name: "Trading Signals", href: "/dashboard/signals", icon: Activity },
    { name: "AI Trading", href: "/dashboard/ai-trading", icon: Bot },
    { name: "Social Trading", href: "/dashboard/social-trading", icon: Share2 },
    { name: "Educational Videos", href: "/dashboard/education", icon: PlaySquare },
    { name: "Subscriptions", href: "/dashboard/subscriptions", icon: CreditCard },
];

const accountItems = [
    { name: "My Data", href: "/dashboard/my-data", icon: Database },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const adminItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "All Transactions", href: "/admin/transactions", icon: ListFilter },
    { name: "Global Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar({ isMobileOpen, closeMobile, isAdminView }: { isMobileOpen?: boolean; closeMobile?: () => void; isAdminView?: boolean }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const [whatsappNumber, setWhatsappNumber] = useState("+12173350197");

    useEffect(() => {
        import("@/lib/apiClient").then(({ default: apiClient }) => {
            apiClient.getWhatsappNumber().then(res => {
                if (res?.value) setWhatsappNumber(res.value);
            }).catch(e => console.error("Failed to fetch whatsapp number", e));
        });
    }, []);

    const itemClass = (isActive: boolean) => {
        return isActive
            ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shadow-[0_0_20px_rgba(14,165,233,0.15)] dark:shadow-inner"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:-translate-y-0.5";
    };

    const iconClass = (isActive: boolean) => {
        return isActive
            ? "text-sky-600 dark:text-sky-400 scale-110"
            : "text-slate-500 group-hover:scale-110 group-hover:text-slate-700 dark:group-hover:text-slate-300";
    };

    const adminItemClass = (isActive: boolean) => {
        return isActive
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)] dark:shadow-inner"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:-translate-y-0.5";
    };

    const adminIconClass = (isActive: boolean) => {
        return isActive
            ? "text-emerald-600 dark:text-emerald-400 scale-110"
            : "text-slate-500 group-hover:scale-110 group-hover:text-slate-700 dark:group-hover:text-slate-300";
    };

    return (
        <aside
            className={`w-64 backdrop-blur-3xl flex-shrink-0 flex flex-col transition-all duration-500 z-40 bg-white/90 dark:bg-slate-900/80
            ${isMobileOpen
                    ? 'translate-x-0 absolute inset-y-0 left-0 m-4 h-[calc(100vh-32px)] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
                    : '-translate-x-full absolute inset-y-0 left-0 md:relative md:translate-x-0 md:m-4 md:rounded-3xl md:h-[calc(100vh-32px)] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none md:hover:-translate-y-1 md:hover:shadow-[0_15px_40px_rgba(14,165,233,0.15)] md:hover:border-sky-500/30'
                }`}
        >
            <div className="p-6 flex items-center justify-between">
                <Link href="/" className="flex items-center justify-center flex-1">
                    <img src="/logo.png" alt="Creston Peak Logo" className="h-28 w-28 object-contain" />
                </Link>
                {isMobileOpen && closeMobile && (
                    <button onClick={closeMobile} className="md:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition">
                        ✕
                    </button>
                )}
            </div>
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4">
                {(user?.role !== 'admin' && !isAdminView) ? (
                    <>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => { if (isMobileOpen && closeMobile) closeMobile(); }}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium relative overflow-hidden
                                        ${itemClass(isActive)}`}
                                >
                                    {isActive && <div className={`absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent ${isMobileOpen ? 'opacity-30 dark:opacity-50' : 'opacity-50'}`} />}
                                    <item.icon size={20} className={`relative z-10 transition-transform duration-300 ${iconClass(isActive)}`} />
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            );
                        })}

                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 flex items-center gap-2">
                            <User size={14} /> Account
                        </p>
                        {accountItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => { if (isMobileOpen && closeMobile) closeMobile(); }}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium relative overflow-hidden
                                        ${itemClass(isActive)}`}
                                >
                                    {isActive && <div className={`absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent ${isMobileOpen ? 'opacity-30 dark:opacity-50' : 'opacity-50'}`} />}
                                    <item.icon size={20} className={`relative z-10 transition-transform duration-300 ${iconClass(isActive)}`} />
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            );
                        })}
                    </>
                ) : (
                    <>
                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <ShieldCheck size={14} /> Admin Tools
                        </p>
                        {adminItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => { if (isMobileOpen && closeMobile) closeMobile(); }}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium relative overflow-hidden
                                        ${adminItemClass(isActive)}`}
                                >
                                    {isActive && <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent ${isMobileOpen ? 'opacity-30 dark:opacity-50' : 'opacity-50'}`} />}
                                    <item.icon size={20} className={`relative z-10 transition-transform duration-300 ${adminIconClass(isActive)}`} />
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            );
                        })}
                    </>
                )}
            </nav>
            <div className={`p-4 border-t ${isMobileOpen ? 'border-slate-200 dark:border-slate-800' : 'border-slate-200 dark:border-slate-800'}`}>
                <div className={`p-4 rounded-xl text-center border shadow-inner ${isMobileOpen
                        ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}>
                    <WalletCards className="mx-auto mb-2 text-sky-500" size={32} />
                    <p className={`text-sm font-medium ${isMobileOpen ? 'text-slate-800 dark:text-white' : 'text-slate-800 dark:text-white'}`}>Need Support?</p>
                    <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className={`text-xs hover:underline mt-1 block ${isMobileOpen ? 'text-sky-600 dark:text-sky-400' : 'text-sky-600 dark:text-sky-400'}`}>Contact Help Desk</a>
                </div>
            </div>
        </aside>
    );
}

