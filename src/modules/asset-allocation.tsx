"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动：资产配置饼图 */
function AllocationPie() {
  const profiles = [
    { name: "保守型", stocks: 20, bonds: 50, cash: 25, gold: 5, color: "#60a5fa" },
    { name: "稳健型", stocks: 50, bonds: 30, cash: 15, gold: 5, color: "#34d399" },
    { name: "进取型", stocks: 70, bonds: 15, cash: 10, gold: 5, color: "#f97316" },
  ];
  const [sel, setSel] = useState(1);
  const p = profiles[sel];
  const items = [
    { label: "股票/指数基金", pct: p.stocks, color: "#ef4444" },
    { label: "债券/债基", pct: p.bonds, color: "#60a5fa" },
    { label: "现金/货基", pct: p.cash, color: "#34d399" },
    { label: "黄金", pct: p.gold, color: "#fbbf24" },
  ];

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x1F355; 资产配置方案</h3>
      <div className="flex gap-2 mb-4">
        {profiles.map((pr, i) => (
          <button key={pr.name} onClick={() => setSel(i)}
            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
            style={{ background: i === sel ? pr.color : "transparent", color: i === sel ? "#fff" : "var(--color-text-secondary)", border: `1px solid ${i === sel ? pr.color : "var(--border-subtle)"}` }}>
            {pr.name}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xs w-24" style={{ color: "var(--color-text-secondary)" }}>{item.label}</span>
            <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.pct}%`, background: item.color }} />
            </div>
            <span className="text-sm font-bold w-10 text-right">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AssetAllocation() {
  return (
    <>
      <h2>唯一的"免费午餐"</h2>
      <p>
        诺贝尔经济学家说过：<strong>资产配置是投资中唯一的免费午餐</strong>。意思是：把钱分散到不同类型的资产里，可以在不降低预期收益的情况下降低风险。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F355;</div>
        <h3>为什么要分散？</h3>
      </div>
      <ul>
        <li>股票涨的时候，债券可能在跌；反过来也是</li>
        <li>把两个<strong>走势相反或不相关</strong>的资产组合在一起，整体波动就小了</li>
        <li>你不需要猜什么会涨——分散配置让你<strong>无论哪种行情都不会太惨</strong></li>
      </ul>

      <AllocationPie />

      <h2>经典配置公式</h2>
      <ul>
        <li><strong>股票比例 = 100 - 你的年龄</strong>（粗略估算。25岁 → 75%股票）</li>
        <li><strong>核心+卫星</strong>：80%放指数基金（核心），20%放你想尝试的（卫星）</li>
      </ul>

      <blockquote>
        资产配置决定了你90%的投资回报。选什么具体产品反而没那么重要。
      </blockquote>

      <Quiz
        question="研究表明，长期投资收益中，资产配置决定了大约多少？"
        options={[
          { label: "约30%", feedback: "远远低估了。资产配置的影响力比大多数人以为的大得多。" },
          { label: "约90%", feedback: "对！Brinson等人的研究表明，资产配置决定了约90%的回报差异。选股和择时的影响很小。", correct: true },
          { label: "约50%", feedback: "还是低估了。资产配置是最重要的投资决策。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>资产配置 = 把钱分散到不同类型的资产中</li>
          <li>分散可以降低风险而不牺牲收益（免费午餐）</li>
          <li>粗略公式：股票比例 = 100 - 年龄</li>
          <li>资产配置决定了90%的投资回报</li>
          <li>先定配置方案，再选具体产品</li>
        </ul>
      </div>
    </>
  );
}