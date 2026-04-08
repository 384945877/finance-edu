"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动：租vs买计算器 */
function RentBuyCalc() {
  const [price, setPrice] = useState(200);
  const [rent, setRent] = useState(3000);
  const downPayment = price * 10000 * 0.3;
  const loanAmount = price * 10000 * 0.7;
  const monthlyPayment = Math.round(loanAmount * 0.004 * Math.pow(1.004, 360) / (Math.pow(1.004, 360) - 1));
  const rentYears = Math.round(downPayment / rent / 12);

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x1F3E0; 租vs买速算</h3>
      <label className="text-sm font-medium">房价总价：{price}万</label>
      <input type="range" min={50} max={800} step={10} value={price}
        onChange={e => setPrice(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <label className="text-sm font-medium mt-2 block">月租金：¥{rent.toLocaleString()}</label>
      <input type="range" min={1000} max={10000} step={500} value={rent}
        onChange={e => setRent(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <div className="grid grid-cols-3 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>首付30%</div>
          <div className="text-sm font-bold">¥{(downPayment / 10000).toFixed(0)}万</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>月供(30年)</div>
          <div className="text-sm font-bold">¥{monthlyPayment.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>首付够租</div>
          <div className="text-sm font-bold" style={{ color: "var(--color-brand)" }}>{rentYears}年</div>
        </div>
      </div>
    </div>
  );
}

export default function RentVsBuy() {
  return (
    <>
      <h2>人生最大的一笔消费决策</h2>
      <p>
        买房可能是你做过的<strong>金额最大的决定</strong>。但"一定要买房"不是真理，租房也不是浪费钱。关键是<strong>算清楚账</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F3E0;</div>
        <h3>买房的真实成本</h3>
      </div>
      <ul>
        <li><strong>首付</strong> — 通常房价的30%，一线城市可能意味着100万+</li>
        <li><strong>月供</strong> — 30年房贷，每月还款占收入的30-50%</li>
        <li><strong>总利息</strong> — 30年下来，利息可能和本金差不多（等于买了两套房）</li>
        <li><strong>机会成本</strong> — 首付如果拿去投资，30年后可能翻好几倍</li>
      </ul>

      <RentBuyCalc />

      <h2>什么时候该买？</h2>
      <ul>
        <li>有稳定收入且月供不超过收入的<strong>30%</strong></li>
        <li>有足够的首付且还剩6个月应急基金</li>
        <li>计划在这个城市<strong>至少住5-10年</strong></li>
        <li>不是因为"大家都在买"而买</li>
      </ul>

      <blockquote>
        买房是一笔投资+一种生活方式选择。不要只看房价涨跌，还要看你的现金流能不能支撑。
      </blockquote>

      <Quiz
        question="小郑月薪1.5万，存了30万，想在二线城市买200万的房。他准备好了吗？"
        options={[
          { label: "准备好了，首付够了就能买", feedback: "首付60万，他只有30万，还差一半。而且买房后应急基金也没了。" },
          { label: "还没准备好，首付不够且没有足够缓冲", feedback: "对！首付差一半，而且买房后不应该清空所有积蓄。继续攒钱+投资。", correct: true },
          { label: "不管准备没准备，趁早买就对了", feedback: "不量力而行买房，一旦收入波动就可能断供。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>买房的真实成本远高于房价（利息+机会成本）</li>
          <li>月供不超过收入30%，且保留应急基金</li>
          <li>租房不是浪费钱，要算总账</li>
          <li>计划长期居住才值得买</li>
          <li>不因为社会压力盲目买房</li>
        </ul>
      </div>
    </>
  );
}