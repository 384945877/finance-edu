"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动组件：应急基金计算器 */
function EmergencyCalc() {
  const [rent, setRent] = useState(2000);
  const [food, setFood] = useState(1500);
  const [transport, setTransport] = useState(300);
  const [other, setOther] = useState(500);
  const monthly = rent + food + transport + other;
  const target3 = monthly * 3;
  const target6 = monthly * 6;

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>🧮 你的应急基金该有多少？</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "房租/房贷", val: rent, set: setRent, max: 10000 },
          { label: "吃饭", val: food, set: setFood, max: 5000 },
          { label: "交通", val: transport, set: setTransport, max: 2000 },
          { label: "其他必须", val: other, set: setOther, max: 3000 },
        ].map(item => (
          <div key={item.label}>
            <label className="text-xs" style={{ color: "var(--color-text-muted)" }}>{item.label}：¥{item.val}</label>
            <input type="range" min={0} max={item.max} step={100} value={item.val}
              onChange={e => item.set(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>月必要开支</div>
          <div className="text-lg font-bold">¥{monthly.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>3个月（最低）</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand)" }}>¥{target3.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>6个月（推荐）</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand-deep)" }}>¥{target6.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default function EmergencyFund() {
  return (
    <>
      <h2>如果明天突然失业，你能撑多久？</h2>
      <p>
        这不是恐吓。<strong>突发状况</strong>随时会来——裁员、生病、手机摔了、车坏了。没有应急基金，一个意外就能让你的理财计划全部归零。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🆘</div>
        <h3>应急基金 = 你的财务安全气囊</h3>
      </div>
      <p>它不是用来投资的钱，不是用来花的钱，是<strong>你不希望用到但必须有的钱</strong>。</p>

      <h2>存多少？怎么算？</h2>
      <ul>
        <li><strong>最低线</strong>：3个月必要生活费（房租+吃饭+交通+基础开支）</li>
        <li><strong>推荐线</strong>：6个月必要生活费</li>
        <li><strong>自由职业/不稳定收入</strong>：建议9-12个月</li>
      </ul>

      <EmergencyCalc />

      <h2>放在哪？三个原则</h2>
      <div className="knowledge-card">
        <div className="card-icon">📍</div>
        <h3>安全 + 随时能取 + 别太容易花掉</h3>
      </div>
      <ul>
        <li><strong>银行活期/货币基金</strong> — 随时能取出来，比放在余额宝更好（余额宝太容易直接消费了）</li>
        <li><strong>单独的银行卡</strong> — 不要和日常消费卡混在一起</li>
        <li><strong>不要追求高收益</strong> — 应急基金的任务是"在"，不是"赚钱"</li>
      </ul>

      <blockquote>
        应急基金不是让你变富的，是让你在遇到坏运气时不至于变穷的。
      </blockquote>

      <Quiz
        question="小刚月入1万，每月必要开支4500。他想先攒够应急基金再开始投资。最低目标应该是？"
        options={[
          { label: "¥10,000", feedback: "不到3个月的开支，还不够安全。" },
          { label: "¥13,500（3个月必要开支）", feedback: "正确！3个月是最低安全线，攒够后可以一边继续加到6个月，一边开始学投资。", correct: true },
          { label: "¥100,000", feedback: "10万当然更安全，但太多了。不需要把大量资金锁在低收益的应急账户里。" },
        ]}
      />

      <Quiz
        question="应急基金应该放在哪里？"
        options={[
          { label: "股票账户里，顺便赚点", feedback: "万一股市暴跌，你急用钱时可能只剩一半。应急基金必须安全。" },
          { label: "单独银行卡的活期/货基", feedback: "对！安全、随取、和消费隔离——三个条件都满足。", correct: true },
          { label: "放在家里的保险柜", feedback: "现金放家里没有任何收益，还有被盗/受损风险。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>应急基金 = 3-6个月的必要生活费</li>
          <li>它的任务是"在"，不是"赚"</li>
          <li>放在安全、随取、隔离消费的账户里</li>
          <li>攒够3个月是最低起步线</li>
          <li>先有应急基金，再谈投资</li>
        </ul>
      </div>
    </>
  );
}