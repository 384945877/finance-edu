"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress-store";
import { getNextModule, getPrevModule, getPartById, getTotalModules, getCourse, type Module } from "@/lib/course-data";
import { getMissionBySlug } from "@/lib/trade-missions";
import TradeMissionBanner from "@/components/trade/TradeMissionBanner";

interface ModuleShellProps {
  courseId: string;
  module: Module;
  children: React.ReactNode;
}

export default function ModuleShell({ courseId, module, children }: ModuleShellProps) {
  const { completeModule, isCompleted, getProgress } = useProgress();
  const next = getNextModule(courseId, module.id);
  const prev = getPrevModule(courseId, module.id);
  const part = getPartById(courseId, module.part);
  const course = getCourse(courseId);
  const completed = isCompleted(courseId, module.id);
  const progress = getProgress(courseId);
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
        </div>
      </section>
    </>
  );
}