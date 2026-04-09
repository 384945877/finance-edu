"use client";

import { useState, useCallback } from "react";
import AnimatedNumber from "@/components/motion/AnimatedNumber";
import CoinDrop from "@/components/motion/CoinDrop";
import MiniLineChart from "@/components/motion/MiniLineChart";
import { useSound } from "@/lib/use-sound";

/* ===== 类型 ===== */

export interface SimStat {
  label: string;
  key: string;
  prefix?: string;
  suffix?: string;
  color?: string;
}

export interface SimChoice {
  text: string;
  result: string;
  effects: Record<string, number>;   // { cash: -500, savings: 800 }
  isGood?: boolean;
}

export interface SimStep {
  id: string;
  title: string;
  narrative: string;        // 叙事文字
  image?: string;           // emoji
  choices: SimChoice[];
}

export interface StorySimulatorProps {
  title: string;
  description: string;
  stats: SimStat[];          // 要追踪的数值面板
  initialValues: Record<string, number>;
  steps: SimStep[];
  chartKey?: string;         // 选哪个 stat 画折线图
  endingText?: string;
}

/* ===== 组件 ===== */

export default function StorySimulator({
  title, description, stats, initialValues, steps, chartKey, endingText,
}: StorySimulatorProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [values, setValues] = useState<Record<string, number>>(initialValues);
  const [chartData, setChartData] = useState<{ label: string; value: number }[]>(
    chartKey ? [{ label: "起点", value: initialValues[chartKey] ?? 0 }] : []
  );
  const [finished, setFinished] = useState(false);
  const [coinTrigger, setCoinTrigger] = useState(false);
  const [coinType, setCoinType] = useState<"gain" | "loss">("gain");
  const { play } = useSound();

  const step = steps[stepIdx];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const choice = step.choices[idx];

    // 应用效果
    const newVals = { ...values };
    let netMoney = 0;
    for (const [k, v] of Object.entries(choice.effects)) {
      newVals[k] = (newVals[k] ?? 0) + v;
      netMoney += v;
    }
    setValues(newVals);

    // 图表更新
    if (chartKey && newVals[chartKey] !== undefined) {
      setChartData(prev => [...prev, { label: step.title, value: newVals[chartKey] }]);
    }

    // 音效 & 动画
    if (choice.isGood) { play("coin"); } else if (choice.isGood === false) { play("loss"); } else { play("click"); }
    if (netMoney !== 0) {
      setCoinType(netMoney > 0 ? "gain" : "loss");
      setCoinTrigger(true);
    }
  };

  const handleCoinComplete = useCallback(() => setCoinTrigger(false), []);

  const handleNext = () => {
    if (selected === null) return;
    play("whoosh");
    if (stepIdx + 1 < steps.length) {
      setStepIdx(stepIdx + 1);
      setSelected(null);
    } else {
      play("levelup");
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setStepIdx(0); setSelected(null);
    setValues(initialValues); setFinished(false);
    setChartData(chartKey ? [{ label: "起点", value: initialValues[chartKey] ?? 0 }] : []);
  };

  /* ---- 数值面板 ---- */
  const StatPanel = () => (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)` }}>
      {stats.map(s => (
        <div key={s.key} className="rounded-xl px-3 py-2 text-center"
          style={{ background: "var(--color-gray-50)", border: "1px solid var(--border-subtle)" }}>
          <div className="text-[10px] font-medium" style={{ color: "var(--color-text-muted)" }}>{s.label}</div>
          <AnimatedNumber value={values[s.key] ?? 0} prefix={s.prefix} suffix={s.suffix}
            className="text-base font-bold" style={{ color: s.color ?? "var(--color-text)" }} />
        </div>
      ))}
    </div>
  );

  /* ---- 结束画面 ---- */
  if (finished) {
    return (
      <div className="my-8 rounded-2xl overflow-hidden" style={{ border: "2px solid var(--border-medium)" }}>
        <div className="px-6 py-6" style={{ background: "var(--color-gray-50)" }}>
          <p className="text-center text-lg font-bold mb-4">模拟结束</p>
          <StatPanel />
          {chartKey && chartData.length > 1 && (
            <div className="mt-4 flex justify-center">
              <MiniLineChart data={chartData} width={320} height={100} showLabels showDots />
            </div>
          )}
          {endingText && (
            <p className="text-sm mt-4 text-center leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {endingText}
            </p>
          )}
          <div className="text-center mt-4">
            <button onClick={handleRestart}
              className="text-sm font-medium px-5 py-2 rounded-xl"
              style={{ background: "var(--color-gray-100)", color: "var(--color-text-secondary)" }}>
              重新开始
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---- 游戏画面 ---- */
  return (
    <div className="my-8 rounded-2xl overflow-hidden relative"
      style={{ border: "2px solid var(--border-medium)" }}>
      <CoinDrop trigger={coinTrigger} type={coinType} onComplete={handleCoinComplete} />

      {/* 头部 */}
      <div className="px-5 py-3 flex items-center justify-between"
        style={{ background: "var(--color-gray-50)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md"
            style={{ background: "#8b5cf6", color: "#fff" }}>
            {title}
          </span>
          <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>{description}</span>
        </div>
        <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--color-text-muted)" }}>
          {stepIdx + 1}/{steps.length}
        </span>
      </div>

      {/* 进度条 */}
      <div className="h-1" style={{ background: "var(--color-gray-100)" }}>
        <div className="h-full transition-all duration-500 ease-out rounded-r"
          style={{ width: `${((stepIdx + (selected !== null ? 0.5 : 0)) / steps.length) * 100}%`, background: "#8b5cf6" }} />
      </div>

      {/* 数值面板 */}
      <div className="px-5 pt-4"><StatPanel /></div>

      {/* 迷你图表 */}
      {chartKey && chartData.length > 1 && (
        <div className="px-5 pt-2 flex justify-center">
          <MiniLineChart data={chartData} width={280} height={60} showDots={false} />
        </div>
      )}

      {/* 叙事 */}
      <div className="px-6 pt-4 pb-3">
        {step.image && <div className="text-3xl mb-2">{step.image}</div>}
        <p className="text-sm font-bold">{step.title}</p>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {step.narrative}
        </p>
      </div>

      {/* 选项 */}
      <div className="px-6 pb-4 space-y-2">
        {step.choices.map((c, i) => {
          const isChosen = selected === i;
          const revealed = selected !== null;
          let border = "var(--border-medium)";
          let bg = "var(--color-bg)";
          if (revealed && isChosen) {
            border = c.isGood ? "#22c55e" : c.isGood === false ? "#ef4444" : "#f97316";
            bg = c.isGood ? "#22c55e08" : c.isGood === false ? "#ef444408" : "#f9731608";
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={revealed}
              className="w-full text-left rounded-xl px-4 py-3 transition-all"
              style={{ border: `2px solid ${border}`, background: bg, opacity: revealed && !isChosen ? 0.4 : 1 }}>
              <span className="text-sm">{c.text}</span>
              {revealed && isChosen && (
                <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {c.result}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="px-6 pb-5">
          <button onClick={handleNext}
            className="w-full py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: "#8b5cf6", color: "#fff" }}>
            {stepIdx + 1 < steps.length ? "继续" : "查看结果"}
          </button>
        </div>
      )}
    </div>
  );
}