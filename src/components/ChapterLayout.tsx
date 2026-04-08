import Link from "next/link";

interface ChapterLayoutProps {
  chapter: string;       // e.g. "第一章"
  title: string;
  description: string;
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  children: React.ReactNode;
}

export default function ChapterLayout({
  chapter,
  title,
  description,
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
  children,
}: ChapterLayoutProps) {
  return (
    <>
      {/* Chapter Hero */}
      <section className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[800px] px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <p className="label-upper mb-3" style={{ color: "var(--color-brand-deep)" }}>
            {chapter}
          </p>
          <h1 className="heading-section">{title}</h1>
          <p className="text-body-large mt-4" style={{ color: "var(--color-text-secondary)" }}>
            {description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-[800px] prose-content">
          {children}
        </div>
      </section>

      {/* Chapter Navigation */}
      <section className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[800px] px-6 py-8 flex items-center justify-between">
          {prevHref ? (
            <Link href={prevHref} className="btn-secondary text-sm">
              &larr; {prevLabel}
            </Link>
          ) : (
            <span />
          )}
          {nextHref ? (
            <Link href={nextHref} className="btn-primary text-sm">
              {nextLabel} &rarr;
            </Link>
          ) : (
            <Link href="/" className="btn-brand text-sm">
              回到首页
            </Link>
          )}
        </div>
      </section>
    </>
  );
}