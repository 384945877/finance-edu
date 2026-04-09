"use client";

import { useState } from "react";

/* ===== 类型定义 ===== */

export interface ScenarioChoice {
  text: string;
  result: string;
  impact?: string;       // 简短的数字/标签影响，如 "-¥800" 或 "+信用"
  isGood?: boolean;       // 是否为较优选择（用于高亮）
  nextSceneId?: string;   // 跳转到指定场景（分支剧情）
}

export interface Scene {
  id: string;
  situation: string;       // 场景描述
  detail?: string;         // 补充细节
  choices: ScenarioChoice[];
}

export interface ScenarioGameProps {
  title: string;
  description: string;
  scenes: Scene[];
  endingTitle?: string;
  endingText?: string;
}

/* ===== 组件 ===== */

export default function ScenarioGame({
  title,
  description,
  scenes,
  endingTitle = "闯关结束",
  endingText,
}: ScenarioGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [history, setHistory] = useState<{ sceneId: string; choiceIdx: number; isGood: boolean }[]>([]);
  const [finished, setFinished] = useState(false);

  const scene = scenes[currentIndex];
  if (!scene) return null;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === null) return;
    const choice = scene.choices[selected];
    const record = { sceneId: scene.id, choiceIdx: selected, isGood: choice.isGood ?? false };
    const newHistory = [...history, record];
    setHistory(newHistory);

    // 检查是否有分支跳转
    if (choice.nextSceneId) {
      const nextIdx = scenes.findIndex(s => s.id === choice.nextSceneId);
      if (nextIdx >= 0) {
        setCurrentIndex(nextIdx);
        setSelected(null);
        return;
      }
    }

    // 下一个场景
    if (currentIndex + 1 < scenes.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setHistory([]);
    setFinished(false);
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
          <div className="text-5xl font-black mb-2" style={{ color: gradeColor }}>{grade}</div>
          <p className="text-lg font-bold">{gradeText}</p>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
            {goodCount}/{totalCount} 个场景做出了更优选择
          </p>
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
      </div>
    );
  }

  /* ---- 游戏画面 ---- */
  return (
    <div className="my-8 rounded-2xl overflow-hidden" style={{ border: "2px solid var(--border-medium)" }}>
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
        <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--color-text-muted)" }}>
          {currentIndex + 1}/{scenes.length}
        </span>
      </div>

      {/* 场景 */}
      <div className="px-6 pt-5 pb-4">
        <p className="text-base font-bold leading-relaxed">{scene.situation}</p>
        {scene.detail && (
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
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
              style={{ border: `2px solid ${borderColor}`, background: bg, opacity: revealed && !isChosen ? 0.45 : 1 }}>
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
    </div>
  );
}