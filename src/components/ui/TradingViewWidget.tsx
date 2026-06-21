"use client";

import React, { memo } from 'react';
import { useTheme } from 'next-themes';

function TradingViewWidget({ symbol }: { symbol: string }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const config = {
    autosize: true,
    symbol: symbol,
    interval: "D",
    timezone: "Etc/UTC",
    theme: isDark ? "dark" : "light",
    style: "1",
    locale: "en",
    enable_publishing: false,
    backgroundColor: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(255, 255, 255, 0.5)",
    gridColor: isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(226, 232, 240, 0.5)",
    hide_top_toolbar: false,
    hide_legend: false,
    save_image: false,
    hide_volume: true,
    support_host: "https://www.tradingview.com"
  };

  const src = `https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#${encodeURIComponent(JSON.stringify(config))}`;

  return (
    <div className="tradingview-widget-container" style={{ height: "100%", width: "100%", position: "absolute", inset: 0 }}>
      <iframe
        key={resolvedTheme}
        src={src}
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default memo(TradingViewWidget);
