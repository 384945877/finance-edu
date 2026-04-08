"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动组件：复利雪球模拟器 */
function CompoundSnowball() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);

  const compound = Math.round(principal * Math.pow(1 + rate / 100, years));
  const simple = Math.round(principal * (1 + rate / 100 * years));
  const diff = compound - simple;

  const milestones = [5, 10, 20, 30].map(y => ({
    year: y,
    value: Math.round(principal * Math.pow(1 + rate / 100, y)),
  }));

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>🔄 复利雪球模拟器</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">初始本金：¥{principal.toLocaleString()}</label>
          <input type="range" min={1000} max={100000} step={1000} value={principal}
            onChange={e => setPrincipal(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
        </div>
        <div>
          <label className="text-sm font-medium">年化收益率：{rate}%</label>
          <input type="range" min={1} max={15} step={0.5} value={rate}
            onChange={e => setRate(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
        </div>
        <div>
          <label className="text-sm font-medium">投资年数：{years}年</label>
          <input type="range" min={1} max={40} step={1} value={years}
            onChange={e => setYears(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>复利终值</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand)" }}>¥{compound.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>单利终值</div>
          <div className="text-lg font-bold">¥{simple.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>复利多赚</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand-deep)" }}>¥{diff.toLocaleString()}</div>
        </div>
      </div>

      <div className="flex items-end gap-1 mt-4 h-24">
        {milestones.map(m => {
          const maxVal = milestones[milestones.length - 1].value;
          const h = Math.max(10, (m.value / maxVal) * 100);
          return (
            <div key={m.year} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold" style={{ color: "var(--color-brand)" }}>
                ¥{(m.value / 10000).toFixed(1)}万
              </span>
              <div className="w-full rounded-t" style={{ height: `${h}%`, background: "var(--color-brand)", opacity: 0.7 + m.year / 100 }} />
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{m.year}年</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CompoundInterest() {
  return (
    <>
      <h2>爱因斯坦说的"第八大奇迹"</h2>
      <p>
        复利的公式很简单：<strong>利息会产生利息</strong>。第一年赚的利息，第二年也会帮你赚钱。这就像滚雪球——球越大，滚得越快。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🔄</div>
        <h3>单利 vs 复利</h3>
      </div>
      <ul>
        <li><strong>单利</strong>：只有本金生利息。1万块年利率10%，每年都只赚1000</li>
        <li><strong>复利</strong>：利息也生利息。1万块年利率10%，第一年赚1000，第二年赚1100（因为本金变成11000了）</li>
      </ul>
      <p>短期看差不多，但<strong>时间越长，差距越惊人</strong>。拉到30年，复利的结果可以是单利的好几倍。</p>

      <CompoundSnowball />

      <h2>复利的三个关键变量</h2>
      <ul>
        <li><strong>本金</strong> — 雪球的初始大小。越大起点越高</li>
        <li><strong>利率</strong> — 雪球滚动的坡度。收益率从5%提升到8%，30年差距巨大</li>
        <li><strong>时间</strong> — 最重要的变量！20岁开始vs 30岁开始，同样本金最终差一倍</li>
      </ul>

      <blockquote>
        复利的最大敌人是中断。坚持比起步晚重要，起步早比起步多重要。
      </blockquote>

      <Quiz
        question="小张22岁每月投500，小王32岁每月投1000，假设年化收益都是8%，到60岁谁更多？"
        options={[
          { label: "小王，因为每月投的多一倍", feedback: "虽然月投金额翻倍，但少了10年的复利时间，差距很大。" },
          { label: "小张，因为多了10年复利时间", feedback: "对！时间是复利最强大的变量。早开始10年的优势，金额翻倍都追不回来。", correct: true },
          { label: "差不多，互相抵消", feedback: "差很远。10年的复利时间差距远大于月投金额的差距。" },
        ]}
        explanation="这就是'时间的杠杆'。理财越早开始越好，哪怕金额小也要开始。"
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>复利 = 利息产生利息，时间越长越惊人</li>
          <li>三个关键变量：本金、利率、时间（时间最重要）</li>
          <li>早开始10年 &gt; 每月多投一倍</li>
          <li>复利的敌人是中断，坚持比金额重要</li>
          <li>从现在开始就是最好的时间</li>
        </ul>
      </div>
    </>
  );
}