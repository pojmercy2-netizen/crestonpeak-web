"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { BitcoinBackground } from "@/components/ui/BitcoinBackground";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isInitialized } = useAuth();
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        // Only redirect after initialization and if user is set from API (not just localStorage)
        if (!isInitialized) return;
        if (user === null) {
            router.push("/login");
        } else if ((user.role === "admin" || user.role === "superadmin") && localStorage.getItem("user")) {
            // Only redirect if user is admin and user data is confirmed (API has run)
            router.push("/admin");
        }
    }, [user, isInitialized, router]);

    if (!isInitialized || !user) {
        return (
            <>
                <style>{`
                    :root { --dash-bg: url('/auth-bg-light.png'); }
                    .dark { --dash-bg: none; }
                `}</style>
                <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950"
                    style={{ backgroundImage: "var(--dash-bg)", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className="absolute inset-0 bg-white/80 dark:bg-transparent pointer-events-none" />
                    <div className="relative z-10 w-12 h-12 border-4 border-[#2E5B46] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(46,91,70,0.5)]"></div>
                </div>
            </>
        );
    }

    return (
        <>
            {/* Light-mode style overrides for dashboard */}
            <style>{`
                :root { --dash-bg: url('/auth-bg-light.png'); }
                .dark { --dash-bg: none; }

                /* Remove all border radius in light mode dashboard */
                html:not(.dark) .dashboard-root,
                html:not(.dark) .dashboard-root * {
                    border-radius: 0 !important;
                }

                /* Restore border radius for buttons and interactive controls in light mode */
                html:not(.dark) .dashboard-root button,
                html:not(.dark) .dashboard-root a[role="button"],
                html:not(.dark) .dashboard-root [type="button"],
                html:not(.dark) .dashboard-root [type="submit"],
                html:not(.dark) .dashboard-root [role="button"],
                html:not(.dark) .dashboard-root input,
                html:not(.dark) .dashboard-root select,
                html:not(.dark) .dashboard-root textarea,
                html:not(.dark) .dashboard-root .rounded,
                html:not(.dark) .dashboard-root .rounded-md,
                html:not(.dark) .dashboard-root .rounded-lg,
                html:not(.dark) .dashboard-root .rounded-xl,
                html:not(.dark) .dashboard-root .rounded-2xl,
                html:not(.dark) .dashboard-root .rounded-full {
                    border-radius: 0.5rem !important;
                }
                html:not(.dark) .dashboard-root .rounded-full {
                    border-radius: 9999px !important;
                }

                /* Input and Select Visibility overrides in light mode */
                html:not(.dark) .dashboard-root input:not([type="checkbox"]):not([type="radio"]),
                html:not(.dark) .dashboard-root textarea,
                html:not(.dark) .dashboard-root select,
                html:not(.dark) .dashboard-root [data-slot="select-trigger"] {
                    color: #0b1e19 !important;
                    background-color: #ffffff !important;
                    border: 1px solid rgba(11, 30, 25, 0.2) !important;
                    caret-color: #0b1e19 !important;
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
                    color: #0b1e19 !important;
                    background-color: #ffffff !important;
                }
                html:not(.dark) [role="option"]:hover,
                html:not(.dark) [role="option"][data-highlighted],
                html:not(.dark) [data-slot="select-item"]:hover {
                    background-color: #f3f4f6 !important;
                    color: #0b1e19 !important;
                }

                /* Text white to dark overrides at page level in light mode */
                html:not(.dark) .dashboard-root .text-white {
                    color: #0b1e19 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-100 {
                    color: #0b1e19 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-200 {
                    color: #0b1e19 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-300 {
                    color: #1a2e26 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-400 {
                    color: #4b5563 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-500 {
                    color: #4b5563 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-600 {
                    color: #334155 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-700 {
                    color: #1e293b !important;
                }
                html:not(.dark) .dashboard-root .text-slate-800 {
                    color: #0b1e19 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-900 {
                    color: #0b1e19 !important;
                }
                html:not(.dark) .dashboard-root .text-slate-950 {
                    color: #0b1e19 !important;
                }

                /* Labels outside dark cards should be readable (dark green/black) */
                html:not(.dark) .dashboard-root label {
                    color: #3f5933 !important;
                    font-weight: 500 !important;
                }

                /* RESTORE colors for text and labels inside dark cards */
                html:not(.dark) .dashboard-root .bg-slate-900,
                html:not(.dark) .dashboard-root .bg-slate-950,
                html:not(.dark) .dashboard-root .bg-slate-800,
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]),
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]),
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]),
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]),
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]),
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) {
                    color: #cbd5e1 !important;
                }

                /* Restore headings inside dark cards */
                html:not(.dark) .dashboard-root .bg-slate-900 h1,
                html:not(.dark) .dashboard-root .bg-slate-900 h2,
                html:not(.dark) .dashboard-root .bg-slate-900 h3,
                html:not(.dark) .dashboard-root .bg-slate-900 h4,
                html:not(.dark) .dashboard-root .bg-slate-900 h5,
                html:not(.dark) .dashboard-root .bg-slate-900 h6,
                html:not(.dark) .dashboard-root .bg-slate-950 h1,
                html:not(.dark) .dashboard-root .bg-slate-950 h2,
                html:not(.dark) .dashboard-root .bg-slate-950 h3,
                html:not(.dark) .dashboard-root .bg-slate-950 h4,
                html:not(.dark) .dashboard-root .bg-slate-950 h5,
                html:not(.dark) .dashboard-root .bg-slate-950 h6,
                html:not(.dark) .dashboard-root .bg-slate-800 h1,
                html:not(.dark) .dashboard-root .bg-slate-800 h2,
                html:not(.dark) .dashboard-root .bg-slate-800 h3,
                html:not(.dark) .dashboard-root .bg-slate-800 h4,
                html:not(.dark) .dashboard-root .bg-slate-800 h5,
                html:not(.dark) .dashboard-root .bg-slate-800 h6,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) h1,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) h2,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) h3,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) h4,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) h5,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) h6,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) h1,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) h2,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) h3,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) h4,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) h5,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) h6,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) h1,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) h2,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) h3,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) h4,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) h5,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) h6 {
                    color: #ffffff !important;
                }

                html:not(.dark) .dashboard-root .bg-slate-900 .text-white,
                html:not(.dark) .dashboard-root .bg-slate-950 .text-white,
                html:not(.dark) .dashboard-root .bg-slate-800 .text-white,
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]) .text-white,
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]) .text-white,
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]) .text-white,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) .text-white,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) .text-white,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) .text-white {
                    color: #ffffff !important;
                }

                html:not(.dark) .dashboard-root .bg-slate-900 .text-slate-100,
                html:not(.dark) .dashboard-root .bg-slate-950 .text-slate-100,
                html:not(.dark) .dashboard-root .bg-slate-800 .text-slate-100,
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]) .text-slate-100,
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]) .text-slate-100,
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]) .text-slate-100,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) .text-slate-100,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) .text-slate-100,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) .text-slate-100 {
                    color: #f1f5f9 !important;
                }

                html:not(.dark) .dashboard-root .bg-slate-900 .text-slate-200,
                html:not(.dark) .dashboard-root .bg-slate-950 .text-slate-200,
                html:not(.dark) .dashboard-root .bg-slate-800 .text-slate-200,
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]) .text-slate-200,
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]) .text-slate-200,
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]) .text-slate-200,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) .text-slate-200,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) .text-slate-200,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) .text-slate-200 {
                    color: #e2e8f0 !important;
                }

                html:not(.dark) .dashboard-root .bg-slate-900 .text-slate-300,
                html:not(.dark) .dashboard-root .bg-slate-950 .text-slate-300,
                html:not(.dark) .dashboard-root .bg-slate-800 .text-slate-300,
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]) .text-slate-300,
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]) .text-slate-300,
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]) .text-slate-300,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) .text-slate-300,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) .text-slate-300,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) .text-slate-300 {
                    color: #cbd5e1 !important;
                }

                html:not(.dark) .dashboard-root .bg-slate-900 .text-slate-400,
                html:not(.dark) .dashboard-root .bg-slate-950 .text-slate-400,
                html:not(.dark) .dashboard-root .bg-slate-800 .text-slate-400,
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]) .text-slate-400,
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]) .text-slate-400,
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]) .text-slate-400,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) .text-slate-400,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) .text-slate-400,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) .text-slate-400 {
                    color: #94a3b8 !important;
                }

                html:not(.dark) .dashboard-root .bg-slate-900 .text-slate-500,
                html:not(.dark) .dashboard-root .bg-slate-950 .text-slate-500,
                html:not(.dark) .dashboard-root .bg-slate-800 .text-slate-500,
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]) .text-slate-500,
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]) .text-slate-500,
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]) .text-slate-500,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) .text-slate-500,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) .text-slate-500,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) .text-slate-500 {
                    color: #94a3b8 !important;
                }

                html:not(.dark) .dashboard-root .bg-slate-900 .text-\\[\\#0F2E23\\],
                html:not(.dark) .dashboard-root .bg-slate-950 .text-\\[\\#0F2E23\\],
                html:not(.dark) .dashboard-root .bg-slate-800 .text-\\[\\#0F2E23\\],
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]) .text-\\[\\#0F2E23\\],
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]) .text-\\[\\#0F2E23\\],
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]) .text-\\[\\#0F2E23\\],
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) .text-\\[\\#0F2E23\\],
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) .text-\\[\\#0F2E23\\],
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) .text-\\[\\#0F2E23\\] {
                    color: #ffffff !important;
                }

                html:not(.dark) .dashboard-root .bg-slate-900 label,
                html:not(.dark) .dashboard-root .bg-slate-950 label,
                html:not(.dark) .dashboard-root .bg-slate-800 label,
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]) label,
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]) label,
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]) label,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) label,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) label,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) label {
                    color: #cbd5e1 !important;
                }

                /* Icons and SVGs color control */
                html:not(.dark) .dashboard-root svg {
                    color: inherit;
                }

                /* White SVGs on page level (outside dark cards) -> change to dark green/black */
                html:not(.dark) .dashboard-root svg.text-white,
                html:not(.dark) .dashboard-root .text-white > svg,
                html:not(.dark) .dashboard-root .text-white svg {
                    color: #0b1e19 !important;
                }

                /* Icons inside dark cards inherit from text class */
                html:not(.dark) .dashboard-root .bg-slate-900 svg,
                html:not(.dark) .dashboard-root .bg-slate-950 svg,
                html:not(.dark) .dashboard-root .bg-slate-800 svg,
                html:not(.dark) .dashboard-root [class*="bg-slate-900/"]:not([class*="dark:bg-slate-900/"]) svg,
                html:not(.dark) .dashboard-root [class*="bg-slate-950/"]:not([class*="dark:bg-slate-950/"]) svg,
                html:not(.dark) .dashboard-root [class*="bg-slate-800/"]:not([class*="dark:bg-slate-800/"]) svg,
                html:not(.dark) .dashboard-root [class*="bg-[#0f172a]"]:not([class*="dark:bg-[#0f172a]"]) svg,
                html:not(.dark) .dashboard-root [class*="bg-[#020617]"]:not([class*="dark:bg-[#020617]"]) svg,
                html:not(.dark) .dashboard-root [class*="bg-sky-950"]:not([class*="dark:bg-sky-950"]) svg {
                    color: inherit !important;
                }

                /* Restore colored icons (sky, emerald, rose etc.) anywhere */
                html:not(.dark) .dashboard-root .text-sky-400 { color: #0ea5e9 !important; }
                html:not(.dark) .dashboard-root .text-sky-500 { color: #0284c7 !important; }
                html:not(.dark) .dashboard-root .text-emerald-400 { color: #10b981 !important; }
                html:not(.dark) .dashboard-root .text-emerald-500 { color: #059669 !important; }
                html:not(.dark) .dashboard-root .text-rose-400 { color: #f43f5e !important; }
                html:not(.dark) .dashboard-root .text-rose-500 { color: #e11d48 !important; }
                html:not(.dark) .dashboard-root .text-indigo-400 { color: #818cf8 !important; }
                html:not(.dark) .dashboard-root .text-amber-400 { color: #fbbf24 !important; }
                html:not(.dark) .dashboard-root .text-[#A2B585] { color: #a2b585 !important; }
                html:not(.dark) .dashboard-root .text-[#3F5933] { color: #3f5933 !important; }

                /* Custom light-mode color (#3D7A5C) for dashboard sidebar text, icons, and labels */
                html:not(.dark) .dashboard-root aside a:not([class*="bg-sky-500"]):not([class*="bg-emerald-500"]) {
                    color: #3D7A5C !important;
                }
                html:not(.dark) .dashboard-root aside a:not([class*="bg-sky-500"]):not([class*="bg-emerald-500"]) svg {
                    color: #3D7A5C !important;
                }
                html:not(.dark) .dashboard-root aside a:not([class*="bg-sky-500"]):not([class*="bg-emerald-500"]):hover {
                    color: #2b5641 !important; /* Slightly darker green on hover */
                    background-color: rgba(61, 122, 92, 0.08) !important;
                }
                html:not(.dark) .dashboard-root aside a:not([class*="bg-sky-500"]):not([class*="bg-emerald-500"]):hover svg {
                    color: #2b5641 !important;
                }
                html:not(.dark) .dashboard-root aside nav p {
                    color: #3D7A5C !important;
                    opacity: 0.85;
                }
                html:not(.dark) .dashboard-root aside nav p svg {
                    color: #3D7A5C !important;
                }
                html:not(.dark) .dashboard-root aside p.text-sm {
                    color: #3D7A5C !important;
                }
            `}</style>

            <div
                className="dashboard-root flex h-screen overflow-hidden text-slate-800 dark:text-slate-200 relative bg-white dark:bg-slate-950"
                style={{ backgroundImage: "var(--dash-bg)", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
            >
                {/* Light-mode overlay — keeps dashboard cards/content legible */}
                <div className="absolute inset-0 bg-white/85 dark:bg-transparent pointer-events-none z-0" />

                <BitcoinBackground />

                {/* Mobile Overlay */}
                {isMobileOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}

                <Sidebar isMobileOpen={isMobileOpen} closeMobile={() => setIsMobileOpen(false)} />

                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    <Topbar onMenuClick={() => setIsMobileOpen(true)} />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-transparent relative z-10">
                        <div className="max-w-7xl mx-auto space-y-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
