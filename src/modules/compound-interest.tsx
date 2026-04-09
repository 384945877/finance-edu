"use client";

import { useState, useMemo } from "react";
import Quiz from "@/components/Quiz";
import AnimatedNumber from "@/components/motion/AnimatedNumber";
import MiniLineChart from "@/components/motion/MiniLineChart";
import FlipCard from "@/components/motion/FlipCard";
import { useSound } from "@/lib/use-sound";

/* 互动组件：复利雪球模拟器（多模态升级版） */
function CompoundSnowball() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const { play } = useSound();

  const compound = Math.round(principal * Math.pow(1 + rate / 100, years));
  const simple = Math.round(principal * (1 + rate / 100 * years));
  const diff = compound - simple;

  /* 折线图数据 */
  const chartData = useMemo(() => {
    const pts: { label: string; value: number }[] = [];
    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 20))) {
      pts.push({ label: `${y}年`, value: Math.round(principal * Math.pow(1 + rate / 100, y)) });
    }
    if (pts[pts.length - 1]?.label !== `${years}年`) {
      pts.push({ label: `${years}年`, value: compound });
    }
    return pts;
  }, [principal, rate, years, compound]);

  /* 单利折线数据（对比用） */
  const simpleData = useMemo(() => {
    const pts: { label: string; value: number }[] = [];
    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 20))) {
      pts.push({ label: `${y}年`, value: Math.round(principal * (1 + rate / 100 * y)) });
    }
    if (pts[pts.length - 1]?.label !== `${years}年`) {
      pts.push({ label: `${years}年`, value: simple });
    }
    return pts;
  }, [principal, rate, years, simple]);

  const handleSliderChange = () => play("click");

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>复利雪球模拟器</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">初始本金：¥{principal.toLocaleString()}</label>
          <input type="range" min={1000} max={100000} step={1000} value={principal}
            onChange={e => { setPrincipal(+e.target.value); handleSliderChange(); }}
            className="w-full accent-[var(--color-brand)]" />
        </div>
        <div>
          <label className="text-sm font-medium">年化收益率：{rate}%</label>
          <input type="range" min={1} max={15} step={0.5} value={rate}
            onChange={e => { setRate(+e.target.value); handleSliderChange(); }}
            className="w-full accent-[var(--color-brand)]" />
        </div>
        <div>
          <label className="text-sm font-medium">投资年数：{years}年</label>
          <input type="range" min={1} max={40} step={1} value={years}
            onChange={e => { setYears(+e.target.value); handleSliderChange(); }}
            className="w-full accent-[var(--color-brand)]" />
        </div>
      </div>

      {/* 动画数字卡片 */}
      <div className="grid grid-cols-3 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>复利终值</div>
          <AnimatedNumber value={compound} prefix="¥" className="text-lg font-bold block"
            style={{ color: "var(--color-brand)" }} />
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>单利终值</div>
          <AnimatedNumber value={simple} prefix="¥" className="text-lg font-bold block" />
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>复利多赚</div>
          <AnimatedNumber value={diff} prefix="¥" className="text-lg font-bold block"
            style={{ color: "var(--color-brand-deep)" }} />
        </div>
      </div>

      {/* SVG 增长曲线对比 */}
      <div className="mt-5 rounded-xl p-3" style={{ background: "var(--color-gray-50)", border: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center gap-4 mb-2 text-[11px] font-medium" style={{ color: "var(--color-text-muted)" }}>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 rounded" style={{ background: "#22c55e" }} /> 复利</span>
          <span className="flex items-center gap-1"><span className="inline-block w-3 h-0.5 rounded" style={{ background: "#94a3b8" }} /> 单利</span>
        </div>
        <div className="relative">
          <MiniLineChart data={simpleData} width={340} height={100} color="#94a3b8" showDots={false} animate={false} />
          <div className="absolute inset-0">
            <MiniLineChart data={chartData} width={340} height={100} color="#22c55e" showDots showLabels />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompoundInterest() {
  return (
    <>
      <h2>爱因斯坦说的第八大奇迹</h2>
      <p>
        复利的公式很简单：<strong>利息会产生利息</strong>。第一年赚的利息，第二年也会帮你赚钱。这就像滚雪球——球越大，滚得越快。
      </p>

      {/* 翻转卡片：单利 vs 复利 */}
      <div className="grid grid-cols-2 gap-4 my-6">
        <FlipCard
          height={160}
          front={<><div className="text-2xl mb-2">📊</div><p className="text-sm font-bold">单利</p><p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>点击看真相</p></>}
          back={<><p className="text-sm font-bold" style={{ color: "#ef4444" }}>只有本金赚钱</p><p className="text-xs mt-2">1万 × 10% × 10年<br />= 每年赚1000<br />最终 = ¥20,000</p></>}
        />
        <FlipCard
          height={160}
          front={<><div className="text-2xl mb-2">🔄</div><p className="text-sm font-bold">复利</p><p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>点击看魔法</p></>}
          back={<><p className="text-sm font-bold" style={{ color: "#22c55e" }}>利息也在赚钱</p><p className="text-xs mt-2">1万 × (1.1)^10<br />= 利滚利10年<br />最终 = ¥25,937</p></>}
        />
      </div>

      <p>短期看差不多，但<strong>时间越长，差距越惊人</strong>。拉到30年，复利的结果可以是单利的好几倍。</p>

      <CompoundSnowball />

      <h2>复利的三个关键变量</h2>
      <ul>
        <li><strong>本金</strong> — 雪球的初始大小。越大起点越高</li>
        <li><strong>利率</strong> — 雪球滚动的坡度。收益率从5%提升到8%，30年差距巨大</li>
        <li><strong>时间</strong> — 最重要的变量！20岁开始vs 30岁开始，同样本金最终差一倍</li>
      </ul>

      <blockquote>
        复利的最大敌人是中断。坚持比起步晚重要，起步早比起步多重要。
      </blockquote>

      <Quiz
        question="小张22岁每月投500，小王32岁每月投1000，假设年化收益都是8%，到60岁谁更多？"
        options={[
          { label: "小王，因为每月投的多一倍", feedback: "虽然月投金额翻倍，但少了10年的复利时间，差距很大。" },
          { label: "小张，因为多了10年复利时间", feedback: "对！时间是复利最强大的变量。早开始10年的优势，金额翻倍都追不回来。", correct: true },
          { label: "差不多，互相抵消", feedback: "差很远。10年的复利时间差距远大于月投金额的差距。" },
        ]}
        explanation="这就是'时间的杠杆'。理财越早开始越好，哪怕金额小也要开始。"
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>复利 = 利息产生利息，时间越长越惊人</li>
          <li>三个关键变量：本金、利率、时间（时间最重要）</li>
          <li>早开始10年 &gt; 每月多投一倍</li>
          <li>复利的敌人是中断，坚持比金额重要</li>
          <li>从现在开始就是最好的时间</li>
        </ul>
      </div>
    </>
  );
}