"use client";

import Link from "next/link";
import { STOCKS, type Tick } from "@/lib/market-engine";
import { useTrade } from "@/lib/trade-store";
import { TRADE_MISSIONS } from "@/lib/trade-missions";
import { useHydrated } from "@/lib/useHydrated";

interface Props {
  ticks: Record<string, Tick>;
}

export default function PortfolioPanel({ ticks }: Props) {
  const trade = useTrade();
  const hydrated = useHydrated();

  const prices: Record<string, number> = {};
  for (const s of STOCKS) {
    prices[s.symbol] = ticks[s.symbol]?.price || 0;
  }

  const positions = hydrated ? trade.positions : [];
  const completedMissions = hydrated ? trade.completedMissions : [];

  return (
    <div className="space-y-4">
      {/* 持仓列表 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold">持仓</h3>
          <span className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
            {positions.length} 只
          </span>
        </div>

        {positions.length === 0 ? (
          <div className="text-center py-8 rounded-xl" style={{ background: "var(--color-gray-50)" }}>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              暂无持仓
            </p>
            <p className="text-[10px] mt-1" style={{ color: "var(--color-text-muted)" }}>
              从左侧选择标的开始交易
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {positions.map((pos) => {
              const stock = STOCKS.find((s) => s.symbol === pos.symbol);
              const currentPrice = prices[pos.symbol] || pos.avgCost;
              const marketValue = Math.round(currentPrice * pos.quantity * 100) / 100;
              const pnl = Math.round((currentPrice - pos.avgCost) * pos.quantity * 100) / 100;
              const pnlPct = pos.avgCost === 0 ? 0 :
                Math.round(((currentPrice - pos.avgCost) / pos.avgCost) * 10000) / 100;

              return (
                <div key={pos.symbol} className="rounded-lg p-2.5" style={{ background: "var(--color-gray-50)" }}>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{stock?.name || pos.symbol}</p>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                        {pos.quantity}股 · 成本 {pos.avgCost.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xs font-bold tabular-nums">
                        {marketValue.toLocaleString()}
                      </p>
                      <p className={`text-[10px] font-medium tabular-nums ${pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {pnl >= 0 ? "+" : ""}{pnl.toLocaleString()} ({pnlPct}%)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 任务进度 */}
      {completedMissions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-xs font-semibold">实战任务</h3>
            <span className="text-[10px] font-medium" style={{ color: "#f97316" }}>
              {completedMissions.length}/{TRADE_MISSIONS.length} · {trade.totalXp} XP
            </span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((completedMissions.length / TRADE_MISSIONS.length) * 100)}%`, background: "#f97316" }} />
          </div>
        </div>
      )}

      {/* 操作 */}
      <div className="flex gap-2">
        <Link href="/trade/history"
          className="flex-1 text-center text-[11px] font-medium py-2 rounded-lg transition-colors"
          style={{ background: "var(--color-gray-50)", color: "var(--color-text-secondary)" }}>
          交易记录
        </Link>
        <button
          onClick={() => { if (confirm("确定重置？所有持仓和记录将清空")) trade.resetAccount(); }}
          className="text-[11px] py-2 px-3 rounded-lg transition-colors"
          style={{ color: "var(--color-text-muted)" }}>
          重置
        </button>
      </div>
    </div>
  );
}