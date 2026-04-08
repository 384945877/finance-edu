"use client";

import Link from "next/link";
import { courses, getTotalModules } from "@/lib/course-data";
import { useProgress } from "@/lib/progress-store";

export default function Home() {
  const { getProgress } = useProgress();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, var(--color-brand-light) 0%, transparent 70%)" }}
        />
        <div className="mx-auto max-w-[800px] px-6 pt-20 pb-14 md:pt-32 md:pb-20 text-center">
          <p className="label-upper mb-3" style={{ color: "var(--color-brand-deep)" }}>
            90 个互动模块 &middot; 三级进阶 &middot; 免费
          </p>
          <h1 className="heading-display mx-auto max-w-2xl">
            理财冒险学院
          </h1>
          <p className="text-body-large mt-4 mx-auto max-w-xl" style={{ color: "var(--color-text-secondary)" }}>
            从零基础到财务自由，三个阶段带你系统掌握理财技能。
            <br className="hidden sm:inline" />
            选择适合你的课程，开始冒险。
          </p>
        </div>
      </section>

      {/* Course Cards */}
      <section className="section-padding">
        <div className="mx-auto max-w-[900px] grid gap-6 md:grid-cols-3">
          {courses.map((course) => {
            const progress = getProgress(course.id);
            const total = getTotalModules(course.id);
            return (
              <Link key={course.id} href={`/course/${course.id}`}
                className="card-featured group relative overflow-hidden transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                {/* Color accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: course.color }} />

                <div className="pt-6 pb-2 text-center">
                  <span className="text-4xl">{course.emoji}</span>
                  <div className="mt-3 text-xs font-bold px-2 py-0.5 rounded-full inline-block"
                    style={{ background: course.color + "20", color: course.color }}>
                    {course.level}
                  </div>
                  <h2 className="heading-card mt-2">{course.title}</h2>
                  <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                    {course.subtitle}
                  </p>
                  <p className="text-xs mt-3" style={{ color: "var(--color-text-muted)" }}>
                    {total} 个模块 &middot; {course.parts.length} 个部分
                  </p>

                  {/* Progress bar */}
                  <div className="mt-4 mx-auto max-w-[140px]">
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%`, background: course.color }} />
                    </div>
                    <span className="text-xs mt-1 block" style={{ color: "var(--color-text-muted)" }}>
                      {progress === 0 ? "尚未开始" : `已完成 ${progress}%`}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}