"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress-store";
import { getNextModule, getPrevModule, getPartById, getTotalModules, getCourse, type Module } from "@/lib/course-data";
import { getMissionBySlug } from "@/lib/trade-missions";
import TradeMissionBanner from "@/components/trade/TradeMissionBanner";
import AiTutor from "@/components/AiTutor";
import { useHydrated } from "@/lib/useHydrated";

interface ModuleShellProps {
  courseId: string;
  module: Module;
  children: React.ReactNode;
}

export default function ModuleShell({ courseId, module, children }: ModuleShellProps) {
  const { completeModule, isCompleted, getProgress } = useProgress();
  const hydrated = useHydrated();
  const next = getNextModule(courseId, module.id);
  const prev = getPrevModule(courseId, module.id);
  const part = getPartById(courseId, module.part);
  const course = getCourse(courseId);
  const completed = hydrated ? isCompleted(courseId, module.id) : false;
  const progress = hydrated ? getProgress(courseId) : 0;
  const total = getTotalModules(courseId);
  const color = course?.color || "var(--color-brand)";

  // 进阶课程模块关联的实战任务
  const mission = courseId === "intermediate" ? getMissionBySlug(module.slug) : undefined;

  return (
    <>
      {/* Top progress bar */}
      <div className="sticky top-[57px] z-40 border-b"
        style={{ borderColor: "var(--border-subtle)", background: "var(--color-bg)" }}>
        <div className="mx-auto max-w-[800px] px-6 py-2 flex items-center gap-3 text-xs">
          <span className="font-medium" style={{ color: "var(--color-text-muted)" }}>
            {module.id}/{total}
          </span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: color }}
            />
          </div>
          <span className="font-medium" style={{ color }}>
            {progress}%
          </span>
        </div>
      </div>

      {/* Module header */}
      <section className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[800px] px-6 pt-10 pb-8 md:pt-16 md:pb-10">
          <div className="flex items-center gap-2 mb-3">
            <Link href={`/course/${courseId}`} className="label-upper hover:underline" style={{ color }}>
              {part?.emoji} {part?.title}
            </Link>
            <span style={{ color: "var(--color-text-muted)" }}>&middot;</span>
            <span className="label-upper" style={{ color: "var(--color-text-muted)" }}>
              模块 {module.id}
            </span>
          </div>
          <h1 className="heading-section flex items-center gap-3">
            <span className="text-4xl">{module.emoji}</span>
            {module.title}
          </h1>
          <p className="text-body-large mt-2" style={{ color: "var(--color-text-secondary)" }}>
            {module.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-[800px] prose-content">
          {children}

          {/* 进阶课程实战任务入口 */}
          {mission && <TradeMissionBanner mission={mission} />}
        </div>
      </section>

      {/* Complete & Navigate */}
      <section className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[800px] px-6 py-8 flex flex-col items-center gap-4">
          {!completed && (
            <button
              onClick={() => completeModule(courseId, module.id)}
              className="btn-brand text-base px-8 py-3"
            >
              完成本关
            </button>
          )}
          {completed && (
            <p className="text-sm font-medium" style={{ color }}>
              已完成
            </p>
          )}
          <div className="flex items-center gap-4 w-full justify-between mt-2">
            {prev ? (
              <Link href={`/course/${courseId}/${prev.slug}`} className="btn-secondary text-sm">
                &larr; {prev.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/course/${courseId}/${next.slug}`} className="btn-primary text-sm">
                {next.title} &rarr;
              </Link>
            ) : (
              <Link href={`/course/${courseId}`} className="btn-brand text-sm">
                回到课程地图
              </Link>
            )}
          </div>

          {/* 课程结业引导 */}
          {!next && (
            <div className="w-full mt-6 rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--border-medium)" }}>
              <div className="px-5 py-4 text-center"
                style={{ background: `linear-gradient(135deg, ${color}12 0%, ${color}05 100%)` }}>
                <p className="text-lg font-bold mb-1">
                  {courseId === "beginner" ? "小白课程全部通关" : courseId === "intermediate" ? "进阶课程全部通关" : "恭喜通关"}
                </p>
                <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                  {courseId === "beginner"
                    ? "你已经掌握了理财的基本功，接下来可以进入实战阶段了"
                    : courseId === "intermediate"
                    ? "你已经具备实战能力，可以挑战更高阶的财务规划了"
                    : "所有内容已学完，继续保持学习的习惯"}
                </p>
              </div>
              <div className="px-5 py-4 flex flex-col sm:flex-row gap-3">
                {courseId === "beginner" && (
                  <>
                    <Link href="/course/intermediate"
                      className="flex-1 text-center text-sm font-semibold py-3 rounded-xl text-white transition-colors"
                      style={{ background: "#f97316" }}>
                      进入进阶实战课程 &rarr;
                    </Link>
                    <Link href="/trade"
                      className="flex-1 text-center text-sm font-medium py-3 rounded-xl transition-colors"
                      style={{ background: "var(--color-gray-100)", color: "var(--color-text-secondary)" }}>
                      先去模拟交易练练手
                    </Link>
                  </>
                )}
                {courseId === "intermediate" && (
                  <>
                    <Link href="/course/advanced"
                      className="flex-1 text-center text-sm font-semibold py-3 rounded-xl text-white transition-colors"
                      style={{ background: "#8b5cf6" }}>
                      进入高阶规划课程 &rarr;
                    </Link>
                    <Link href="/trade"
                      className="flex-1 text-center text-sm font-medium py-3 rounded-xl transition-colors"
                      style={{ background: "var(--color-gray-100)", color: "var(--color-text-secondary)" }}>
                      去交易大厅实操
                    </Link>
                  </>
                )}
                {courseId === "advanced" && (
                  <Link href="/"
                    className="flex-1 text-center text-sm font-medium py-3 rounded-xl transition-colors"
                    style={{ background: "var(--color-gray-100)", color: "var(--color-text-secondary)" }}>
                    回到首页
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* AI 助教 */}
      <AiTutor slug={module.slug} moduleTitle={module.title} />
    </>
  );
}