"use client";

interface Props {
  data: number[];
  color: string;
  height?: number;
}

/** 纯 SVG 分时折线图 */
export default function MiniChart({ data, color, height = 120 }: Props) {
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center text-sm"
        style={{ height, color: "var(--color-text-muted)" }}>
        等待行情数据...
      </div>
    );
  }

  const width = 800;
  const padding = 4;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((p, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (p - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const polyline = points.join(" ");
  // 面积填充
  const areaPath = `M${points[0]} ${polyline.split(" ").slice(1).map(p => `L${p}`).join(" ")} L${width - padding},${height} L${padding},${height} Z`;

  return (
    <div className="w-full" style={{ height }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#grad-${color.replace("#", "")})`} />
        <polyline
          points={polyline}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}