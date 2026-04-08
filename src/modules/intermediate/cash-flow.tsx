"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

function CashFlowChecker() {
  const [oper, setOper] = useState(80);
  const [invest, setInvest] = useState(-30);
  const [finance, setFinance] = useState(-20);
  const free = oper + invest;
  const net = oper + invest + finance;
  const verdict = oper > 0 && free > 0 ? "现金奶牛型，优质" : oper > 0 && free < 0 ? "扩张期，需关注回报" : "经营现金流为负，危险信号";
  const color = oper > 0 && free > 0 ? "#22c55e" : oper > 0 ? "#f97316" : "#ef4444";
  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x1F4A7; 现金流体检器</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">经营现金流: {oper}亿</label>
          <input type="range" min={-50} max={200} step={5} value={oper} onChange={e => setOper(+e.target.value)} className="w-full accent-[#22c55e]" />
        </div>
        <div>
          <label className="text-sm font-medium">投资现金流: {invest}亿</label>
          <input type="range" min={-100} max={50} step={5} value={invest} onChange={e => setInvest(+e.target.value)} className="w-full accent-[#f97316]" />
        </div>
        <div>
          <label className="text-sm font-medium">筹资现金流: {finance}亿</label>
          <input type="range" min={-100} max={100} step={5} value={finance} onChange={e => setFinance(+e.target.value)} className="w-full accent-[#8b5cf6]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>自由现金流</div>
          <div className="text-xl font-bold" style={{ color: free >= 0 ? "#22c55e" : "#ef4444" }}>{free}亿</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>诊断结论</div>
          <div className="text-sm font-bold mt-1" style={{ color }}>{verdict}</div>
        </div>
      </div>
    </div>
  );
}

export default function CashFlow() {
  return (
    <>
      <h2>利润可以造假，现金流不会</h2>
      <p>
        利润表上写着&ldquo;赚了10亿&rdquo;，但如果钱都没收回来，那就是纸面富贵。<strong>现金流量表</strong>告诉你公司真的收到了多少真金白银。
      </p>
      <div className="knowledge-card">
        <div className="card-icon">&#x1F4A7;</div>
        <h3>自由现金流（FCF）是核心</h3>
      </div>
      <ul>
        <li><strong>自由现金流 = 经营现金流 + 投资现金流</strong></li>
        <li>FCF &gt; 0 = 公司赚的钱扣掉扩张投资后还有剩余，可以分红/回购/还债</li>
        <li>FCF 持续为负 = 公司在烧钱，靠融资续命</li>
        <li>理想公司：经营现金流强劲，投资适度，筹资现金流为负（在还钱或分红）</li>
      </ul>

      <CashFlowChecker />

      <Quiz
        question="一家公司经营现金流100亿，投资现金流-120亿，筹资现金流+50亿。你怎么判断？"
        options={[
          { label: "赚钱能力很强，没问题", feedback: "经营现金流确实强，但投资远超经营所得，还需要借钱补缺口，扩张比较激进。" },
          { label: "扩张激进，需要关注投资回报率", feedback: "对！投资超过经营所得说明在大幅扩张，必须关注这些投资能不能带来回报。", correct: true },
          { label: "在烧钱，很危险", feedback: "经营现金流100亿说明主业是赚钱的，不算烧钱，但扩张节奏需要关注。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>现金流量表分三部分：经营、投资、筹资</li>
          <li>自由现金流 = 经营现金流 + 投资现金流，是最核心的指标</li>
          <li>FCF 持续为正的公司才有真正的&ldquo;赚钱能力&rdquo;</li>
          <li>利润与现金流长期背离是暴雷前兆</li>
        </ul>
      </div>
    </>
  );
}