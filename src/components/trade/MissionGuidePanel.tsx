"use client";

import { useState } from "react";
import Link from "next/link";
import { type TradeMission } from "@/lib/trade-missions";
import { useTrade } from "@/lib/trade-store";

interface Props {
  mission: TradeMission;
  done: boolean;
}

/** 交易大厅左侧沉浸式任务引导面板 */
export default function MissionGuidePanel({ mission, done }: Props) {
  const [expanded, setExpanded] = useState(true);
  const trade = useTrade();

  return (
    <div className="card-base overflow-hidden" style={{ border: done ? "1px solid rgba(24,226,153,0.4)" : "1px solid #f9731640" }}>
      {/* Header */}
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md"
                style={{ background: done ? "#065f4630" : "#f9731620", color: done ? "#22c55e" : "#f97316" }}>
                {done ? "已完成" : "实战任务"}
              </span>
              <span className="text-sm font-semibold">{mission.title}</span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{mission.desc}</p>
          </div>
        </div>
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{expanded ? "收起" : "展开"}</span>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* 为什么做 */}
          <div className="rounded-xl p-3" style={{ background: done ? "#065f4610" : "#f9731608" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: done ? "#22c55e" : "#f97316" }}>
              {done ? "你学到了" : "为什么做这个"}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              {mission.reason}
            </p>
          </div>

          {/* 分步引导 */}
          {!done && (
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--color-text-muted)" }}>操作步骤</p>
              <div className="space-y-1.5">
                {mission.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                      style={{ background: "var(--color-gray-100)", color: "var(--color-text-muted)" }}>
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 完成奖励 */}
          {done && (
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-green-500">+{mission.xp} XP</span>
              <Link href={`/course/intermediate/${mission.moduleSlug}`}
                className="text-xs font-medium px-3 py-1 rounded-lg transition-colors"
                style={{ background: "var(--color-gray-50)", color: "var(--color-text-secondary)" }}>
                返回课程 &rarr;
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}