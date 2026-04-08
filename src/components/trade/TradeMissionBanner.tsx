"use client";

import Link from "next/link";
import { type TradeMission } from "@/lib/trade-missions";
import { useTrade } from "@/lib/trade-store";

interface Props {
  mission: TradeMission;
}

/** 课程模块底部的场景式"去实战"引导 */
export default function TradeMissionBanner({ mission }: Props) {
  const { isMissionCompleted } = useTrade();
  const completed = isMissionCompleted(mission.id);

  if (completed) {
    return (
      <div className="my-8 rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, #065f46 0%, #064e3b 100%)",
          border: "1px solid rgba(24,226,153,0.3)",
        }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{mission.emoji}</span>
          <span className="text-white font-semibold text-sm">{mission.title}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 font-medium">
            已完成 +{mission.xp}XP
          </span>
        </div>
        <p className="text-green-200/70 text-xs">{mission.reason}</p>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
      {/* 场景引入 */}
      <div className="p-5 pb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
            style={{ background: "#f97316", color: "#fff" }}>
            学完就练
          </span>
          <span className="text-white font-semibold text-sm">{mission.title}</span>
        </div>
        <p className="text-gray-300 text-xs leading-relaxed">{mission.reason}</p>
      </div>

      {/* 步骤预览 */}
      <div className="px-5 pb-3">
        <div className="flex gap-2 flex-wrap">
          {mission.steps.slice(0, 3).map((step, i) => (
            <span key={i} className="text-[10px] px-2 py-1 rounded-lg inline-flex items-center gap-1"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
              <span className="font-bold text-amber-400">{i + 1}</span> {step.length > 20 ? step.slice(0, 20) + "..." : step}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link href={`/trade?mission=${mission.id}`}
        className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="text-xs text-gray-500">目标: {mission.goal} &middot; +{mission.xp}XP</span>
        <span className="text-sm font-medium text-white px-4 py-1.5 rounded-full"
          style={{ background: "#f97316" }}>
          进入交易大厅 &rarr;
        </span>
      </Link>
    </div>
  );
}