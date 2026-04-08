"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress-store";
import { TOTAL_MODULES } from "@/lib/course-data";

export default function Navbar() {
  const { getProgress, completed } = useProgress();
  const progress = getProgress();

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur-md border-b"
      style={{ borderColor: "var(--border-subtle)" }}>
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight"
          style={{ color: "var(--color-text)" }}>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm"
            style={{ background: "var(--color-brand)", color: "#0d0d0d" }}>
            ¥
          </span>
          理财冒险
        </Link>

        {/* Center: progress */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-32 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: "var(--color-brand)" }} />
          </div>
          <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
            {completed.length}/{TOTAL_MODULES}
          </span>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{ color: "var(--color-text)" }}>
            地图
          </Link>
          <Link href="/learn/what-is-money" className="btn-primary text-xs px-4 py-2">
            {progress === 0 ? "开始" : "继续"}
          </Link>
        </div>
      </nav>
    </header>
  );
}