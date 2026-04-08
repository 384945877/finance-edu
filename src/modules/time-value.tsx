"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动：今天的钱 vs 未来的钱 */
function TimeValueCalc() {
  const [futureAmount, setFutureAmount] = useState(100000);
  const [rate, setRate] = useState(5);
  const years = [1, 3, 5, 10, 20];
  const pvs = years.map(y => ({
    year: y,
    pv: Math.round(futureAmount / Math.pow(1 + rate / 100, y)),
  }));

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>⏳ 未来的钱今天值多少？</h3>
      <label className="text-sm font-medium">未来金额：¥{futureAmount.toLocaleString()}</label>
      <input type="range" min={10000} max={500000} step={10000} value={futureAmount}
        onChange={e => setFutureAmount(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <label className="text-sm font-medium mt-2 block">折现率：{rate}%</label>
      <input type="range" min={1} max={12} step={0.5} value={rate}
        onChange={e => setRate(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <div className="flex gap-2 mt-4">
        {pvs.map(p => (
          <div key={p.year} className="flex-1 card-base p-2 text-center">
            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{p.year}年后的</div>
            <div className="text-xs font-bold" style={{ color: "var(--color-brand)" }}>¥{p.pv.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <p className="text-xs mt-2" style={{ color: "var(--color-text-secondary)" }}>
        也就是说，{pvs[4].year}年后的¥{futureAmount.toLocaleString()}，今天只值¥{pvs[4].pv.toLocaleString()}
      </p>
    </div>
  );
}

export default function TimeValue() {
  return (
    <>
      <h2>今天的1块钱 &gt; 明天的1块钱</h2>
      <p>
        如果有人问你：<strong>现在给你1万，还是1年后给你1万？</strong>你肯定选现在。为什么？因为现在的钱能做更多事——存起来有利息、投资能增值、物价还在涨。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">⏳</div>
        <h3>货币时间价值 (Time Value of Money)</h3>
      </div>
      <p>核心概念：<strong>同样数额的钱，越早拿到越值钱</strong>。这是整个金融世界的基石。</p>
      <ul>
        <li><strong>现值（PV）</strong>— 未来的钱折算到今天值多少</li>
        <li><strong>终值（FV）</strong>— 今天的钱在未来值多少（就是上一课的复利计算）</li>
        <li><strong>折现率</strong>— 把未来的钱"打折"到今天用的利率</li>
      </ul>

      <TimeValueCalc />

      <h2>时间价值在生活中的应用</h2>
      <ul>
        <li><strong>分期付款真的便宜吗？</strong>商家说"12期免息"，但你本可以拿那笔钱去投资赚收益</li>
        <li><strong>工资延期发放</strong>：迟发一个月的5000块，实际价值不到5000</li>
        <li><strong>提前还贷值不值？</strong>如果你的投资收益&gt;贷款利率，不提前还反而更划算</li>
      </ul>

      <blockquote>
        每一次"以后再说"，都是在让你的钱贬值。
      </blockquote>

      <Quiz
        question="朋友借了你1万块，说3年后还你1万。假设年通胀3%，你实际亏了多少？"
        options={[
          { label: "没亏，1万还是1万", feedback: "名义上没亏，但3年通胀让购买力缩水了约9%。" },
          { label: "亏了约900块的购买力", feedback: "正确！10000 \u00d7 (1-1/1.03\u00b3) \u2248 874，约亏900块购买力。借钱给别人不收利息=你在补贴对方。", correct: true },
          { label: "亏了3万", feedback: "没那么夸张，但确实在亏钱。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>今天的钱比未来的钱更值钱（货币时间价值）</li>
          <li>现值 = 未来的钱折算到今天</li>
          <li>无息借钱给别人 = 你在隐形补贴对方</li>
          <li>投资决策的核心：比较现在的成本和未来的收益</li>
          <li>尽早开始理财 = 充分利用时间价值</li>
        </ul>
      </div>
    </>
  );
}