"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动：养老金计算器 */
function RetirementCalc() {
  const [age, setAge] = useState(25);
  const [monthly, setMonthly] = useState(2000);
  const [rate, setRate] = useState(7);
  const years = 60 - age;
  const r = rate / 100 / 12;
  const n = years * 12;
  const fv = Math.round(monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r));

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x1F305; 养老金模拟器</h3>
      <label className="text-sm font-medium">当前年龄：{age}岁</label>
      <input type="range" min={20} max={50} step={1} value={age}
        onChange={e => setAge(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <label className="text-sm font-medium mt-2 block">每月投入：¥{monthly.toLocaleString()}</label>
      <input type="range" min={500} max={10000} step={500} value={monthly}
        onChange={e => setMonthly(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <label className="text-sm font-medium mt-2 block">年化收益：{rate}%</label>
      <input type="range" min={3} max={10} step={0.5} value={rate}
        onChange={e => setRate(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <div className="card-base p-4 mt-4 text-center">
        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>60岁时预计积累</div>
        <div className="text-2xl font-bold" style={{ color: "var(--color-brand)" }}>¥{(fv / 10000).toFixed(0)}万</div>
        <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
          共投入{years}年 &times; 12月 &times; ¥{monthly.toLocaleString()} = ¥{(monthly * n / 10000).toFixed(0)}万
        </p>
      </div>
    </div>
  );
}

export default function Retirement() {
  return (
    <>
      <h2>现在开始想养老，不算早</h2>
      <p>
        你可能觉得退休还远。但记住：<strong>25岁开始每月存2000 vs 40岁开始每月存5000</strong>，前者到60岁反而更多。复利是你最大的盟友，但它需要时间。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F305;</div>
        <h3>为什么社保养老金不够？</h3>
      </div>
      <ul>
        <li>社保养老金替代率约<strong>40-50%</strong>（退休后只能拿到在职收入的一半不到）</li>
        <li>随着人口老龄化，未来替代率可能更低</li>
        <li>你需要自己准备另外50%</li>
      </ul>

      <RetirementCalc />

      <h2>养老投资策略</h2>
      <ul>
        <li><strong>早期（20-40岁）</strong>：以指数基金为主（70-80%权益），充分利用时间</li>
        <li><strong>中期（40-55岁）</strong>：逐步增加债券比例，降低风险</li>
        <li><strong>后期（55-60岁）</strong>：以债券/存款为主，保护本金</li>
      </ul>

      <blockquote>
        养老是一场超长期投资。从现在开始，每月少喝几杯奶茶的钱投进去，60岁的你会感谢现在的你。
      </blockquote>

      <Quiz
        question="25岁的小程现在每月定投2000到指数基金，年化8%，到60岁大约能攒多少？"
        options={[
          { label: "大约84万（2000×12×35）", feedback: "那只是本金总额。加上35年的复利，远不止这个数。" },
          { label: "大约350万", feedback: "接近了！每月2000、年化8%、投35年，复利让总额是纯投入的4倍多。", correct: true },
          { label: "大约10万", feedback: "太少了。光是本金35年就有84万，加上复利会翻好几倍。" },
        ]}
      />

      <div className="card-featured mt-8" style={{ background: "var(--color-brand-light)" }}>
        <h3 style={{ marginTop: 0 }}>&#x1F3C6; 恭喜通关！</h3>
        <p>
          你已经完成了<strong>全部35个模块</strong>的理财冒险！从认识钱开始，到建立投资系统、避开心理陷阱、规划人生大事——你现在拥有了比大部分同龄人更完整的理财知识体系。
        </p>
        <p>
          但知道不等于做到。<strong>理财是一辈子的事</strong>，从今天开始的每一个小行动——自动储蓄、开始定投、买份保险——都是你给未来自己的礼物。
        </p>
        <p><strong>去行动吧！</strong></p>
      </div>
    </>
  );
}