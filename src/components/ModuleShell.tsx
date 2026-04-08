"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress-store";
import { getNextModule, getPrevModule, getPartById, TOTAL_MODULES, type Module } from "@/lib/course-data";

interface ModuleShellProps {
  module: Module;
  children: React.ReactNode;
}

export default function ModuleShell({ module, children }: ModuleShellProps) {
  const { completeModule, isCompleted, getProgress } = useProgress();
  const next = getNextModule(module.id);
  const prev = getPrevModule(module.id);
  const part = getPartById(module.part);
  const completed = isCompleted(module.id);
  const progress = getProgress();

  return (
    <>
      {/* Top progress bar */}
      <div className="sticky top-[57px] z-40 border-b"
        style={{ borderColor: "var(--border-subtle)", background: "var(--color-bg)" }}>
        <div className="mx-auto max-w-[800px] px-6 py-2 flex items-center gap-3 text-xs">
          <span className="font-medium" style={{ color: "var(--color-text-muted)" }}>
            {module.id}/{TOTAL_MODULES}
          </span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "var(--color-brand)",
              }}
            />
          </div>
          <span className="font-medium" style={{ color: "var(--color-brand-deep)" }}>
            {progress}%
          </span>
        </div>
      </div>

      {/* Module header */}
      <section className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[800px] px-6 pt-10 pb-8 md:pt-16 md:pb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="label-upper" style={{ color: "var(--color-brand-deep)" }}>
              {part?.emoji} {part?.title}
            </span>
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
        </div>
      </section>

      {/* Complete & Navigate */}
      <section className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[800px] px-6 py-8 flex flex-col items-center gap-4">
          {!completed && (
            <button
              onClick={() => completeModule(module.id)}
              className="btn-brand text-base px-8 py-3"
            >
              完成本关 &check;
            </button>
          )}
          {completed && (
            <p className="text-sm font-medium" style={{ color: "var(--color-brand-deep)" }}>
              &check; 已完成
            </p>
          )}
          <div className="flex items-center gap-4 w-full justify-between mt-2">
            {prev ? (
              <Link href={`/learn/${prev.slug}`} className="btn-secondary text-sm">
                &larr; {prev.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/learn/${next.slug}`} className="btn-primary text-sm">
                {next.title} &rarr;
              </Link>
            ) : (
              <Link href="/" className="btn-brand text-sm">
                回到首页
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}