"use client";

import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { STOCKS, initTick, nextTick, type Tick, type Stock } from "@/lib/market-engine";
import { useTrade } from "@/lib/trade-store";
import { getMissionById, type TradeMission } from "@/lib/trade-missions";
import MarketTicker from "@/components/trade/MarketTicker";
import TradePanel from "@/components/trade/TradePanel";
import PortfolioPanel from "@/components/trade/PortfolioPanel";
import MiniChart from "@/components/trade/MiniChart";
import MissionGuidePanel from "@/components/trade/MissionGuidePanel";

export default function TradePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm" style={{ color: "var(--color-text-muted)" }}>加载中...</div>}>
      <TradeContent />
    </Suspense>
  );
}

function TradeContent() {
  const searchParams = useSearchParams();
  const missionId = searchParams.get("mission");
  const mission: TradeMission | undefined = missionId ? getMissionById(missionId) : undefined;

  const [ticks, setTicks] = useState<Record<string, Tick>>({});
  const [selected, setSelected] = useState<Stock>(STOCKS[0]);
  const [priceHistory, setPriceHistory] = useState<Record<string, number[]>>({});
  const [missionDone, setMissionDone] = useState(false);
  const tickRef = useRef(ticks);
  tickRef.current = ticks;

  const trade = useTrade();

  // 如果任务指定了标的，自动选中
  useEffect(() => {
    if (mission?.targetSymbol) {
      const stock = STOCKS.find((s) => s.symbol === mission.targetSymbol);
      if (stock) setSelected(stock);
    }
  }, [mission]);

  // 初始化行情
  useEffect(() => {
    const initial: Record<string, Tick> = {};
    const hist: Record<string, number[]> = {};
    for (const s of STOCKS) {
      initial[s.symbol] = initTick(s);
      hist[s.symbol] = [initial[s.symbol].price];
    }
    setTicks(initial);
    setPriceHistory(hist);
  }, []);

  // 每秒更新行情
  useEffect(() => {
    const timer = setInterval(() => {
      setTicks((prev) => {
        const next: Record<string, Tick> = {};
        for (const s of STOCKS) {
          const prevTick = prev[s.symbol];
          if (!prevTick) continue;
          next[s.symbol] = nextTick(s, prevTick);
        }
        return next;
      });
      setPriceHistory((prev) => {
        const next = { ...prev };
        for (const s of STOCKS) {
          const t = tickRef.current[s.symbol];
          if (!t) continue;
          const arr = [...(prev[s.symbol] || []), t.price];
          next[s.symbol] = arr.slice(-60);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 成就检测
  const checkAchievements = useCallback(() => {
    const prices: Record<string, number> = {};
    for (const s of STOCKS) {
      prices[s.symbol] = ticks[s.symbol]?.price || 0;
    }
    if (trade.history.length >= 1) trade.unlockAchievement("first-trade");
    if (trade.history.length >= 10) trade.unlockAchievement("ten-trades");
    if (trade.positions.length >= 5) trade.unlockAchievement("five-stocks");
    if (trade.getTotalAssets(prices) >= 110000) trade.unlockAchievement("portfolio-up");
  }, [ticks, trade]);

  useEffect(() => {
    checkAchievements();
  }, [trade.history.length, trade.positions.length, checkAchievements]);

  // 任务完成检测
  useEffect(() => {
    if (!mission || trade.isMissionCompleted(mission.id) || missionDone) return;

    let done = false;
    if (mission.type === "buy") {
      if (mission.targetSymbol) {
        done = !!trade.getPosition(mission.targetSymbol);
      } else {
        done = trade.history.some((r) => r.side === "buy");
      }
    } else if (mission.type === "sell") {
      done = trade.history.some((r) => r.side === "sell");
    } else if (mission.type === "portfolio") {
      done = trade.positions.length >= (mission.targetValue || 2);
    } else if (mission.type === "profit") {
      const prices: Record<string, number> = {};
      for (const s of STOCKS) prices[s.symbol] = ticks[s.symbol]?.price || 0;
      done = trade.getTotalAssets(prices) > trade.initialCash;
    }

    if (done) {
      trade.completeMission(mission.id, mission.xp);
      setMissionDone(true);
    }
  }, [mission, trade, ticks, missionDone]);

  // 当前价格 map
  const prices: Record<string, number> = {};
  for (const s of STOCKS) {
    prices[s.symbol] = ticks[s.symbol]?.price || 0;
  }

  const totalAssets = trade.getTotalAssets(prices);
  const totalPnL = trade.getTotalPnL(prices);
  const pnlPercent = trade.initialCash === 0 ? 0 : Math.round((totalPnL / trade.initialCash) * 10000) / 100;

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Header */}
      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[1400px] flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">模拟交易</h1>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              虚拟资金，真实体验
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>总资产</p>
              <p className="text-lg font-bold tabular-nums">&yen;{totalAssets.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>总盈亏</p>
              <p className={`text-lg font-bold tabular-nums ${totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
                {totalPnL >= 0 ? "+" : ""}{totalPnL.toLocaleString()}
                <span className="text-xs ml-1 font-medium">({pnlPercent}%)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left(Chart+Trade) + Right(StockList+Portfolio) */}
      <div className="mx-auto max-w-[1400px] px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          {/* Left: Mission + Chart + Trade */}
          <div className="space-y-4">
            {mission && (
              <MissionGuidePanel mission={mission} done={missionDone || trade.isMissionCompleted(mission.id)} />
            )}

            {/* Chart + Stock Traits */}
            <div className="card-base">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold">{selected.name}</h2>
                  <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {selected.symbol} &middot; {selected.category}
                  </span>
                </div>
                {ticks[selected.symbol] && (
                  <div className="text-right">
                    <p className="text-2xl font-bold tabular-nums">
                      &yen;{ticks[selected.symbol].price.toLocaleString()}
                    </p>
                    <p className={`text-sm font-medium ${ticks[selected.symbol].changePercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {ticks[selected.symbol].changePercent >= 0 ? "+" : ""}
                      {ticks[selected.symbol].changePercent}%
                    </p>
                  </div>
                )}
              </div>
              <MiniChart
                data={priceHistory[selected.symbol] || []}
                color={ticks[selected.symbol]?.changePercent >= 0 ? "#22c55e" : "#ef4444"}
                height={200}
              />
              {/* Stock Traits */}
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                <div className="flex flex-wrap gap-2 items-center">
                  {selected.traits.style && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "var(--color-gray-100)", color: "var(--color-text-secondary)" }}>
                      {selected.traits.style}
                    </span>
                  )}
                  {selected.traits.roe && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: "#22c55e15", color: "#22c55e" }}>
                      ROE {selected.traits.roe}
                    </span>
                  )}
                  {selected.traits.pe && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: "#3b82f615", color: "#3b82f6" }}>
                      PE {selected.traits.pe}
                    </span>
                  )}
                  {selected.traits.risk && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: selected.traits.risk === "极高" || selected.traits.risk === "高" ? "#ef444415" : "#f9731615", color: selected.traits.risk === "极高" || selected.traits.risk === "高" ? "#ef4444" : "#f97316" }}>
                      风险{selected.traits.risk}
                    </span>
                  )}
                </div>
                {selected.traits.tip && (
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {selected.traits.tip}
                  </p>
                )}
              </div>
            </div>

            <TradePanel stock={selected} tick={ticks[selected.symbol]} mission={mission} missionDone={missionDone} />
          </div>

          {/* Right Sidebar: Stock List + Portfolio */}
          <div className="space-y-4">
            {/* Stock List */}
            <div className="card-base">
              <h3 className="text-sm font-semibold mb-3">自选行情</h3>
              <MarketTicker ticks={ticks} selected={selected} onSelect={setSelected} />
            </div>

            <PortfolioPanel ticks={ticks} />
          </div>
        </div>
      </div>
    </div>
  );
}