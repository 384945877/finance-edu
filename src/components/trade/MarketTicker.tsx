"use client";

import { STOCKS, type Tick, type Stock } from "@/lib/market-engine";

interface Props {
  ticks: Record<string, Tick>;
  selected: Stock;
  onSelect: (s: Stock) => void;
}

export default function MarketTicker({ ticks, selected, onSelect }: Props) {
  return (
    <div className="border-b overflow-x-auto" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-[1400px] flex">
        {STOCKS.map((stock) => {
          const tick = ticks[stock.symbol];
          const isSelected = selected.symbol === stock.symbol;
          const up = tick ? tick.changePercent >= 0 : true;

          return (
            <button
              key={stock.symbol}
              onClick={() => onSelect(stock)}
              className="flex-shrink-0 px-4 py-2.5 text-left transition-colors relative"
              style={{
                background: isSelected ? "var(--color-gray-50)" : "transparent",
                minWidth: 140,
              }}
            >
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "var(--color-brand)" }} />
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{stock.emoji}</span>
                <span className="text-xs font-semibold">{stock.symbol}</span>
              </div>
              {tick ? (
                <>
                  <p className="text-sm font-bold tabular-nums mt-0.5">
                    &yen;{tick.price.toLocaleString()}
                  </p>
                  <p className={`text-xs font-medium tabular-nums ${up ? "text-green-500" : "text-red-500"}`}>
                    {up ? "+" : ""}{tick.changePercent}%
                  </p>
                </>
              ) : (
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                  加载中...
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}