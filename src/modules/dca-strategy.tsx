"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动：定投模拟器 */
function DCASimulator() {
  const [monthly, setMonthly] = useState(1000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(8);

  // 定投终值公式: FV = PMT * ((1+r)^n - 1) / r * (1+r)
  const r = rate / 100 / 12;
  const n = years * 12;
  const fv = Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const totalInvest = monthly * n;
  const profit = fv - totalInvest;

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x1F4C5; 定投收益模拟器</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">每月定投：¥{monthly.toLocaleString()}</label>
          <input type="range" min={100} max={5000} step={100} value={monthly}
            onChange={e => setMonthly(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
        </div>
        <div>
          <label className="text-sm font-medium">坚持年数：{years}年</label>
          <input type="range" min={1} max={30} step={1} value={years}
            onChange={e => setYears(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
        </div>
        <div>
          <label className="text-sm font-medium">年化收益率：{rate}%</label>
          <input type="range" min={3} max={12} step={0.5} value={rate}
            onChange={e => setRate(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>总投入</div>
          <div className="text-lg font-bold">¥{totalInvest.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>最终价值</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand)" }}>¥{fv.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>收益</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand-deep)" }}>¥{profit.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default function DCAStrategy() {
  return (
    <>
      <h2>最适合普通人的投资方法</h2>
      <p>
        定投 = <strong>每月固定时间买固定金额的基金</strong>。不择时、不选股、不焦虑。设好自动扣款，剩下的交给时间。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F4C5;</div>
        <h3>为什么定投有效？</h3>
      </div>
      <ul>
        <li><strong>天然低买高卖</strong> — 价格低时同样的钱买更多份额，价格高时买更少。长期下来平均成本被拉低</li>
        <li><strong>消除择时焦虑</strong> — 不用猜什么时候入场，每月固定买就行</li>
        <li><strong>强制储蓄</strong> — 自动扣款，不给自己花掉的机会</li>
        <li><strong>门槛极低</strong> — 每月100块就能开始</li>
      </ul>

      <DCASimulator />

      <blockquote>
        定投的关键不是"什么时候开始"，而是"开始之后不要停"。
      </blockquote>

      <Quiz
        question="定投最适合搭配什么类型的基金？"
        options={[
          { label: "货币基金", feedback: "货基波动太小，定投的'低买多份'优势发挥不出来。" },
          { label: "指数基金", feedback: "对！指数基金有足够的波动让定投发挥均摊成本的优势，且长期向上。", correct: true },
          { label: "单只个股", feedback: "个股风险太大，可能归零。定投应该选分散的品种。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>定投 = 固定时间买固定金额，不择时</li>
          <li>天然实现低买高卖，平均成本被拉低</li>
          <li>最适合搭配指数基金</li>
          <li>关键是坚持不停，时间越长效果越好</li>
          <li>每月100块就能开始</li>
        </ul>
      </div>
    </>
  );
}