"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动组件：通胀时间机器 */
function InflationMachine() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(3);
  const years = [5, 10, 20, 30];
  const results = years.map(y => ({
    year: y,
    nominal: amount,
    real: Math.round(amount / Math.pow(1 + rate / 100, y)),
  }));

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>⏰ 通胀时间机器</h3>
      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        看看你现在的钱，在未来实际能买到多少东西
      </p>

      <label className="text-sm font-medium">当前金额：¥{amount.toLocaleString()}</label>
      <input type="range" min={1000} max={100000} step={1000} value={amount}
        onChange={e => setAmount(+e.target.value)} className="w-full accent-[var(--color-brand)]" />

      <label className="text-sm font-medium mt-3 block">年通胀率：{rate}%</label>
      <input type="range" min={1} max={8} step={0.5} value={rate}
        onChange={e => setRate(+e.target.value)} className="w-full accent-[var(--color-brand)]" />

      <div className="grid grid-cols-4 gap-2 mt-4 text-center">
        {results.map(r => (
          <div key={r.year} className="card-base p-3">
            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{r.year}年后</div>
            <div className="text-sm font-bold" style={{ color: r.real < amount * 0.5 ? "#ef4444" : "var(--color-brand-deep)" }}>
              ¥{r.real.toLocaleString()}
            </div>
            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              缩水{Math.round((1 - r.real / amount) * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Inflation() {
  return (
    <>
      <h2>你的钱每天都在"蒸发"</h2>
      <p>
        2005年一碗牛肉面8块，现在要25块。你的工资涨了，但<strong>物价也涨了</strong>。这就是通货膨胀——钱的购买力随时间下降。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">📉</div>
        <h3>通胀到底是什么？</h3>
      </div>
      <p>
        简单说：<strong>同样的钱能买到的东西越来越少</strong>。中国近20年的平均通胀率大约在2-3%，但实际感受可能更高（房价、教育、医疗涨幅远超CPI）。
      </p>

      <InflationMachine />

      <h2>通胀对你意味着什么？</h2>
      <ul>
        <li><strong>存银行活期</strong>（利率0.2-0.3%）= 实际在亏钱。通胀3%，你存10万一年"隐形亏损"约2700</li>
        <li><strong>必须让钱"增长"</strong>，至少要跑赢通胀，你的财富才是真的在增长</li>
        <li><strong>工资不涨 = 变相降薪</strong>。如果你的工资3年没涨，实际购买力已经降了近10%</li>
      </ul>

      <blockquote>
        通胀是一种隐形税——政府没从你口袋拿走一分钱，但你的钱确实变少了。
      </blockquote>

      <h2>怎么跑赢通胀？</h2>
      <div className="knowledge-card">
        <div className="card-icon">🏃</div>
        <h3>理财的第一个目标</h3>
      </div>
      <p>
        在你学会投资之前，<strong>跑赢通胀</strong>是最基础的目标。目前通胀约3%，也就是说你的钱每年至少要增长3%才算"没亏"。
      </p>
      <ul>
        <li>银行活期（0.2%）❌ 完全跑不赢</li>
        <li>货币基金（1.5-2%）🔶 接近但不够</li>
        <li>国债/定期（2-3%）✅ 勉强打平</li>
        <li>债券基金（3-5%）✅ 小幅跑赢</li>
        <li>指数基金长期年化（8-10%）✅✅ 远超通胀</li>
      </ul>

      <Quiz
        question="小李把10万块存银行活期（年利率0.25%），通胀率3%。一年后他的钱实际怎么样了？"
        options={[
          { label: "赚了250块利息，赚到了", feedback: "名义上多了250，但物价涨了3%，实际购买力少了约2750。" },
          { label: "虽然多了250利息，但购买力其实下降了约2750", feedback: "对！实际收益 = 名义利率 - 通胀率 = 0.25% - 3% = -2.75%，亏了。", correct: true },
          { label: "钱放银行绝对安全，不可能亏", feedback: "名义上确实没亏，但通胀让你的实际购买力缩水了。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>通货膨胀 = 同样的钱能买到的东西越来越少</li>
          <li>中国近年通胀约2-3%，实际感受可能更高</li>
          <li>钱放着不动 = 每年隐形亏损2-3%</li>
          <li>理财的第一目标：跑赢通胀</li>
          <li>银行活期完全跑不赢，需要更有效的工具</li>
        </ul>
      </div>
    </>
  );
}