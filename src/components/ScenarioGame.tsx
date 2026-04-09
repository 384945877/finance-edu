"use client";

import { useState, useCallback } from "react";
import CoinDrop from "@/components/motion/CoinDrop";
import AnimatedNumber from "@/components/motion/AnimatedNumber";
import { useSound } from "@/lib/use-sound";

/* ===== 类型定义 ===== */

export interface ScenarioChoice {
  text: string;
  result: string;
  impact?: string;       // 简短标签 "-¥800" "+信用"
  moneyChange?: number;  // 金额变化（用于资产面板动画）
  isGood?: boolean;
  nextSceneId?: string;
}

export interface Scene {
  id: string;
  situation: string;
  detail?: string;
  image?: string;         // emoji 作为大插图
  choices: ScenarioChoice[];
}

export interface ScenarioGameProps {
  title: string;
  description: string;
  scenes: Scene[];
  initialMoney?: number;  // 初始资金（有则显示资产面板）
  endingTitle?: string;
  endingText?: string;
}

/* ===== 组件 ===== */

export default function ScenarioGame({
  title, description, scenes, initialMoney,
  endingTitle = "闯关结束", endingText,
}: ScenarioGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [history, setHistory] = useState<{ sceneId: string; choiceIdx: number; isGood: boolean }[]>([]);
  const [finished, setFinished] = useState(false);
  const [money, setMoney] = useState(initialMoney ?? 0);
  const [coinTrigger, setCoinTrigger] = useState(false);
  const [coinType, setCoinType] = useState<"gain" | "loss">("gain");
  const { play } = useSound();

  const scene = scenes[currentIndex];
  if (!scene) return null;

  const hasMoney = initialMoney !== undefined;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const choice = scene.choices[idx];
    // 音效
    if (choice.isGood) {
      play("coin");
    } else if (choice.isGood === false) {
      play("loss");
    } else {
      play("click");
    }
    // 金币动画
    if (choice.moneyChange) {
      setCoinType(choice.moneyChange > 0 ? "gain" : "loss");
      setCoinTrigger(true);
      setMoney(prev => prev + choice.moneyChange!);
    }
  };

  const handleCoinComplete = useCallback(() => setCoinTrigger(false), []);

  const handleNext = () => {
    if (selected === null) return;
    const choice = scene.choices[selected];
    const record = { sceneId: scene.id, choiceIdx: selected, isGood: choice.isGood ?? false };
    const newHistory = [...history, record];
    setHistory(newHistory);
    play("whoosh");

    if (choice.nextSceneId) {
      const nextIdx = scenes.findIndex(s => s.id === choice.nextSceneId);
      if (nextIdx >= 0) { setCurrentIndex(nextIdx); setSelected(null); return; }
    }
    if (currentIndex + 1 < scenes.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      play("levelup");
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0); setSelected(null);
    setHistory([]); setFinished(false);
    setMoney(initialMoney ?? 0);
  };

  const goodCount = history.filter(h => h.isGood).length;
  const totalCount = history.length;

  /* ---- 结束画面 ---- */
  if (finished) {
    const score = totalCount === 0 ? 0 : Math.round((goodCount / totalCount) * 100);
    const grade = score >= 80 ? "S" : score >= 60 ? "A" : score >= 40 ? "B" : "C";
    const gradeColor = score >= 80 ? "#22c55e" : score >= 60 ? "#f97316" : score >= 40 ? "#3b82f6" : "#ef4444";
    const gradeText = score >= 80 ? "理财高手" : score >= 60 ? "有潜力" : score >= 40 ? "还需修炼" : "踩坑王";

    return (
      <div className="my-8 rounded-2xl overflow-hidden" style={{ border: "2px solid var(--border-medium)" }}>
        <div className="px-6 py-8 text-center" style={{ background: "var(--color-gray-50)" }}>
          {/* 评分动画 */}
          <div className="text-6xl font-black mb-1 animate-bounce-once" style={{ color: gradeColor }}>{grade}</div>
          <p className="text-lg font-bold">{gradeText}</p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            {goodCount}/{totalCount} 个场景做出了更优选择
          </p>
          {hasMoney && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: money >= (initialMoney ?? 0) ? "#22c55e15" : "#ef444415" }}>
              <span className="text-sm">最终资金</span>
              <AnimatedNumber value={money} prefix="¥" className="text-lg font-bold"
                style={{ color: money >= (initialMoney ?? 0) ? "#22c55e" : "#ef4444" }} />
            </div>
          )}
          {endingText && (
            <p className="text-sm mt-3 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {endingText}
            </p>
          )}
          <button onClick={handleRestart}
            className="mt-5 text-sm font-medium px-5 py-2 rounded-xl transition-colors"
            style={{ background: "var(--color-gray-100)", color: "var(--color-text-secondary)" }}>
            再来一次
          </button>
        </div>
        <style>{`
          @keyframes bounceOnce { 0%{transform:scale(0.3);opacity:0} 50%{transform:scale(1.15)} 70%{transform:scale(0.95)} 100%{transform:scale(1);opacity:1} }
          .animate-bounce-once { animation: bounceOnce 0.6s ease-out; }
        `}</style>
      </div>
    );
  }

  /* ---- 游戏画面 ---- */
  return (
    <div className="my-8 rounded-2xl overflow-hidden relative"
      style={{ border: "2px solid var(--border-medium)" }}>
      {/* 金币掉落 */}
      <CoinDrop trigger={coinTrigger} type={coinType} onComplete={handleCoinComplete} />

      {/* 头部 */}
      <div className="px-5 py-3 flex items-center justify-between"
        style={{ background: "var(--color-gray-50)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md"
            style={{ background: "var(--color-brand)", color: "#0d0d0d" }}>
            {title}
          </span>
          <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>{description}</span>
        </div>
        <div className="flex items-center gap-3">
          {hasMoney && (
            <span className="text-xs font-semibold tabular-nums"
              style={{ color: money >= (initialMoney ?? 0) ? "var(--color-brand-deep)" : "#ef4444" }}>
              ¥<AnimatedNumber value={money} />
            </span>
          )}
          <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--color-text-muted)" }}>
            {currentIndex + 1}/{scenes.length}
          </span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="h-1" style={{ background: "var(--color-gray-100)" }}>
        <div className="h-full transition-all duration-500 ease-out rounded-r"
          style={{
            width: `${((currentIndex + (selected !== null ? 0.5 : 0)) / scenes.length) * 100}%`,
            background: "var(--color-brand)",
          }} />
      </div>

      {/* 场景插图 + 文字 */}
      <div className="px-6 pt-5 pb-4">
        {scene.image && (
          <div className="text-4xl mb-3 animate-scene-in">{scene.image}</div>
        )}
        <p className="text-base font-bold leading-relaxed animate-scene-in">{scene.situation}</p>
        {scene.detail && (
          <p className="text-sm mt-2 leading-relaxed animate-scene-in"
            style={{ color: "var(--color-text-secondary)" }}>
            {scene.detail}
          </p>
        )}
      </div>

      {/* 选项 */}
      <div className="px-6 pb-4 space-y-2.5">
        {scene.choices.map((c, i) => {
          const isChosen = selected === i;
          const revealed = selected !== null;
          let borderColor = "var(--border-medium)";
          let bg = "var(--color-bg)";
          if (revealed && isChosen) {
            borderColor = c.isGood ? "#22c55e" : "#ef4444";
            bg = c.isGood ? "#22c55e08" : "#ef444408";
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={revealed}
              className="w-full text-left rounded-xl px-4 py-3 transition-all"
              style={{
                border: `2px solid ${borderColor}`, background: bg,
                opacity: revealed && !isChosen ? 0.45 : 1,
                transform: revealed && isChosen ? "scale(1.01)" : "scale(1)",
              }}>
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm">{c.text}</span>
                {c.impact && (
                  <span className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-md"
                    style={{ background: "var(--color-gray-100)", color: "var(--color-text-muted)" }}>
                    {c.impact}
                  </span>
                )}
              </div>
              {revealed && isChosen && (
                <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {c.result}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* 下一步 */}
      {selected !== null && (
        <div className="px-6 pb-5">
          <button onClick={handleNext}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ background: "var(--color-brand)", color: "#0d0d0d" }}>
            {currentIndex + 1 < scenes.length ? "下一个场景" : "查看结果"}
          </button>
        </div>
      )}

      <style>{`
        @keyframes sceneIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .animate-scene-in { animation: sceneIn 0.4s ease-out; }
      `}</style>
    </div>
  );
}