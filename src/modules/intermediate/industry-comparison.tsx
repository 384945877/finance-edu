"use client";

import Quiz from "@/components/Quiz";

const industries = [
  { name: "银行", pe: "4-8x", pb: "0.4-0.8x", roe: "10-14%", key: "负债率、不良率、净息差", color: "#3b82f6" },
  { name: "白酒", pe: "25-40x", pb: "8-15x", roe: "25-35%", key: "毛利率、品牌溢价、产能", color: "#ef4444" },
  { name: "科技", pe: "30-80x", pb: "5-20x", roe: "15-30%", key: "研发投入、营收增速、用户数", color: "#8b5cf6" },
  { name: "地产", pe: "5-10x", pb: "0.3-1x", roe: "8-18%", key: "负债率、土储、销售回款", color: "#f97316" },
  { name: "医药", pe: "20-50x", pb: "3-10x", roe: "12-25%", key: "研发管线、集采影响、专利", color: "#22c55e" },
];

export default function IndustryComparison() {
  return (
    <>
      <h2>不同行业的估值天差地别</h2>
      <p>
        PE=10 在银行股里是高估，在科技股里是打折大甩卖。<strong>行业不同，估值体系完全不同</strong>，必须在同一个赛道内才能比较。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F50D;</div>
        <h3>为什么不能跨行业比估值？</h3>
      </div>
      <ul>
        <li><strong>成长性不同</strong> — 科技股增长快所以给高PE，银行增长慢所以PE低</li>
        <li><strong>商业模式不同</strong> — 轻资产公司（互联网）PB高，重资产公司（银行）PB低</li>
        <li><strong>周期不同</strong> — 周期股在盈利高峰时PE反而低，要反着看</li>
      </ul>

      <div className="card-featured">
        <h3 style={{ marginTop: 0 }}>&#x1F4CA; 行业估值速查表</h3>
        <div className="space-y-2">
          {industries.map(ind => (
            <div key={ind.name} className="p-3 rounded-xl" style={{ background: "var(--color-gray-50)" }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: ind.color }}>{ind.name}</span>
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>PE {ind.pe}</span>
              </div>
              <div className="flex gap-4 mt-1 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                <span>PB {ind.pb}</span>
                <span>ROE {ind.roe}</span>
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>关键指标: {ind.key}</div>
            </div>
          ))}
        </div>
      </div>

      <h2>行业对比三步法</h2>
      <ul>
        <li><strong>第一步</strong> — 确定公司所在行业，找到3-5家同行对标公司</li>
        <li><strong>第二步</strong> — 对比PE/PB/ROE，看谁被高估谁被低估</li>
        <li><strong>第三步</strong> — 找到差异原因：是增长更快？利润更高？还是有什么风险？</li>
      </ul>

      <Quiz
        question="某科技公司PE=25，同行业平均PE=50。最可能的原因是？"
        options={[
          { label: "这家公司被严重低估了，赶紧买", feedback: "不能只看PE低就下结论，可能是增速放缓、有诉讼风险等原因导致估值折价。" },
          { label: "可能是增速放缓或有风险因素导致折价", feedback: "对！PE低于行业均值不一定是低估，需要搞清楚为什么市场给它低估值。", correct: true },
          { label: "科技公司PE都很高，25倍说明不是好公司", feedback: "PE=25在科技行业确实偏低，但原因很关键——可能是机会也可能是陷阱。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>估值只能在同行业内对比</li>
          <li>不同行业有不同的估值中枢</li>
          <li>PE低于行业平均不一定是低估，要找原因</li>
          <li>行业对比三步法：找同行 → 比指标 → 找差异</li>
        </ul>
      </div>
    </>
  );
}