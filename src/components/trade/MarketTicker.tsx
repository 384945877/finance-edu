"use client";

import { CATEGORIES, getStocksByCategory, type Tick, type Stock } from "@/lib/market-engine";

interface Props {
  ticks: Record<string, Tick>;
  selected: Stock;
  onSelect: (s: Stock) => void;
}

/** 左侧竖向标的列表 */
export default function MarketTicker({ ticks, selected, onSelect }: Props) {
  const grouped = getStocksByCategory();

  return (
    <div className="h-full overflow-y-auto space-y-2 pr-1">
      {CATEGORIES.map((cat) => {
        const stocks = grouped[cat.key];
        if (!stocks.length) return null;
        return (
          <div key={cat.key}>
            <p className="text-[10px] font-bold mb-1 px-2 sticky top-0 py-1"
              style={{ color: "var(--color-text-muted)", background: "var(--color-bg)" }}>
              {cat.label}
            </p>
            {stocks.map((stock) => {
              const tick = ticks[stock.symbol];
              const isSelected = selected.symbol === stock.symbol;
              const up = tick ? tick.changePercent >= 0 : true;

              return (
                <button
                  key={stock.symbol}
                  onClick={() => onSelect(stock)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors"
                  style={{
                    background: isSelected ? "var(--color-brand)" : "transparent",
                    color: isSelected ? "#fff" : undefined,
                  }}
                >
                  <div className="min-w-0 mr-1">
                    <p className={`text-xs font-medium truncate ${isSelected ? "text-white" : ""}`}>
                      {stock.name}
                    </p>
                    <p className="text-[10px]" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : "var(--color-text-muted)" }}>
                      {stock.symbol}
                    </p>
                  </div>
                  {tick && (
                    <div className="text-right shrink-0">
                      <p className={`text-[11px] font-bold tabular-nums ${isSelected ? "text-white" : ""}`}>
                        {tick.price.toLocaleString()}
                      </p>
                      <p className={`text-[10px] tabular-nums font-medium ${
                        isSelected ? "text-white/80" : up ? "text-green-500" : "text-red-500"
                      }`}>
                        {up ? "+" : ""}{tick.changePercent}%
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}