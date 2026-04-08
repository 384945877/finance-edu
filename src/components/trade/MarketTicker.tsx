"use client";

import { CATEGORIES, getStocksByCategory, type Tick, type Stock } from "@/lib/market-engine";

interface Props {
  ticks: Record<string, Tick>;
  selected: Stock;
  onSelect: (s: Stock) => void;
}

export default function MarketTicker({ ticks, selected, onSelect }: Props) {
  const grouped = getStocksByCategory();

  return (
    <div className="border-b overflow-x-auto" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-[1400px] flex items-stretch">
        {CATEGORIES.map((cat) => {
          const stocks = grouped[cat.key];
          if (!stocks.length) return null;
          return (
            <div key={cat.key} className="flex items-stretch">
              {/* 分类标签 */}
              <div className="flex items-center px-3 shrink-0" style={{ background: "var(--color-gray-50)" }}>
                <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: "var(--color-text-muted)", writingMode: "horizontal-tb" }}>
                  {cat.label}
                </span>
              </div>
              {/* 该分类下的标的 */}
              {stocks.map((stock) => {
                const tick = ticks[stock.symbol];
                const isSelected = selected.symbol === stock.symbol;
                const up = tick ? tick.changePercent >= 0 : true;

                return (
                  <button
                    key={stock.symbol}
                    onClick={() => onSelect(stock)}
                    className="flex-shrink-0 px-3 py-2 text-left transition-colors relative"
                    style={{
                      background: isSelected ? "var(--color-gray-50)" : "transparent",
                      minWidth: 120,
                    }}
                  >
                    {isSelected && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: "var(--color-brand)" }} />
                    )}
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold truncate">{stock.name}</span>
                    </div>
                    <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{stock.symbol}</p>
                    {tick ? (
                      <>
                        <p className="text-sm font-bold tabular-nums mt-0.5">
                          {tick.price.toLocaleString()}
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
          );
        })}
      </div>
    </div>
  );
}