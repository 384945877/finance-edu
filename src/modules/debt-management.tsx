"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动组件：债务优先级排序 */
function DebtPrioritizer() {
  const debts = [
    { name: "花呗", rate: 14.6, balance: 3000 },
    { name: "信用卡分期", rate: 18.0, balance: 8000 },
    { name: "京东白条", rate: 12.0, balance: 2000 },
    { name: "房贷", rate: 3.5, balance: 500000 },
  ];
  const [method, setMethod] = useState<"avalanche" | "snowball">("avalanche");
  const sorted = [...debts].sort((a, b) =>
    method === "avalanche" ? b.rate - a.rate : a.balance - b.balance
  );

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>🎯 债务还款优先级</h3>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMethod("avalanche")}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${method === "avalanche" ? "btn-brand" : "btn-secondary"}`}>
          雪崩法（先还高利率）
        </button>
        <button onClick={() => setMethod("snowball")}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${method === "snowball" ? "btn-brand" : "btn-secondary"}`}>
          雪球法（先还小额）
        </button>
      </div>
      <div className="space-y-2">
        {sorted.map((d, i) => (
          <div key={d.name} className="card-base p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
                style={{ background: i === 0 ? "var(--color-brand)" : "var(--border-subtle)", color: i === 0 ? "#0d0d0d" : "var(--color-text-muted)" }}>
                {i + 1}
              </span>
              <span className="font-medium text-sm">{d.name}</span>
            </div>
            <div className="text-right">
              <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>利率 {d.rate}%</div>
              <div className="text-sm font-bold">¥{d.balance.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs mt-3" style={{ color: "var(--color-text-secondary)" }}>
        {method === "avalanche"
          ? "雪崩法：数学上最省利息，优先攻克高利率债务。"
          : "雪球法：先还清小额获得成就感，心理上更容易坚持。"}
      </p>
    </div>
  );
}

export default function DebtManagement() {
  return (
    <>
      <h2>信用卡、花呗、白条——你在借谁的钱？</h2>
      <p>
        刷了5000块的信用卡分期12个月，每月才还400多，看起来没什么。但你知道<strong>实际年利率可能高达18%</strong>吗？
      </p>

      <div className="knowledge-card">
        <div className="card-icon">💳</div>
        <h3>好债 vs 坏债</h3>
      </div>
      <ul>
        <li><strong>好债</strong>：利率低 + 能帮你增值。比如低利率房贷（3-4%），你用别人的钱住着房子</li>
        <li><strong>坏债</strong>：利率高 + 用于消费。比如信用卡分期买手机（利率12-18%），买完就贬值了</li>
      </ul>

      <blockquote>判断标准很简单：这笔借的钱，能不能帮你赚回比利息更多的钱？</blockquote>

      <h2>两种还债策略</h2>
      <div className="knowledge-card">
        <div className="card-icon">⚔️</div>
        <h3>雪崩法 vs 雪球法</h3>
      </div>
      <ul>
        <li><strong>雪崩法</strong>：先还利率最高的 → 数学上最优，总利息最少</li>
        <li><strong>雪球法</strong>：先还金额最小的 → 心理上最爽，快速消灭一笔笔债务</li>
      </ul>
      <p>两种方法都比"只还最低还款"好一万倍。选哪个取决于你更需要省钱还是需要成就感。</p>

      <DebtPrioritizer />

      <h2>最低还款的陷阱</h2>
      <p>
        信用卡账单上写着<strong>{"\u201c"}最低还款额¥500{"\u201d"}</strong>，看起来很贴心。但陷阱在于：
      </p>
      <ul>
        <li>剩余欠款按<strong>全额</strong>计利息（不是剩余部分）</li>
        <li>利息按天算，越滚越多</li>
        <li>一笔1万的账单，只还最低，可能要还<strong>2-3年</strong>，多付几千利息</li>
      </ul>

      <Quiz
        question="小美有3笔债：花呗3000（利率14.6%）、白条2000（12%）、信用卡8000（18%）。用雪崩法应该先还哪个？"
        options={[
          { label: "白条2000，金额最小", feedback: "那是雪球法的思路。雪崩法看的是利率，不是金额。" },
          { label: "信用卡8000，利率最高18%", feedback: "正确！雪崩法 = 先攻克利率最高的，总利息最少。", correct: true },
          { label: "花呗3000，因为最常用", feedback: "还款优先级和使用频率无关，要看利率成本。" },
        ]}
      />

      <Quiz
        question="以下哪种情况属于'好债'？"
        options={[
          { label: "分期买最新款iPhone", feedback: "手机买完就贬值，还要付12-18%的利息，典型坏债。" },
          { label: "3.5%房贷买了增值潜力的房子", feedback: "对！利率低+资产可能增值，是典型的好债。", correct: true },
          { label: "借钱去旅游，活在当下", feedback: "体验很重要，但借钱消费且付高利息，不是好债。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>分清好债（低利率+增值）和坏债（高利率+消费）</li>
          <li>雪崩法省钱，雪球法省心，都比只还最低好</li>
          <li>信用卡分期的实际年利率远高于你以为的</li>
          <li>最低还款是个温柔的陷阱</li>
          <li>有高利率债务时，先还债再投资</li>
        </ul>
      </div>
    </>
  );
}