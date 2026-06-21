"use client";

import { useAuth } from "@/context/AuthContext";
import { Menu, LogOut, Bell, Check, Mail, X, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import apiClient from "@/lib/apiClient";

import { ThemeToggle } from "@/components/ThemeToggle";

function timeAgo(dateString: string): string {
    const now = Date.now();
    const then = new Date(dateString).getTime();
    const diff = Math.floor((now - then) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(dateString).toLocaleDateString();
}

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
    const { user, logout } = useAuth();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBellRinging, setIsBellRinging] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await apiClient.getNotifications();
                if (res?.data) setNotifications(res.data);
            } catch (err) {
                console.error("Failed to fetch notifications:", err);
            }
        };
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Lock body scroll when mobile drawer is open
    useEffect(() => {
        if (isDropdownOpen && window.innerWidth < 640) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isDropdownOpen]);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    const handleBellClick = () => {
        setIsBellRinging(true);
        setTimeout(() => setIsBellRinging(false), 600);
        setIsDropdownOpen(prev => !prev);
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await apiClient.markNotificationRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (err) {
            console.error("Failed to mark as read:", err);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await apiClient.markAllNotificationsRead();
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        } catch (err) {
            console.error("Failed to mark all as read:", err);
        }
    };

    const NotificationPanel = () => (
        <>
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                    <BellRing size={18} className="text-sky-500" />
                    Notifications
                    {unreadCount > 0 && (
                        <span className="ml-1 px-2 py-0.5 text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full border border-sky-500/20">
                            {unreadCount} new
                        </span>
                    )}
                </h3>
                <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs text-sky-500 dark:text-sky-400 hover:text-sky-400 dark:hover:text-sky-300 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-sky-500/10"
                        >
                            <Check size={13} /> Mark all read
                        </button>
                    )}
                    {/* Mobile close button */}
                    <button
                        onClick={() => setIsDropdownOpen(false)}
                        className="sm:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white transition p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1 sm:max-h-[420px]">
                {notifications.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <Mail size={28} className="text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">All caught up!</p>
                        <p className="text-slate-400 dark:text-slate-500 text-xs">No new notifications</p>
                    </div>
                ) : (
                    notifications.map((notif, i) => (
                        <div
                            key={notif.id}
                            onClick={() => !notif.is_read && handleMarkAsRead(notif.id)}
                            style={{ animationDelay: `${i * 30}ms` }}
                            className={`
                                group relative p-4 border-b border-slate-100 dark:border-slate-800/60
                                transition-all duration-200 cursor-pointer
                                animate-in fade-in slide-in-from-top-1
                                ${notif.is_read
                                    ? 'hover:bg-slate-50 dark:hover:bg-slate-800/30 opacity-70'
                                    : 'hover:bg-sky-50 dark:hover:bg-sky-900/10 bg-sky-50/50 dark:bg-sky-950/20'
                                }
                            `}
                        >
                            {/* Unread left-bar accent */}
                            {!notif.is_read && (
                                <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-sky-500" />
                            )}

                            <div className="flex items-start gap-3 pl-1">
                                {/* Icon dot */}
                                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${notif.is_read ? 'bg-slate-300 dark:bg-slate-600' : 'bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.6)] animate-pulse'}`} />

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className={`font-semibold text-sm leading-snug ${notif.is_read ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                                            {notif.title}
                                        </h4>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap flex-shrink-0 mt-0.5">
                                            {timeAgo(notif.created_at)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed whitespace-pre-wrap">
                                        {notif.message}
                                    </p>
                                    {!notif.is_read && (
                                        <span className="inline-block mt-2 text-[10px] text-sky-500 dark:text-sky-400 font-medium">
                                            Tap to mark as read
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );

    return (
        <>
            <header className="h-20 bg-white/80 dark:bg-slate-900/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 flex items-center justify-between px-6 sticky top-4 z-30 mx-4 mt-4 mb-2 transition-all duration-500 hover:-translate-y-1 hover:border-sky-500/30 dark:hover:bg-slate-900/60 shadow-sm dark:shadow-none rounded-2xl">
                <div className="flex items-center gap-4">
                    <button onClick={onMenuClick} className="md:hidden text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                        <Menu size={28} />
                    </button>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white hidden sm:block tracking-tight">Dashboard Overview</h2>
                </div>

                <div className="flex items-center gap-6">
                    {/* Notification Bell */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={handleBellClick}
                            aria-label="Notifications"
                            aria-expanded={isDropdownOpen}
                            className={`
                                relative p-2 rounded-full transition-all duration-300
                                text-slate-500 dark:text-slate-400
                                hover:text-sky-500 dark:hover:text-sky-400
                                hover:bg-sky-500/10 hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]
                                hover:-translate-y-0.5 active:scale-95
                                ${isDropdownOpen ? 'text-sky-500 dark:text-sky-400 bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.2)]' : ''}
                            `}
                        >
                            <Bell
                                size={24}
                                className={`transition-transform duration-300 ${isBellRinging ? 'animate-[wiggle_0.5s_ease-in-out]' : ''}`}
                                style={{
                                    transformOrigin: 'top center',
                                    animation: isBellRinging ? 'bellRing 0.5s ease-in-out' : undefined,
                                }}
                            />
                            {unreadCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-rose-500 border-2 border-white dark:border-slate-950 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse flex items-center justify-center text-[10px] text-white font-bold px-1">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        {/* ── Desktop dropdown ── */}
                        <div
                            className={`
                                hidden sm:block absolute right-0 mt-3 w-96
                                bg-white dark:bg-slate-900/95 backdrop-blur-xl
                                border border-slate-200 dark:border-slate-700/50
                                rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                                overflow-hidden z-50
                                transition-all duration-200 origin-top-right
                                ${isDropdownOpen
                                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                                }
                            `}
                        >
                            <NotificationPanel />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-6">
                        <ThemeToggle />
                        <div className="hidden text-right md:block">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{user?.full_name || "User"}</p>
                            <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">{user?.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-white font-bold text-lg shadow-lg border-2 border-slate-300 dark:border-slate-700 overflow-hidden relative cursor-pointer transition-all duration-300 hover:scale-110 hover:border-sky-500 hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] group">
                            {user?.profile_picture ? (
                                <img src={user.profile_picture} alt="Avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-tr from-sky-400 to-blue-700 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <span className="relative z-10">{user?.full_name?.charAt(0).toUpperCase() || "U"}</span>
                                </div>
                            )}
                        </div>
                        <Button onClick={logout} variant="ghost" size="icon" className="group text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 ml-2 rounded-full h-10 w-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                            <LogOut size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* ── Mobile full-screen drawer ── */}
            {/* Backdrop */}
            <div
                onClick={() => setIsDropdownOpen(false)}
                className={`
                    sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40
                    transition-opacity duration-300
                    ${isDropdownOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            />
            {/* Drawer panel */}
            <div
                className={`
                    sm:hidden fixed bottom-0 left-0 right-0 z-50
                    bg-white dark:bg-slate-900
                    rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.6)]
                    border-t border-slate-200 dark:border-slate-700/50
                    flex flex-col
                    max-h-[85vh]
                    transition-transform duration-300 ease-out
                    ${isDropdownOpen ? 'translate-y-0' : 'translate-y-full'}
                `}
            >
                {/* Drag handle */}
                <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                    <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                </div>
                <NotificationPanel />
                {/* Safe area bottom padding */}
                <div className="h-6 flex-shrink-0" />
            </div>

            {/* Bell ring keyframe */}
            <style>{`
                @keyframes bellRing {
                    0%   { transform: rotate(0deg); }
                    15%  { transform: rotate(15deg); }
                    30%  { transform: rotate(-13deg); }
                    45%  { transform: rotate(10deg); }
                    60%  { transform: rotate(-8deg); }
                    75%  { transform: rotate(5deg); }
                    90%  { transform: rotate(-2deg); }
                    100% { transform: rotate(0deg); }
                }
            `}</style>
        </>
    );
}
