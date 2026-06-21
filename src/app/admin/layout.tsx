"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { BitcoinBackground } from "@/components/ui/BitcoinBackground";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isInitialized } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";

    useEffect(() => {
        // Only redirect after initialization and if user is set from API (not just localStorage)
        if (!isInitialized || isLoginPage) return;
        if (user === null) {
            router.push("/admin/login");
        }
        // Do not automatically redirect non-admins to /dashboard here, 
        // instead we will show them an access denied screen below
    }, [user, isInitialized, router, isLoginPage]);

    if (isLoginPage) {
        return <div className="dashboard-root bg-white dark:bg-slate-950 min-h-screen">{children}</div>;
    }

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            </div>
        );
    }

    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-center px-4">
                <div className="w-16 h-16 bg-red-500/10 flex items-center justify-center rounded-full mb-4">
                    <span className="text-red-500 text-3xl font-bold">!</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Access Denied</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md">You do not have administrative privileges to view this page. Please log in with an admin account.</p>
                <div className="flex gap-4">
                    <button onClick={() => router.push("/dashboard")} className="px-6 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg transition-colors">
                        Return to Dashboard
                    </button>
                    <button onClick={() => router.push("/admin/login")} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors">
                        Admin Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Light-mode style overrides for admin panel */}
            <style>{`
                /* Input and Select Visibility overrides in light mode */
                html:not(.dark) .dashboard-root input:not([type="checkbox"]):not([type="radio"]),
                html:not(.dark) .dashboard-root textarea,
                html:not(.dark) .dashboard-root select,
                html:not(.dark) .dashboard-root [data-slot="select-trigger"] {
                    color: #0f172a !important;
                    background-color: #ffffff !important;
                    border: 1px solid #e2e8f0 !important;
                    caret-color: #0f172a !important;
                }
                html:not(.dark) .dashboard-root input::placeholder,
                html:not(.dark) .dashboard-root textarea::placeholder {
                    color: #64748b !important;
                }
                html:not(.dark) .dashboard-root input[readonly],
                html:not(.dark) .dashboard-root input[disabled] {
                    color: #64748b !important;
                    background-color: #f3f4f6 !important;
                    cursor: not-allowed !important;
                }

                /* Select drop-down portals rendering outside dashboard root */
                html:not(.dark) [role="listbox"],
                html:not(.dark) [role="option"],
                html:not(.dark) [data-slot="select-content"],
                html:not(.dark) [data-slot="select-item"] {
                    color: #0f172a !important;
                    background-color: #ffffff !important;
                }
                html:not(.dark) [role="option"]:hover,
                html:not(.dark) [role="option"][data-highlighted],
                html:not(.dark) [data-slot="select-item"]:hover {
                    background-color: #f3f4f6 !important;
                    color: #0f172a !important;
                }

                /* Text white → dark overrides in light mode */
                html:not(.dark) .dashboard-root .text-white {
                    color: #0f172a !important;
                }
                html:not(.dark) .dashboard-root .text-slate-100 {
                    color: #0f172a !important;
                }
                html:not(.dark) .dashboard-root .text-slate-200 {
                    color: #0f172a !important;
                }
                html:not(.dark) .dashboard-root .text-slate-300 {
                    color: #1e293b !important;
                }
                html:not(.dark) .dashboard-root .text-slate-400 {
                    color: #475569 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-500 {
                    color: #475569 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-600 {
                    color: #334155 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-700 {
                    color: #1e293b !important;
                }
                html:not(.dark) .dashboard-root .text-slate-800 {
                    color: #0f172a !important;
                }
                html:not(.dark) .dashboard-root .text-slate-900 {
                    color: #0f172a !important;
                }
                html:not(.dark) .dashboard-root .text-slate-950 {
                    color: #0f172a !important;
                }

                /* Labels should be readable */
                html:not(.dark) .dashboard-root label {
                    color: #1e293b !important;
                    font-weight: 500 !important;
                }

                /* Preserve white text on colored (non-neutral) button backgrounds */
                html:not(.dark) .dashboard-root .bg-emerald-600,
                html:not(.dark) .dashboard-root .bg-emerald-500,
                html:not(.dark) .dashboard-root .bg-rose-600,
                html:not(.dark) .dashboard-root .bg-blue-600,
                html:not(.dark) .dashboard-root .bg-orange-600,
                html:not(.dark) .dashboard-root .bg-purple-600,
                html:not(.dark) .dashboard-root .bg-amber-500,
                html:not(.dark) .dashboard-root .bg-indigo-500,
                html:not(.dark) .dashboard-root .bg-sky-500 {
                    color: #ffffff !important;
                }

                /* Notification badge keeps white text on rose background */
                html:not(.dark) .dashboard-root .bg-rose-500 {
                    color: #ffffff !important;
                }

                /* Dark slate card/panel backgrounds → light in light mode */
                html:not(.dark) .dashboard-root .bg-slate-900,
                html:not(.dark) .dashboard-root .bg-slate-950,
                html:not(.dark) .dashboard-root .bg-slate-800 {
                    background-color: #f8fafc !important;
                    color: #0f172a !important;
                }

                /* thead background in light mode */
                html:not(.dark) .dashboard-root thead {
                    background-color: #f8fafc !important;
                    color: #475569 !important;
                }

                /* table row hover in light mode */
                html:not(.dark) .dashboard-root tbody tr:hover {
                    background-color: #f1f5f9 !important;
                }

                /* Modal / overlay panel backgrounds */
                html:not(.dark) .dashboard-root [class*="bg-slate-900"],
                html:not(.dark) .dashboard-root [class*="bg-slate-950"] {
                    background-color: #ffffff !important;
                    border-color: #e2e8f0 !important;
                }
            `}</style>

            <div className="dashboard-root flex h-screen bg-white dark:bg-slate-950 overflow-hidden text-slate-800 dark:text-slate-200 relative">
                <BitcoinBackground />
                
                {/* Mobile Overlay */}
                {isMobileOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}

                <Sidebar isMobileOpen={isMobileOpen} closeMobile={() => setIsMobileOpen(false)} isAdminView={true} />

                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    <Topbar onMenuClick={() => setIsMobileOpen(true)} />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-transparent relative z-10">
                        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

// Ensure recompile
