"use client";

import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { STOCKS, initTick, nextTick, type Tick, type Stock } from "@/lib/market-engine";
import { useTrade } from "@/lib/trade-store";
import { getMissionById, type TradeMission } from "@/lib/trade-missions";
import MarketTicker from "@/components/trade/MarketTicker";
import TradePanel from "@/components/trade/TradePanel";
import PortfolioPanel from "@/components/trade/PortfolioPanel";
import MiniChart from "@/components/trade/MiniChart";
import MissionGuidePanel from "@/components/trade/MissionGuidePanel";
import StrategySignalBar from "@/components/trade/StrategySignalBar";
import { type StrategyId } from "@/lib/quant-strategies";
import { useHydrated } from "@/lib/useHydrated";

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
  const strategyParam = searchParams.get("strategy") as StrategyId | null;

  const [ticks, setTicks] = useState<Record<string, Tick>>({});
  const [selected, setSelected] = useState<Stock>(STOCKS[0]);
  const [priceHistory, setPriceHistory] = useState<Record<string, number[]>>({});
  const [missionDone, setMissionDone] = useState(false);
  const [activeStrategy, setActiveStrategy] = useState<StrategyId | null>(strategyParam);
  const tickRef = useRef(ticks);
  tickRef.current = ticks;

  const trade = useTrade();
  const hydrated = useHydrated();

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

  const totalAssets = hydrated ? trade.getTotalAssets(prices) : 100000;
  const totalPnL = hydrated ? trade.getTotalPnL(prices) : 0;
  const pnlPercent = trade.initialCash === 0 ? 0 : Math.round((totalPnL / trade.initialCash) * 10000) / 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-bg)" }}>
      {/* Header */}
      <div className="border-b px-4 py-2.5 shrink-0" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[1400px] flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold">模拟交易</h1>
            <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
              虚拟资金，真实体验
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>总资产</p>
              <p className="text-sm font-bold tabular-nums">&yen;{totalAssets.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>盈亏</p>
              <p className={`text-sm font-bold tabular-nums ${totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
                {totalPnL >= 0 ? "+" : ""}{totalPnL.toLocaleString()}
                <span className="text-[10px] ml-0.5">({pnlPercent}%)</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>可用</p>
              <p className="text-sm font-bold tabular-nums">&yen;{trade.cash.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 三栏主体 */}
      <div className="flex-1 mx-auto w-full max-w-[1400px] flex" style={{ minHeight: 0 }}>
        {/* 左栏：自选行情 */}
        <div className="hidden lg:block shrink-0 border-r py-3 px-2" style={{ width: 210, borderColor: "var(--border-subtle)" }}>
          <MarketTicker ticks={ticks} selected={selected} onSelect={setSelected} />
        </div>

        {/* 中栏：图表 + 交易面板 */}
        <div className="flex-1 min-w-0 overflow-y-auto py-4 px-4">
          {/* 任务引导 */}
          {mission && (
            <div className="mb-4">
              <MissionGuidePanel mission={mission} done={missionDone || trade.isMissionCompleted(mission.id)} />
            </div>
          )}

          {/* 标的信息 + 图表 */}
          <div className="card-base mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold">{selected.name}</h2>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--color-gray-100)", color: "var(--color-text-muted)" }}>
                    {selected.category}
                  </span>
                </div>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{selected.symbol}</span>
              </div>
              {ticks[selected.symbol] && (
                <div className="text-right">
                  <p className="text-2xl font-bold tabular-nums">
                    {ticks[selected.symbol].price.toLocaleString()}
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
              height={180}
            />
            {/* 投资特征 */}
            <div className="mt-2 pt-2 border-t flex flex-wrap items-center gap-1.5" style={{ borderColor: "var(--border-subtle)" }}>
              {selected.traits.style && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{ background: "var(--color-gray-100)", color: "var(--color-text-secondary)" }}>
                  {selected.traits.style}
                </span>
              )}
              {selected.traits.roe && (
                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#22c55e15", color: "#22c55e" }}>
                  ROE {selected.traits.roe}
                </span>
              )}
              {selected.traits.pe && (
                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#3b82f615", color: "#3b82f6" }}>
                  PE {selected.traits.pe}
                </span>
              )}
              {selected.traits.risk && (
                <span className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{ background: selected.traits.risk === "极高" || selected.traits.risk === "高" ? "#ef444415" : "#f9731615", color: selected.traits.risk === "极高" || selected.traits.risk === "高" ? "#ef4444" : "#f97316" }}>
                  {selected.traits.risk}风险
                </span>
              )}
              {selected.traits.tip && (
                <span className="text-[10px] ml-1" style={{ color: "var(--color-text-muted)" }}>
                  {selected.traits.tip}
                </span>
              )}
            </div>
          </div>

          {/* 策略信号栏 */}
          <StrategySignalBar
            activeStrategyId={activeStrategy}
            onChangeStrategy={setActiveStrategy}
            selectedSymbol={selected.symbol}
            priceHistory={priceHistory[selected.symbol] || []}
            cash={trade.cash}
          />

          {/* 交易面板 */}
          <TradePanel stock={selected} tick={ticks[selected.symbol]} mission={mission} missionDone={missionDone} />

          {/* 移动端：自选行情（lg以下显示） */}
          <div className="lg:hidden mt-4 card-base">
            <h3 className="text-sm font-semibold mb-2">自选行情</h3>
            <MarketTicker ticks={ticks} selected={selected} onSelect={setSelected} />
          </div>
        </div>

        {/* 右栏：持仓 */}
        <div className="hidden lg:block shrink-0 border-l overflow-y-auto py-4 px-3" style={{ width: 280, borderColor: "var(--border-subtle)" }}>
          <PortfolioPanel ticks={ticks} />
        </div>
      </div>
    </div>
  );
}