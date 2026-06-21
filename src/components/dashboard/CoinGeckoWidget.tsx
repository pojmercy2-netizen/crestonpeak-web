"use client";

import { useEffect, useRef } from "react";

export function CoinGeckoWidget() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scriptId = "coingecko-widget-script";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://widgets.coingecko.com/gecko-coin-list-widget.js";
            script.async = true;
            document.head.appendChild(script);
        }

        containerRef.current.innerHTML = "";

        // @ts-ignore
        const widget = document.createElement("gecko-coin-list-widget");
        widget.setAttribute("locale", "en");
        widget.setAttribute("transparent-background", "true");
        widget.setAttribute("coin-ids", "avalanche-2,uniswap,hyperliquid,backpack,floki,near,ondo-finance,plasma,bittensor,collector-crypt,siren-2,ripple,safemoon-2,binancecoin,ethereum,solana,bitcoin");
        widget.setAttribute("initial-currency", "usd");

        containerRef.current.appendChild(widget);
    }, []);

    return (
        <div className="w-full relative z-20">
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-none ring-0 dark:ring-1 dark:ring-slate-800 shadow-md dark:shadow-xl rounded-xl overflow-hidden p-4 md:p-6">
                <div ref={containerRef} className="min-h-[300px] w-full" />
            </div>
        </div>
    );
}
