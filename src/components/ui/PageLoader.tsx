"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageLoader() {
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const completeRef = useRef<NodeJS.Timeout | null>(null);
    const hideRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear any pending timers from previous navigation
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (completeRef.current) clearTimeout(completeRef.current);
        if (hideRef.current) clearTimeout(hideRef.current);

        // Start fresh
        setProgress(0);
        setVisible(true);

        // Simulate incremental progress up to 85%
        let current = 0;
        intervalRef.current = setInterval(() => {
            current += Math.random() * 12 + 5;
            if (current > 85) {
                current = 85;
                clearInterval(intervalRef.current!);
            }
            setProgress(current);
        }, 120);

        // Complete the bar after a short delay (simulates page load finishing)
        completeRef.current = setTimeout(() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setProgress(100);

            // Hide after the fill animation finishes
            hideRef.current = setTimeout(() => {
                setVisible(false);
                setProgress(0);
            }, 400);
        }, 500);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (completeRef.current) clearTimeout(completeRef.current);
            if (hideRef.current) clearTimeout(hideRef.current);
        };
    }, [pathname]);

    if (!visible) return null;

    return (
        <>
            {/* Top progress bar */}
            <div className="fixed top-0 left-0 right-0 z-[99999] h-[3px] bg-transparent pointer-events-none">
                <div
                    className="h-full relative overflow-hidden"
                    style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #0F2E23, #A2B585, #0F2E23)",
                        backgroundSize: "200% 100%",
                        transition: progress === 100 ? "width 0.3s ease-out" : "width 0.12s ease-out",
                        animation: "shimmerBar 1.2s linear infinite",
                    }}
                >
                    {/* Glow tip */}
                    <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-4 rounded-full blur-md"
                        style={{ backgroundColor: "#A2B585", opacity: 0.9 }}
                    />
                </div>
            </div>

            {/* Full-page dim overlay */}
            <div
                className="fixed inset-0 z-[99990] pointer-events-none"
                style={{
                    backgroundColor: "rgba(0,0,0,0.04)",
                    transition: "opacity 0.2s ease",
                    opacity: progress < 100 ? 1 : 0,
                }}
            />

            <style>{`
                @keyframes shimmerBar {
                    0%   { background-position: 200% center; }
                    100% { background-position: -200% center; }
                }
            `}</style>
        </>
    );
}
