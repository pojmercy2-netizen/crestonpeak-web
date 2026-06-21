"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function WhatsAppWidget() {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    const [whatsappNumber, setWhatsappNumber] = useState("+12173350197");

    useEffect(() => {
        // Don't show on admin pages
        if (pathname?.startsWith("/admin")) {
            setIsVisible(false);
            return;
        }
        setIsVisible(true);

        // Fetch dynamic whatsapp number
        import("@/lib/apiClient").then(({ default: apiClient }) => {
            apiClient.getWhatsappNumber().then(res => {
                if (res?.value) {
                    setWhatsappNumber(res.value);
                }
            }).catch(e => console.error("Failed to fetch whatsapp number", e));
        });
    }, [pathname]);

    if (!isVisible) return null;

    const cleanedNumber = whatsappNumber.replace(/\D/g, "");

    return (
        <a
            href={`https://wa.me/${cleanedNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 left-8 z-[999] transition-all duration-300 ease-out hover:scale-125 group"
            aria-label="Contact us on WhatsApp"
        >
            <div className="relative w-16 h-16">
                {/* Animated background circles */}
                <div className="absolute inset-0 bg-[#25D366] rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.35)] group-hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] transition-shadow duration-300"></div>
                
                {/* Animated pulse ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 group-hover:opacity-100 animate-pulse"></div>
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/whatsapp-icon.svg"
                        alt="WhatsApp"
                        width={40}
                        height={40}
                        priority
                        className="drop-shadow-lg"
                    />
                </div>
                
                {/* Online indicator */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366] border border-white"></span>
                </span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-10">
                Chat with us on WhatsApp
                <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-white rotate-45"></div>
            </div>
        </a>
    );
}
