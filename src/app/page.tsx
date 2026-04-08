"use client";

import Link from "next/link";
import { parts, TOTAL_MODULES } from "@/lib/course-data";
import { useProgress } from "@/lib/progress-store";

export default function Home() {
  const { isCompleted, isUnlocked, getProgress } = useProgress();
  const progress = getProgress();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-brand-light) 0%, transparent 70%)" }}
        />
        <div className="mx-auto max-w-[800px] px-6 pt-20 pb-14 md:pt-32 md:pb-20 text-center">
          <p className="label-upper mb-3" style={{ color: "var(--color-brand-deep)" }}>
            35 个互动模块 &middot; 从零开始 &middot; 免费
          </p>
          <h1 className="heading-display mx-auto max-w-2xl">
            理财冒险地图
          </h1>
          <p className="text-body-large mt-4 mx-auto max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
            不讲大道理，用互动和模拟器带你搞懂钱的事。
            <br className="hidden sm:inline" />
            每完成一关解锁下一关，闯完全部获得结业证书。
          </p>

          {/* Global progress */}
          <div className="mt-8 mx-auto max-w-sm">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span style={{ color: "var(--color-text-muted)" }}>总进度</span>
              <span className="font-semibold" style={{ color: "var(--color-brand-deep)" }}>{progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: "var(--color-brand)" }} />
            </div>
          </div>

          <Link href="/learn/what-is-money" className="btn-primary mt-8 inline-flex">
            {progress === 0 ? "开始冒险 \u2192" : "继续学习 \u2192"}
          </Link>
        </div>
      </section>

      {/* Course Map */}
      <section className="section-padding">
        <div className="mx-auto max-w-[800px]">
          {parts.map((part) => (
            <div key={part.id} className="mb-12">
              <h2 className="heading-sub flex items-center gap-2 mb-5">
                <span className="text-2xl">{part.emoji}</span>
                <span className="label-upper" style={{ color: "var(--color-text-muted)" }}>
                  第{part.id}部分
                </span>
                &nbsp;{part.title}
              </h2>

              <div className="grid gap-3">
                {part.modules.map((m) => {
                  const done = isCompleted(m.id);
                  const unlocked = isUnlocked(m.id);
                  return (
                    <Link
                      key={m.id}
                      href={unlocked ? `/learn/${m.slug}` : "#"}
                      className="card-base flex items-center gap-4 group"
                      style={{
                        opacity: unlocked ? 1 : 0.45,
                        pointerEvents: unlocked ? "auto" : "none",
                      }}
                    >
                      <span className="text-2xl w-10 text-center flex-shrink-0">{m.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold group-hover:underline truncate">{m.title}</p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-text-secondary)" }}>
                          {m.subtitle}
                        </p>
                      </div>
                      <span className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: done ? "var(--color-brand-light)" : "var(--color-gray-100)",
                          color: done ? "var(--color-brand-deep)" : "var(--color-text-muted)",
                        }}>
                        {done ? "\u2713 已完成" : unlocked ? "进入" : "\u{1F512}"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}