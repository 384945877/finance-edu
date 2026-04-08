"use client";

import { CATEGORIES, getStocksByCategory, type Tick, type Stock } from "@/lib/market-engine";

interface Props {
  ticks: Record<string, Tick>;
  selected: Stock;
  onSelect: (s: Stock) => void;
}

/** 竖向标的列表，按分类分组 */
export default function MarketTicker({ ticks, selected, onSelect }: Props) {
  const grouped = getStocksByCategory();

  return (
    <div className="space-y-3">
      {CATEGORIES.map((cat) => {
        const stocks = grouped[cat.key];
        if (!stocks.length) return null;
        return (
          <div key={cat.key}>
            <p className="text-[10px] font-bold mb-1.5 px-1" style={{ color: "var(--color-text-muted)" }}>
              {cat.label}
            </p>
            <div className="space-y-1">
              {stocks.map((stock) => {
                const tick = ticks[stock.symbol];
                const isSelected = selected.symbol === stock.symbol;
                const up = tick ? tick.changePercent >= 0 : true;

                return (
                  <button
                    key={stock.symbol}
                    onClick={() => onSelect(stock)}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition-colors"
                    style={{
                      background: isSelected ? "var(--color-gray-100)" : "transparent",
                      border: isSelected ? "1px solid var(--border-medium)" : "1px solid transparent",
                    }}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{stock.name}</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                        {stock.symbol}
                      </p>
                    </div>
                    {tick ? (
                      <div className="text-right shrink-0 ml-2">
                        <p className="text-xs font-bold tabular-nums">
                          {tick.price.toLocaleString()}
                        </p>
                        <p className={`text-[10px] font-medium tabular-nums ${up ? "text-green-500" : "text-red-500"}`}>
                          {up ? "+" : ""}{tick.changePercent}%
                        </p>
                      </div>
                    ) : (
                      <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                        --
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}