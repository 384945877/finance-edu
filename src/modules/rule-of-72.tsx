"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动：72法则速算器 */
function Rule72Calc() {
  const [rate, setRate] = useState(6);
  const approx = Math.round(72 / rate * 10) / 10;
  const exact = Math.round(Math.log(2) / Math.log(1 + rate / 100) * 10) / 10;

  const presets = [
    { label: "银行活期 0.25%", rate: 0.25 },
    { label: "货基 1.5%", rate: 1.5 },
    { label: "债基 4%", rate: 4 },
    { label: "指数基金 8%", rate: 8 },
    { label: "沪深300均值 10%", rate: 10 },
  ];

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>🔢 72法则速算器</h3>
      <label className="text-sm font-medium">年收益率：{rate}%</label>
      <input type="range" min={0.5} max={15} step={0.5} value={rate}
        onChange={e => setRate(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <div className="grid grid-cols-2 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>72法则估算</div>
          <div className="text-xl font-bold" style={{ color: "var(--color-brand)" }}>{approx} 年翻倍</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>精确计算</div>
          <div className="text-xl font-bold">{exact} 年</div>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        {presets.map(p => (
          <button key={p.label} onClick={() => setRate(p.rate)}
            className="block w-full text-left text-xs px-3 py-2 rounded-lg transition-colors hover:bg-[var(--border-subtle)]"
            style={{ color: "var(--color-text-secondary)" }}>
            {p.label} → <strong>{Math.round(72 / p.rate * 10) / 10}年翻倍</strong>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function RuleOf72() {
  return (
    <>
      <h2>3秒算出你的钱多久翻倍</h2>
      <p>
        不用计算器，不用公式。只需要一个数字：<strong>72 &divide; 年收益率 = 翻倍年数</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🔢</div>
        <h3>72法则</h3>
      </div>
      <p>比如年收益8%：72 &divide; 8 = <strong>9年翻倍</strong>。年收益4%：72 &divide; 4 = <strong>18年翻倍</strong>。</p>
      <p>反过来也能用：想10年翻倍？72 &divide; 10 = 需要年收益 <strong>7.2%</strong>。</p>

      <Rule72Calc />

      <blockquote>
        72法则也适用于通胀：通胀3%，你的购买力大约24年缩水一半。
      </blockquote>

      <Quiz
        question="银行活期利率0.25%，你的钱多久能翻倍？"
        options={[
          { label: "大约30年", feedback: "72/0.25 = 288年，不是30年。" },
          { label: "大约288年", feedback: "对！所以放银行活期基本不可能翻倍。这就是为什么要学投资。", correct: true },
          { label: "大约72年", feedback: "那是收益率1%的情况。0.25%要更久。" },
        ]}
        explanation="这个数字很震撼吧？银行活期连跑赢通胀都做不到，更别说翻倍了。"
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>72 &divide; 年收益率 = 资产翻倍所需年数</li>
          <li>收益率8% → 9年翻倍；4% → 18年翻倍</li>
          <li>反向用：想X年翻倍 → 需要 72/X 的年收益率</li>
          <li>通胀也适用：3%通胀 → 24年购买力减半</li>
          <li>银行活期翻倍要288年——该行动了</li>
        </ul>
      </div>
    </>
  );
}