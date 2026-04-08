"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { STRATEGIES, generateLiveSignal, type StrategyId, type LiveSignal } from "@/lib/quant-strategies";

const signalConfig: Record<string, { label: string; color: string; bg: string }> = {
  buy: { label: "买入信号", color: "#22c55e", bg: "#22c55e12" },
  sell: { label: "卖出信号", color: "#ef4444", bg: "#ef444412" },
  hold: { label: "持有观望", color: "#f97316", bg: "#f9731612" },
};

interface Props {
  activeStrategyId: StrategyId | null;
  onChangeStrategy: (id: StrategyId | null) => void;
  selectedSymbol: string;
  priceHistory: number[];
  cash: number;
}

export default function StrategySignalBar({
  activeStrategyId,
  onChangeStrategy,
  selectedSymbol,
  priceHistory,
  cash,
}: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const signal: LiveSignal | null = useMemo(() => {
    if (!activeStrategyId) return null;
    return generateLiveSignal(activeStrategyId, selectedSymbol, priceHistory, cash);
  }, [activeStrategyId, selectedSymbol, priceHistory, cash]);

  const activeStrategy = STRATEGIES.find(s => s.id === activeStrategyId);

  // 未开启策略时的引导条
  if (!activeStrategyId) {
    return (
      <div className="relative mb-3">
        <div
          className="flex items-center justify-between rounded-xl px-4 py-2.5"
          style={{ background: "var(--color-gray-50)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-text-muted)" }} />
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              暂未开启策略辅助
            </span>
          </div>
          <button
            onClick={() => setPickerOpen(!pickerOpen)}
            className="text-xs font-medium px-3 py-1 rounded-lg transition-colors"
            style={{ background: "var(--color-brand)", color: "#fff" }}
          >
            开启策略
          </button>
        </div>
        {pickerOpen && (
          <StrategyPicker
            currentId={null}
            symbol={selectedSymbol}
            onSelect={(id) => { onChangeStrategy(id); setPickerOpen(false); }}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </div>
    );
  }

  const cfg = signal ? signalConfig[signal.action] : signalConfig.hold;

  return (
    <div className="relative mb-3">
      <div
        className="rounded-xl px-4 py-2.5"
        style={{ background: cfg.bg, border: `1px solid ${cfg.color}25` }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* 信号灯 */}
            <span className="shrink-0 w-2 h-2 rounded-full" style={{ background: cfg.color }} />
            {/* 策略名 */}
            <button
              onClick={() => setPickerOpen(!pickerOpen)}
              className="text-xs font-semibold shrink-0 px-2 py-0.5 rounded-md transition-colors"
              style={{ background: cfg.color + "18", color: cfg.color }}
            >
              {activeStrategy?.name || "策略"}
            </button>
            {/* 信号 */}
            {signal && (
              <span className="text-xs truncate" style={{ color: "var(--color-text-secondary)" }}>
                <span className="font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                <span className="mx-1">·</span>
                {signal.reason}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            {signal && (
              <span className="text-[10px] tabular-nums px-1.5 py-0.5 rounded"
                style={{ background: "var(--color-bg)", color: "var(--color-text-muted)" }}>
                {signal.confidence}%
              </span>
            )}
            <button
              onClick={() => onChangeStrategy(null)}
              className="text-[10px] px-2 py-0.5 rounded-md transition-colors"
              style={{ background: "var(--color-gray-100)", color: "var(--color-text-muted)" }}
            >
              关闭
            </button>
          </div>
        </div>

        {/* 信号建议金额 */}
        {signal?.action === "buy" && signal.suggestedAmount && (
          <p className="text-[10px] mt-1.5 pl-4.5" style={{ color: "var(--color-text-muted)" }}>
            建议本次投入 ¥{signal.suggestedAmount.toLocaleString()}
          </p>
        )}
      </div>

      {pickerOpen && (
        <StrategyPicker
          currentId={activeStrategyId}
          symbol={selectedSymbol}
          onSelect={(id) => { onChangeStrategy(id); setPickerOpen(false); }}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}

/** 策略选择下拉面板 */
function StrategyPicker({
  currentId,
  symbol,
  onSelect,
  onClose,
}: {
  currentId: StrategyId | null;
  symbol: string;
  onSelect: (id: StrategyId) => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* 遮罩 */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      {/* 面板 */}
      <div
        className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl shadow-lg overflow-hidden"
        style={{ background: "var(--color-bg)", border: "1px solid var(--border-medium)" }}
      >
        <div className="px-4 py-2.5 border-b flex items-center justify-between"
          style={{ borderColor: "var(--border-subtle)", background: "var(--color-gray-50)" }}>
          <span className="text-xs font-semibold">选择交易策略</span>
          <Link href="/trade/strategies" className="text-[10px] font-medium"
            style={{ color: "var(--color-brand)" }}>
            查看回测详情
          </Link>
        </div>
        <div className="max-h-[280px] overflow-y-auto p-2">
          {STRATEGIES.map((s) => {
            const applicable = s.symbols.length === 0 || s.symbols.includes(symbol);
            const isCurrent = s.id === currentId;
            return (
              <button
                key={s.id}
                onClick={() => applicable && onSelect(s.id)}
                disabled={!applicable}
                className="w-full text-left rounded-lg px-3 py-2.5 mb-1 transition-colors"
                style={{
                  background: isCurrent ? "var(--color-brand)" + "10" : "transparent",
                  border: isCurrent ? "1px solid var(--color-brand)" + "30" : "1px solid transparent",
                  opacity: applicable ? 1 : 0.4,
                }}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold">{s.name}</span>
                  <span className="text-[9px] px-1 py-0.5 rounded font-bold"
                    style={{
                      background: s.difficulty === "入门" ? "#22c55e18" : s.difficulty === "进阶" ? "#f9731618" : "#8b5cf618",
                      color: s.difficulty === "入门" ? "#22c55e" : s.difficulty === "进阶" ? "#f97316" : "#8b5cf6",
                    }}>
                    {s.difficulty}
                  </span>
                  {!applicable && (
                    <span className="text-[9px]" style={{ color: "var(--color-text-muted)" }}>
                      不适用当前标的
                    </span>
                  )}
                </div>
                <p className="text-[10px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {s.logic}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}