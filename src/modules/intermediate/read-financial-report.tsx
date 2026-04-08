"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

function ReportExplorer() {
  const [tab, setTab] = useState<"income" | "balance" | "cash">("income");
  const tabs = [
    { key: "income" as const, label: "利润表", emoji: "💰", items: ["营收 — 公司卖了多少钱", "毛利率 — 产品赚不赚钱", "净利润 — 最终落袋多少", "扣非净利 — 去掉一次性收入后的真实利润"] },
    { key: "balance" as const, label: "资产负债表", emoji: "📋", items: ["总资产 — 公司有多少家底", "负债率 — 借了多少钱", "应收账款 — 有多少钱还没收回", "商誉 — 高价并购的溢价，可能爆雷"] },
    { key: "cash" as const, label: "现金流量表", emoji: "💧", items: ["经营现金流 — 做生意真的收到钱了吗", "投资现金流 — 花了多少钱扩张", "筹资现金流 — 借了多少/还了多少", "自由现金流 — 公司真正能自由支配的钱"] },
  ];
  const active = tabs.find(t => t.key === tab)!;
  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x1F4D1; 三张表速查器</h3>
      <div className="flex gap-2 mb-4">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: tab === t.key ? "var(--color-brand)" : "var(--color-gray-50)", color: tab === t.key ? "#0d0d0d" : "var(--color-text-muted)" }}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {active.items.map((item, i) => (
          <li key={i} className="text-sm p-3 rounded-xl" style={{ background: "var(--color-gray-50)" }}>
            <strong>{item.split(" — ")[0]}</strong> <span style={{ color: "var(--color-text-secondary)" }}>— {item.split(" — ")[1]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ReadFinancialReport() {
  return (
    <>
      <h2>财报 = 公司的体检报告</h2>
      <p>
        每家上市公司每个季度都要披露财报。读懂财报不是为了当会计，而是为了<strong>判断一家公司到底赚不赚钱、健不健康</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F4CA;</div>
        <h3>三张表是什么？</h3>
      </div>
      <ul>
        <li><strong>利润表</strong> — 公司这段时间赚了多少（收入 - 成本 = 利润）</li>
        <li><strong>资产负债表</strong> — 公司现在有什么家底（资产 = 负债 + 股东权益）</li>
        <li><strong>现金流量表</strong> — 公司真的收到钱了吗（利润可以造假，现金流不会说谎）</li>
      </ul>

      <ReportExplorer />

      <h2>财报避雷指南</h2>
      <ul>
        <li><strong>营收增长但现金流为负</strong> — 可能在虚增收入</li>
        <li><strong>应收账款飙升</strong> — 卖了东西但没收到钱，小心坏账</li>
        <li><strong>商誉占总资产比重高</strong> — 高价并购的泡沫，可能大幅减值</li>
        <li><strong>经常性 &ldquo;非经常性损益&rdquo;</strong> — 靠卖房卖地撑利润，主业不行了</li>
      </ul>

      <blockquote>
        看一家公司，先看现金流量表。利润可以调节，但现金流骗不了人。
      </blockquote>

      <Quiz
        question="一家公司净利润连续3年增长，但经营现金流持续为负。你怎么看？"
        options={[
          { label: "利润增长就是好公司，大胆买入", feedback: "利润可以通过会计手段调节。现金流为负说明赚的钱没真的收到手，要警惕。" },
          { label: "现金流为负是危险信号，需要深入调查", feedback: "没错！净利润增长但现金流为负，很可能是应收账款堆积或收入质量差。", correct: true },
          { label: "这很正常，不用在意", feedback: "持续的利润-现金流背离是最常见的暴雷前兆之一，绝对不能忽视。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>财报有三张核心表：利润表、资产负债表、现金流量表</li>
          <li>利润表看赚多少，资产负债表看家底，现金流表看真实收款</li>
          <li>现金流量表最难造假，是判断公司质量的关键</li>
          <li>注意应收账款暴涨、商誉过高、利润与现金流背离等雷区</li>
        </ul>
      </div>
    </>
  );
}