"use client";

import { useEffect, useRef } from "react";

export function TradingViewTickerWidget() {
    const tickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!tickerRef.current) return;

        const scriptId = "tradingview-ticker-script";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://widgets.tradingview-widget.com/w/en/tv-ticker-tape.js";
            script.type = "module";
            script.async = true;
            document.head.appendChild(script);
        }

        tickerRef.current.innerHTML = "";

        // @ts-ignore
        const ticker = document.createElement("tv-ticker-tape");
        ticker.setAttribute("symbols", "FOREXCOM:SPXUSD,FOREXCOM:NSXUSD,FOREXCOM:DJI,FX:EURUSD,BITSTAMP:BTCUSD,BITSTAMP:ETHUSD,CMCMARKETS:GOLD,NASDAQ:NVDA,FX:USDJPY,FOREXCOM:XAUUSD,NASDAQ:TSLA,NASDAQ:SPCX,NASDAQ:AAPL");
        ticker.setAttribute("transparent", "true");
        ticker.setAttribute("show-hover", "true");
        ticker.style.height = "40px";

        tickerRef.current.appendChild(ticker);
    }, []);

    return (
        <div className="w-full relative z-20">
            <div ref={tickerRef} className="rounded-xl overflow-hidden h-[40px] flex items-center bg-transparent border border-slate-200 dark:border-slate-800/50" />
        </div>
    );
}
