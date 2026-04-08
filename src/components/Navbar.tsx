"use client";

import Link from "next/link";

export default function Navbar() {
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
          理财学院
        </Link>

        {/* Right: course links + trade */}
        <div className="flex items-center gap-3">
          <Link href="/course/beginner" className="text-xs font-medium px-2 py-1 rounded-lg transition-colors hover:bg-[var(--border-subtle)]"
            style={{ color: "#18E299" }}>
            小白
          </Link>
          <Link href="/course/intermediate" className="text-xs font-medium px-2 py-1 rounded-lg transition-colors hover:bg-[var(--border-subtle)]"
            style={{ color: "#f97316" }}>
            进阶
          </Link>
          <Link href="/course/advanced" className="text-xs font-medium px-2 py-1 rounded-lg transition-colors hover:bg-[var(--border-subtle)]"
            style={{ color: "#8b5cf6" }}>
            高阶
          </Link>
          <div className="w-px h-4" style={{ background: "var(--border-medium)" }} />
          <Link href="/trade" className="text-xs font-semibold px-3 py-1 rounded-lg transition-colors"
            style={{ background: "var(--color-brand)", color: "#0d0d0d" }}>
            模拟交易
          </Link>
          <Link href="/trade/strategies" className="text-xs font-medium px-2 py-1 rounded-lg transition-colors hover:bg-[var(--border-subtle)]"
            style={{ color: "var(--color-text-secondary)" }}>
            量化策略
          </Link>
        </div>
      </nav>
    </header>
  );
}