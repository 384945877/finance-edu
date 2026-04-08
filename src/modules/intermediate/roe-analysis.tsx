"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

function ROECalculator() {
  const [netProfit, setNetProfit] = useState(50);
  const [equity, setEquity] = useState(200);
  const roe = equity > 0 ? ((netProfit / equity) * 100).toFixed(1) : "0";
  const level = Number(roe) >= 20 ? "优秀" : Number(roe) >= 15 ? "良好" : Number(roe) >= 10 ? "一般" : "较差";
  const color = Number(roe) >= 15 ? "#22c55e" : Number(roe) >= 10 ? "#f97316" : "#ef4444";
  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x1F3AF; ROE 计算器</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">净利润: {netProfit}亿</label>
          <input type="range" min={1} max={200} step={1} value={netProfit} onChange={e => setNetProfit(+e.target.value)} className="w-full accent-[#f97316]" />
        </div>
        <div>
          <label className="text-sm font-medium">净资产: {equity}亿</label>
          <input type="range" min={10} max={1000} step={10} value={equity} onChange={e => setEquity(+e.target.value)} className="w-full accent-[#f97316]" />
        </div>
      </div>
      <div className="text-center mt-4 p-4 rounded-xl" style={{ background: "var(--color-gray-50)" }}>
        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>ROE（净资产收益率）</div>
        <div className="text-3xl font-bold mt-1" style={{ color }}>{roe}%</div>
        <div className="text-xs font-medium mt-1" style={{ color }}>{level}</div>
      </div>
    </div>
  );
}

export default function RoeAnalysis() {
  return (
    <>
      <h2>巴菲特最爱的指标</h2>
      <p>
        巴菲特说过：&ldquo;如果只能看一个指标，那就是 <strong>ROE</strong>。&rdquo; ROE = 净利润 / 净资产，衡量的是<strong>股东的钱用得有多高效</strong>。
      </p>
      <div className="knowledge-card">
        <div className="card-icon">&#x1F3AF;</div>
        <h3>ROE 怎么理解？</h3>
      </div>
      <ul>
        <li>ROE 15% = 股东每投100块钱，公司一年赚15块</li>
        <li><strong>连续5年 ROE &gt; 15%</strong> 的公司，通常是优质公司</li>
        <li>巴菲特选股的底线：ROE 连续10年 &gt; 20%</li>
      </ul>

      <ROECalculator />

      <h2>ROE 的陷阱</h2>
      <ul>
        <li><strong>高杠杆拉高 ROE</strong> — 公司疯狂借债也能让ROE很高，但风险巨大</li>
        <li><strong>杜邦分析</strong> — 把ROE拆成利润率 &times; 周转率 &times; 杠杆率，看清是靠什么赚的</li>
        <li><strong>一次性收益</strong> — 卖了一栋楼导致当年ROE暴涨，不可持续</li>
      </ul>

      <blockquote>
        看ROE，要看的是&ldquo;持续性&rdquo;。偶尔高一年不算，连续多年稳定在15%以上才是真本事。
      </blockquote>

      <Quiz
        question="两家公司ROE都是25%。A公司负债率30%，B公司负债率85%。你选哪个？"
        options={[
          { label: "选B，反正ROE一样", feedback: "B的高ROE是靠高杠杆撑起来的，一旦经济下行债务风险极大。" },
          { label: "选A，低负债的高ROE更健康", feedback: "对！同样的ROE，低杠杆说明是靠真实盈利能力赚来的，含金量更高。", correct: true },
          { label: "两个都不选", feedback: "A公司低负债高ROE，是非常优质的指标组合，值得深入研究。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>ROE = 净利润/净资产，衡量股东资金使用效率</li>
          <li>连续5年以上 ROE &gt; 15% 是优质公司的标志</li>
          <li>用杜邦分析拆解ROE来源：利润率、周转率、杠杆率</li>
          <li>高杠杆拉高的ROE要警惕</li>
        </ul>
      </div>
    </>
  );
}