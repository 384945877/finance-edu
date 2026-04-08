"use client";

import Link from "next/link";
import { STOCKS, type Tick } from "@/lib/market-engine";
import { useTrade, ACHIEVEMENTS } from "@/lib/trade-store";
import { TRADE_MISSIONS } from "@/lib/trade-missions";

interface Props {
  ticks: Record<string, Tick>;
}

export default function PortfolioPanel({ ticks }: Props) {
  const trade = useTrade();

  const prices: Record<string, number> = {};
  for (const s of STOCKS) {
    prices[s.symbol] = ticks[s.symbol]?.price || 0;
  }

  const totalAssets = trade.getTotalAssets(prices);
  const totalPnL = trade.getTotalPnL(prices);

  return (
    <div className="space-y-4">
      {/* Account Summary */}
      <div className="card-base">
        <h3 className="text-sm font-semibold mb-3">账户概览</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--color-text-muted)" }}>可用资金</span>
            <span className="font-medium tabular-nums">&yen;{trade.cash.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: "var(--color-text-muted)" }}>持仓市值</span>
            <span className="font-medium tabular-nums">
              &yen;{Math.round(totalAssets - trade.cash).toLocaleString()}
            </span>
          </div>
          <div className="border-t pt-2 mt-2" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--color-text-muted)" }}>总资产</span>
              <span className="font-bold tabular-nums">&yen;{totalAssets.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span style={{ color: "var(--color-text-muted)" }}>总盈亏</span>
              <span className={`font-bold tabular-nums ${totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
                {totalPnL >= 0 ? "+" : ""}&yen;{totalPnL.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Positions */}
      <div className="card-base">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">持仓</h3>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            {trade.positions.length} 只
          </span>
        </div>

        {trade.positions.length === 0 ? (
          <p className="text-sm text-center py-6" style={{ color: "var(--color-text-muted)" }}>
            暂无持仓，快去交易吧
          </p>
        ) : (
          <div className="space-y-2">
            {trade.positions.map((pos) => {
              const stock = STOCKS.find((s) => s.symbol === pos.symbol);
              const currentPrice = prices[pos.symbol] || pos.avgCost;
              const marketValue = Math.round(currentPrice * pos.quantity * 100) / 100;
              const pnl = Math.round((currentPrice - pos.avgCost) * pos.quantity * 100) / 100;
              const pnlPct = pos.avgCost === 0 ? 0 :
                Math.round(((currentPrice - pos.avgCost) / pos.avgCost) * 10000) / 100;

              return (
                <div key={pos.symbol} className="rounded-xl p-3 transition-colors"
                  style={{ background: "var(--color-gray-50)" }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="text-sm font-semibold">{stock?.name || pos.symbol}</p>
                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                          {pos.quantity}股 &middot; 成本 &yen;{pos.avgCost.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold tabular-nums">
                        &yen;{marketValue.toLocaleString()}
                      </p>
                      <p className={`text-xs font-medium tabular-nums ${pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
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

      {/* Missions Progress */}
      <div className="card-base">
        <h3 className="text-sm font-semibold mb-3">
          实战任务 <span className="text-xs font-normal" style={{ color: "var(--color-text-muted)" }}>
            {trade.completedMissions.length}/{TRADE_MISSIONS.length}
          </span>
        </h3>
        <div className="mb-2">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round((trade.completedMissions.length / TRADE_MISSIONS.length) * 100)}%`, background: "#f97316" }} />
          </div>
        </div>
        <div className="flex justify-between text-xs">
          <span style={{ color: "var(--color-text-muted)" }}>来自进阶课程</span>
          <span className="font-medium" style={{ color: "#f97316" }}>{trade.totalXp} XP</span>
        </div>
      </div>

      {/* Achievements */}
      <div className="card-base">
        <h3 className="text-sm font-semibold mb-3">
          成就 <span className="text-xs font-normal" style={{ color: "var(--color-text-muted)" }}>
            {trade.achievements.length}/{ACHIEVEMENTS.length}
          </span>
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = trade.achievements.includes(a.id);
            return (
              <div key={a.id} className="text-center py-2" title={unlocked ? `${a.title}: ${a.desc}` : "???"}>
                <span className={`text-xl ${unlocked ? "" : "grayscale opacity-30"}`}>
                  {a.emoji}
                </span>
                <p className="text-[10px] mt-0.5 truncate"
                  style={{ color: unlocked ? "var(--color-text)" : "var(--color-text-muted)" }}>
                  {unlocked ? a.title : "???"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Link */}
      <Link href="/trade/history"
        className="block text-center text-sm font-medium py-2.5 rounded-xl transition-colors"
        style={{
          background: "var(--color-gray-50)",
          border: "1px solid var(--border-subtle)",
          color: "var(--color-text-secondary)",
        }}>
        查看交易记录 &rarr;
      </Link>

      {/* Reset */}
      <button
        onClick={() => { if (confirm("确定重置账户？所有持仓和记录将清空")) trade.resetAccount(); }}
        className="block w-full text-center text-xs py-2 transition-colors"
        style={{ color: "var(--color-text-muted)" }}>
        重置模拟账户
      </button>
    </div>
  );
}