"use client";

import { useTheme } from "next-themes";
import React, { memo } from "react";

export function TradingViewTicker() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const config = {
    symbols: [
      { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
      { proName: "FOREXCOM:NSXUSD", title: "Nasdaq 100" },
      { proName: "FOREXCOM:DJI", title: "Dow 30" },
      { proName: "FX:EURUSD", title: "EUR/USD" },
      { proName: "BITSTAMP:BTCUSD", title: "BTC/USD" },
      { proName: "BITSTAMP:ETHUSD", title: "ETH/USD" },
      { proName: "CMCMARKETS:GOLD", title: "Gold" },
      { proName: "NASDAQ:TSLA", title: "Tesla" },
      { proName: "NASDAQ:META", title: "Meta" },
      { proName: "NASDAQ:NFLX", title: "Netflix" }
    ],
    showSymbolLogo: true,
    isTransparent: true,
    displayMode: "adaptive",
    colorTheme: isDark ? "dark" : "light",
    locale: "en"
  };

  const src = `https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#${encodeURIComponent(JSON.stringify(config))}`;

  return (
    <div className="w-full mt-1 mb-4 relative z-20">
      <div className="rounded-xl overflow-hidden shadow-sm h-[72px] max-h-[72px] flex items-center bg-transparent border border-slate-800/50">
        <iframe
          key={resolvedTheme}
          src={src}
          style={{ width: "100%", height: "72px", border: "none" }}
          scrolling="no"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default memo(TradingViewTicker);
