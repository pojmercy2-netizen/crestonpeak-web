"use client";

import { Bitcoin } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export function BitcoinBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const iconsData = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => {
            const size = Math.random() * 30 + 15; // 15px to 45px (reduced size)
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 20 + 20; // 20s to 40s
            const delay = Math.random() * -40; // Negative delay so they start animated
            return { i, size, left, top, duration, delay };
        });
    }, []);

    if (!mounted) return null;

    const icons = iconsData.map(({ i, size, left, top, duration, delay }) => {
        return (
            <div
                key={i}
                className="absolute text-amber-500/20 pointer-events-none"
                style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animation: `float-btc ${duration}s ease-in-out ${delay}s infinite alternate`,
                    width: size,
                    height: size,
                }}
            >
                <div style={{ animation: `spin-btc ${duration * 1.5}s linear infinite`, width: '100%', height: '100%' }}>
                    <Bitcoin size={size} className="w-full h-full drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
                </div>
            </div>
        );
    });

    return (
        <div className="hidden md:block fixed inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen">
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float-btc {
                    0% { transform: translateY(0) scale(0.8); opacity: 0.1; }
                    50% { transform: translateY(-150px) scale(1.1); opacity: 0.3; }
                    100% { transform: translateY(50px) scale(0.9); opacity: 0.1; }
                }
                @keyframes spin-btc {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
            
            <div className="absolute inset-0 z-0">
                {icons}
            </div>
        </div>
    );
}
