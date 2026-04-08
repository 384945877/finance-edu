"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { STRATEGIES, runBacktest, getStrategyStocks, type Strategy, type StrategyId, type BacktestResult } from "@/lib/quant-strategies";
import MiniChart from "@/components/trade/MiniChart";

const difficultyColor: Record<string, string> = {
  "入门": "#22c55e",
  "进阶": "#f97316",
  "高阶": "#8b5cf6",
};

const riskColor: Record<string, string> = {
  "低": "#22c55e",
  "中": "#f97316",
  "高": "#ef4444",
};

export default function StrategiesPage() {
  const [activeId, setActiveId] = useState<StrategyId | null>(null);
  const [activeSymbol, setActiveSymbol] = useState<string>("");

  // 选中策略时自动选第一个标的并运行回测
  const handleSelect = (s: Strategy) => {
    if (activeId === s.id) {
      setActiveId(null);
      return;
    }
    setActiveId(s.id);
    setActiveSymbol(s.symbols[0] || "");
  };

  const activeStrategy = STRATEGIES.find(s => s.id === activeId);
  const stocks = activeStrategy ? getStrategyStocks(activeStrategy) : [];

  // 回测结果（useMemo缓存，避免每次render重新计算）
  const backtest: BacktestResult | null = useMemo(() => {
    if (!activeId || !activeSymbol) return null;
    return runBacktest(activeId, activeSymbol, 200);
  }, [activeId, activeSymbol]);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Header */}
      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[900px] flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">量化策略</h1>
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              选策略 · 看回测 · 理解逻辑
            </p>
          </div>
          <Link href="/trade" className="text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{ background: "var(--color-gray-100)", color: "var(--color-text-secondary)" }}>
            返回交易
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-4 py-6">
        {/* 策略卡片列表 */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {STRATEGIES.map((s) => {
            const isActive = activeId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleSelect(s)}
                className="text-left rounded-xl p-4 transition-all"
                style={{
                  background: isActive ? "var(--color-gray-100)" : "var(--color-bg)",
                  border: isActive ? "2px solid var(--color-brand)" : "1px solid var(--border-medium)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold">{s.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-bold"
                    style={{ background: difficultyColor[s.difficulty] + "18", color: difficultyColor[s.difficulty] }}>
                    {s.difficulty}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: riskColor[s.riskLevel] + "18", color: riskColor[s.riskLevel] }}>
                    {s.riskLevel}风险
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {s.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* 展开的回测详情 */}
        {activeStrategy && (
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border-medium)" }}>
            {/* 策略逻辑 */}
            <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border-subtle)", background: "var(--color-gray-50)" }}>
              <h2 className="text-base font-semibold mb-1">{activeStrategy.name}</h2>
              <p className="text-xs font-mono px-2 py-1.5 rounded-lg inline-block mb-3"
                style={{ background: "var(--color-bg)", color: "var(--color-brand-deep)", border: "1px solid var(--border-subtle)" }}>
                {activeStrategy.logic}
              </p>

              {/* 参数 */}
              <div className="flex flex-wrap gap-3 mt-2">
                {activeStrategy.params.map(p => (
                  <div key={p.key} className="text-xs">
                    <span style={{ color: "var(--color-text-muted)" }}>{p.label}：</span>
                    <span className="font-semibold">{p.value}{p.unit ? ` ${p.unit}` : ""}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 标的选择 */}
            <div className="px-5 py-3 border-b flex items-center gap-2" style={{ borderColor: "var(--border-subtle)" }}>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>回测标的：</span>
              {stocks.map(st => (
                <button key={st.symbol} onClick={() => setActiveSymbol(st.symbol)}
                  className="text-xs px-2.5 py-1 rounded-lg font-medium transition-colors"
                  style={{
                    background: activeSymbol === st.symbol ? "var(--color-brand)" : "var(--color-gray-100)",
                    color: activeSymbol === st.symbol ? "#fff" : "var(--color-text-secondary)",
                  }}>
                  {st.name}
                </button>
              ))}
            </div>

            {/* 回测结果 */}
            {backtest && (
              <div className="px-5 py-4">
                {/* 统计指标 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <StatCard
                    label="策略收益"
                    value={`${backtest.totalReturn >= 0 ? "+" : ""}${backtest.totalReturn}%`}
                    color={backtest.totalReturn >= 0 ? "#22c55e" : "#ef4444"}
                  />
                  <StatCard
                    label="基准收益"
                    value={`${backtest.benchmarkReturn >= 0 ? "+" : ""}${backtest.benchmarkReturn}%`}
                    color={backtest.benchmarkReturn >= 0 ? "#22c55e" : "#ef4444"}
                  />
                  <StatCard
                    label="最大回撤"
                    value={`-${backtest.maxDrawdown}%`}
                    color="#ef4444"
                  />
                  <StatCard
                    label="交易次数 / 胜率"
                    value={`${backtest.tradeCount}笔 / ${backtest.winRate}%`}
                    color="var(--color-text)"
                  />
                </div>

                {/* 净值曲线 */}
                <div className="rounded-xl p-3" style={{ background: "var(--color-gray-50)" }}>
                  <div className="flex items-center gap-4 mb-2 text-[10px]" style={{ color: "var(--color-text-muted)" }}>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-0.5 rounded" style={{ background: "var(--color-brand)" }} /> 策略净值
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-0.5 rounded" style={{ background: "var(--color-text-muted)" }} /> 买入持有
                    </span>
                  </div>
                  <DualChart
                    equity={backtest.equity}
                    benchmark={backtest.benchmark}
                    height={200}
                  />
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center gap-3 mt-4">
                  <Link href={`/trade?strategy=${activeStrategy.id}`}
                    className="flex-1 text-center text-sm font-medium py-2.5 rounded-xl text-white transition-colors"
                    style={{ background: "var(--color-brand)" }}>
                    用此策略交易
                  </Link>
                  {activeStrategy.relatedModule && (
                    <Link href={`/course/intermediate/${activeStrategy.relatedModule}`}
                      className="text-xs font-medium px-4 py-2.5 rounded-xl transition-colors"
                      style={{ background: "var(--color-gray-100)", color: "var(--color-text-secondary)" }}>
                      学习原理
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** 统计卡片 */
function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg p-3" style={{ background: "var(--color-gray-50)" }}>
      <p className="text-[10px] mb-0.5" style={{ color: "var(--color-text-muted)" }}>{label}</p>
      <p className="text-sm font-bold tabular-nums" style={{ color }}>{value}</p>
    </div>
  );
}

/** 双线净值曲线（策略 vs 基准） */
function DualChart({ equity, benchmark, height = 160 }: { equity: number[]; benchmark: number[]; height?: number }) {
  if (equity.length < 2) return null;

  const width = 800;
  const pad = 4;
  const all = [...equity, ...benchmark];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;

  const toPoints = (data: number[]) =>
    data.map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (width - pad * 2);
      const y = pad + (1 - (v - min) / range) * (height - pad * 2);
      return `${x},${y}`;
    }).join(" ");

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full">
        {/* 基准线 */}
        <polyline points={toPoints(benchmark)} fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeDasharray="4 2" opacity={0.5} />
        {/* 策略线 */}
        <polyline points={toPoints(equity)} fill="none" stroke="var(--color-brand)" strokeWidth="2.5" strokeLinejoin="round" />
        {/* 起始基准线 */}
        <line x1={pad} y1={pad + (1 - (100000 - min) / range) * (height - pad * 2)} x2={width - pad} y2={pad + (1 - (100000 - min) / range) * (height - pad * 2)} stroke="var(--border-medium)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}