import Link from "next/link";

const chapters = [
  { label: "理财基础", href: "/basics" },
  { label: "投资入门", href: "/investing" },
  { label: "风险与收益", href: "/risk-return" },
  { label: "资产配置", href: "/asset-allocation" },
];

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-semibold tracking-tight">理财学堂</p>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              从零开始，系统学习个人理财知识。
            </p>
          </div>

          {/* Chapters */}
          <div>
            <p className="label-upper mb-3" style={{ color: "var(--color-text-muted)" }}>课程章节</p>
            <ul className="flex flex-col gap-2">
              {chapters.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm font-medium hover:underline"
                    style={{ color: "var(--color-text-secondary)" }}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <p className="label-upper mb-3" style={{ color: "var(--color-text-muted)" }}>免责声明</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              本站内容仅供教育参考，不构成任何投资建议。投资有风险，入市需谨慎。请根据自身情况做出独立判断。
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-xs"
          style={{ borderColor: "var(--border-subtle)", color: "var(--color-text-muted)" }}>
          &copy; {new Date().getFullYear()} 理财学堂 &middot; 仅供学习交流
        </div>
      </div>
    </footer>
  );
}