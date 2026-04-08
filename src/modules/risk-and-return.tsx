"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动：风险收益天平 */
function RiskReturnScale() {
  const assets = [
    { name: "银行活期", risk: 1, ret: 0.3, color: "#60a5fa" },
    { name: "货币基金", risk: 1.5, ret: 1.8, color: "#34d399" },
    { name: "国债", risk: 2, ret: 2.5, color: "#a78bfa" },
    { name: "债券基金", risk: 3, ret: 4, color: "#fbbf24" },
    { name: "指数基金", risk: 5, ret: 8, color: "#f97316" },
    { name: "个股", risk: 8, ret: 12, color: "#ef4444" },
    { name: "加密货币", risk: 10, ret: 20, color: "#ec4899" },
  ];
  const [selected, setSelected] = useState(0);
  const a = assets[selected];

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x2696;&#xFE0F; 风险收益天平</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {assets.map((asset, i) => (
          <button key={asset.name} onClick={() => setSelected(i)}
            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
            style={{
              background: i === selected ? asset.color : "transparent",
              color: i === selected ? "#fff" : "var(--color-text-secondary)",
              border: `1px solid ${i === selected ? asset.color : "var(--border-subtle)"}`,
            }}>
            {asset.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>风险等级</div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${a.risk * 10}%`, background: a.color }} />
          </div>
          <div className="text-sm font-bold mt-1">{a.risk}/10</div>
        </div>
        <div>
          <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>预期年化收益</div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${a.ret * 5}%`, background: "var(--color-brand)" }} />
          </div>
          <div className="text-sm font-bold mt-1">{a.ret}%</div>
        </div>
      </div>
      <p className="text-xs mt-3" style={{ color: "var(--color-text-secondary)" }}>
        风险越高，可能的收益越高，但亏损的可能性也越大。没有"高收益零风险"的东西。
      </p>
    </div>
  );
}

export default function RiskAndReturn() {
  return (
    <>
      <h2>天下没有免费的午餐</h2>
      <p>
        如果有人告诉你<strong>\u201c保本年化15%\u201d</strong>——要么他在骗你，要么他自己也被骗了。金融世界有一条铁律：<strong>风险和收益是一对双胞胎</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x2696;&#xFE0F;</div>
        <h3>风险与收益的永恒关系</h3>
      </div>
      <ul>
        <li><strong>低风险低收益</strong>：银行存款、国债（2-3%）——稳，但跑不了多远</li>
        <li><strong>中等风险中等收益</strong>：债券基金、指数基金（4-10%）——波动能忍受，长期有回报</li>
        <li><strong>高风险高收益</strong>：个股、加密货币（可能翻倍也可能归零）——刺激，但你受得了吗？</li>
      </ul>

      <RiskReturnScale />

      <h2>你需要知道的三种风险</h2>
      <ul>
        <li><strong>市场风险</strong> — 整个市场下跌，所有人都亏。比如2008金融危机、2020疫情初期</li>
        <li><strong>个别风险</strong> — 某家公司/某个产品出问题。比如某P2P暴雷</li>
        <li><strong>通胀风险</strong> — 你的投资收益跑不赢物价上涨</li>
      </ul>

      <blockquote>
        投资不是消除风险，而是选择你能承受的风险，换取对应的回报。
      </blockquote>

      <Quiz
        question="有人推荐你一个'保本年化收益12%'的理财产品，你应该？"
        options={[
          { label: "赶紧买，收益真高", feedback: "太天真了！正规金融产品不允许承诺'保本'，12%收益意味着极高风险。大概率是骗局。" },
          { label: "高度警惕，很可能是骗局", feedback: "正确！保本+高收益几乎不存在。符合这个描述的通常是庞氏骗局或非法集资。", correct: true },
          { label: "先投一点试试水", feedback: "骗局的经典套路就是先让你赚小钱，然后让你追加大额投入。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>风险和收益成正比——没有"高收益零风险"</li>
          <li>了解三种风险：市场风险、个别风险、通胀风险</li>
          <li>"保本高收益"几乎等于骗局信号</li>
          <li>投资 = 选择你能承受的风险水平</li>
          <li>分散投资可以降低个别风险（但不能消除市场风险）</li>
        </ul>
      </div>

      <div className="card-featured mt-4" style={{ background: "var(--color-brand-light)" }}>
        <h3 style={{ marginTop: 0 }}>&#x1F389; 第三部分完成！</h3>
        <p>
          太棒了！你已经掌握了钱的核心规律：通胀在吃你的钱、复利在帮你赚钱、时间是最强大的变量、风险和收益相伴相生。
          下一站——<strong>认识投资工具</strong>，看看市面上到底有哪些东西可以让你的钱"动起来"。
        </p>
      </div>
    </>
  );
}