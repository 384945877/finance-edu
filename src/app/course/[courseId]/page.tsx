"use client";

import { use } from "react";
import Link from "next/link";
import { getCourse, getTotalModules } from "@/lib/course-data";
import { useProgress } from "@/lib/progress-store";
import { getMissionBySlug } from "@/lib/trade-missions";
import { useTrade } from "@/lib/trade-store";
import { notFound } from "next/navigation";

export default function CourseMapPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const course = getCourse(courseId);
  if (!course) return notFound();

  const { isCompleted, isUnlocked, getProgress } = useProgress();
  const { isMissionCompleted } = useTrade();
  const progress = getProgress(courseId);
  const total = getTotalModules(courseId);
  const firstSlug = course.parts[0]?.modules[0]?.slug;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${course.color}20 0%, transparent 70%)` }}
        />
        <div className="mx-auto max-w-[800px] px-6 pt-16 pb-10 md:pt-24 md:pb-16 text-center">
          <Link href="/" className="text-xs mb-4 inline-block" style={{ color: "var(--color-text-muted)" }}>
            &larr; 返回课程列表
          </Link>
          <div className="text-4xl mb-2">{course.emoji}</div>
          <div className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-3"
            style={{ background: course.color + "20", color: course.color }}>
            {course.level}
          </div>
          <h1 className="heading-display">{course.title}</h1>
          <p className="text-body-large mt-2" style={{ color: "var(--color-text-secondary)" }}>
            {course.subtitle} &middot; {total} 个模块
          </p>

          {/* Progress */}
          <div className="mt-6 mx-auto max-w-sm">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span style={{ color: "var(--color-text-muted)" }}>总进度</span>
              <span className="font-semibold" style={{ color: course.color }}>{progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: course.color }} />
            </div>
          </div>

          {firstSlug && (
            <Link href={`/course/${courseId}/${firstSlug}`} className="btn-primary mt-6 inline-flex">
              {progress === 0 ? "开始冒险 \u2192" : "继续学习 \u2192"}
            </Link>
          )}
        </div>
      </section>

      {/* Module Map */}
      <section className="section-padding">
        <div className="mx-auto max-w-[800px]">
          {course.parts.map((part) => (
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
                  const done = isCompleted(courseId, m.id);
                  const unlocked = isUnlocked(courseId, m.id);
                  const mission = courseId === "intermediate" ? getMissionBySlug(m.slug) : undefined;
                  const mDone = mission ? isMissionCompleted(mission.id) : false;
                  return (
                    <Link key={m.id}
                      href={unlocked ? `/course/${courseId}/${m.slug}` : "#"}
                      className="card-base flex items-center gap-4 group"
                      style={{ opacity: unlocked ? 1 : 0.45, pointerEvents: unlocked ? "auto" : "none" }}
                    >
                      <span className="text-2xl w-10 text-center flex-shrink-0">{m.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold group-hover:underline truncate">{m.title}</p>
                          {mission && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0"
                              style={{
                                background: mDone ? "#065f4620" : "#f9731620",
                                color: mDone ? "#065f46" : "#f97316",
                              }}>
                              {mDone ? "实战 ✓" : "实战"}
                            </span>
                          )}
                        </div>
                        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--color-text-secondary)" }}>{m.subtitle}</p>
                      </div>
                      <span className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: done ? course.color + "20" : "var(--color-gray-100)", color: done ? course.color : "var(--color-text-muted)" }}>
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