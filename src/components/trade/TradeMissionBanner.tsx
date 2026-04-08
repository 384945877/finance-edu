"use client";

import Link from "next/link";
import { type TradeMission } from "@/lib/trade-missions";
import { useTrade } from "@/lib/trade-store";
import { useHydrated } from "@/lib/useHydrated";

interface Props {
  mission: TradeMission;
}

export default function TradeMissionBanner({ mission }: Props) {
  const { isMissionCompleted } = useTrade();
  const hydrated = useHydrated();
  const completed = hydrated && isMissionCompleted(mission.id);

  /* ---- 已完成态 ---- */
  if (completed) {
    return (
      <div className="my-10 rounded-2xl p-6"
        style={{ background: "var(--color-gray-50)", border: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl text-lg"
            style={{ background: "#22c55e18", color: "#22c55e" }}>
            &#x2713;
          </span>
          <div>
            <p className="text-sm font-semibold">{mission.title}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              实战任务已完成 · +{mission.xp} XP
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ---- 未完成态 ---- */
  return (
    <div className="my-10 rounded-2xl overflow-hidden"
      style={{ border: "2px solid #f9731630" }}>

      {/* 头部 */}
      <div className="px-6 pt-5 pb-4"
        style={{ background: "linear-gradient(180deg, #f9731608 0%, transparent 100%)" }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md"
            style={{ background: "#f97316", color: "#fff" }}>
            学完就练
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md"
            style={{ background: "var(--color-gray-100)", color: "var(--color-text-muted)" }}>
            +{mission.xp} XP
          </span>
        </div>
        <h3 className="text-base font-bold" style={{ marginTop: 0 }}>{mission.title}</h3>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {mission.reason}
        </p>
      </div>

      {/* 步骤 */}
      <div className="px-6 pb-4">
        <div className="space-y-2">
          {mission.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                style={{ background: "#f9731615", color: "#f97316" }}>
                {i + 1}
              </span>
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 目标 + 按钮 */}
      <div className="px-6 py-4 flex items-center justify-between"
        style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--color-gray-50)" }}>
        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          目标: {mission.goal}
        </p>
        <Link href={`/trade?mission=${mission.id}`}
          className="text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
          style={{ background: "#f97316", color: "#fff" }}>
          去实战
        </Link>
      </div>
    </div>
  );
}