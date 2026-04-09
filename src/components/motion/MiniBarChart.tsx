"use client";

interface BarItem {
  label: string;
  value: number;
  color?: string;
}

interface MiniBarChartProps {
  data: BarItem[];
  width?: number;
  height?: number;
  animate?: boolean;
  showValues?: boolean;
  className?: string;
}

/** 纯 SVG 迷你柱状图，带弹起动画 */
export default function MiniBarChart({
  data, width = 300, height = 140, animate = true, showValues = true, className,
}: MiniBarChartProps) {
  if (data.length === 0) return null;

  const pad = { top: showValues ? 20 : 8, right: 8, bottom: 22, left: 8 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const max = Math.max(...data.map(d => d.value), 1);
  const barGap = 6;
  const barWidth = Math.min((w - barGap * (data.length - 1)) / data.length, 40);
  const totalBarsWidth = barWidth * data.length + barGap * (data.length - 1);
  const offsetX = pad.left + (w - totalBarsWidth) / 2;

  return (
    <svg width={width} height={height} className={className}
      viewBox={`0 0 ${width} ${height}`}>
      {data.map((d, i) => {
        const barH = (d.value / max) * h;
        const x = offsetX + i * (barWidth + barGap);
        const y = pad.top + h - barH;
        const color = d.color ?? "var(--color-brand)";
        return (
          <g key={i}>
            {/* 柱子 */}
            <rect x={x} y={animate ? pad.top + h : y} width={barWidth} rx={4}
              height={animate ? 0 : barH} fill={color}
              style={animate ? {
                animation: `barGrow 0.6s ${i * 0.08}s ease-out forwards`,
                transformOrigin: `${x + barWidth / 2}px ${pad.top + h}px`,
              } : undefined}>
            </rect>
            {/* 数值 */}
            {showValues && (
              <text x={x + barWidth / 2} y={y - 4} textAnchor="middle"
                fill="var(--color-text-secondary)" fontSize={10} fontWeight={600}
                style={animate ? { opacity: 0, animation: `fadeIn 0.3s ${0.4 + i * 0.08}s forwards` } : undefined}>
                {d.value.toLocaleString()}
              </text>
            )}
            {/* 标签 */}
            <text x={x + barWidth / 2} y={height - 4} textAnchor="middle"
              fill="var(--color-text-muted)" fontSize={9}>
              {d.label}
            </text>
          </g>
        );
      })}
      <style>{`
        @keyframes barGrow { to { y: var(--bar-y); height: var(--bar-h); } }
        @keyframes fadeIn { to { opacity: 1; } }
      `}</style>
    </svg>
  );
}