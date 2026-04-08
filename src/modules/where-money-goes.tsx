"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

function SpendingTracker() {
  const [salary, setSalary] = useState(8000);
  const categories = [
    { name: "房租", pct: 35, emoji: "🏠" },
    { name: "吃饭", pct: 20, emoji: "🍜" },
    { name: "交通", pct: 5, emoji: "🚇" },
    { name: "购物/娱乐", pct: 15, emoji: "🛍️" },
    { name: "社交", pct: 10, emoji: "🍻" },
    { name: "其他", pct: 5, emoji: "📦" },
  ];
  const totalPct = categories.reduce((s, c) => s + c.pct, 0);
  const leftPct = 100 - totalPct;

  return (
    <div className="my-8 rounded-2xl border p-6" style={{ borderColor: "var(--border-subtle)", background: "var(--color-gray-50)" }}>
      <p className="label-upper mb-1" style={{ color: "var(--color-brand-deep)" }}>互动模拟</p>
      <h3 style={{ marginTop: 0 }}>一个月薪 {salary.toLocaleString()} 的普通支出</h3>
      <div className="mb-4">
        <label className="text-xs" style={{ color: "var(--color-text-muted)" }}>调整月薪</label>
        <input type="range" min={3000} max={30000} step={500} value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          className="w-full mt-1" style={{ accentColor: "var(--color-brand)" }} />
        <div className="flex justify-between text-xs" style={{ color: "var(--color-text-muted)" }}>
          <span>3,000</span><span>30,000</span>
        </div>
      </div>
      <div className="space-y-2">
        {categories.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="w-8 text-center">{c.emoji}</span>
            <span className="text-sm w-20 flex-shrink-0">{c.name}</span>
            <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
              <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: "var(--color-brand)" }} />
            </div>
            <span className="text-sm font-semibold w-16 text-right">{Math.round(salary * c.pct / 100).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          <span className="w-8 text-center">💰</span>
          <span className="text-sm w-20 flex-shrink-0 font-semibold" style={{ color: leftPct > 0 ? "var(--color-brand-deep)" : "#d45656" }}>
            {leftPct > 0 ? "剩余" : "超支！"}
          </span>
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full" style={{ width: `${Math.max(leftPct, 0)}%`, background: leftPct > 0 ? "#0fa76e" : "#d45656" }} />
          </div>
          <span className="text-sm font-semibold w-16 text-right" style={{ color: leftPct > 0 ? "var(--color-brand-deep)" : "#d45656" }}>
            {Math.round(salary * leftPct / 100).toLocaleString()}
          </span>
        </div>
      </div>
      <p className="text-xs mt-3" style={{ color: "var(--color-text-muted)" }}>
        * 这只是一个典型案例，每个人的实际支出不同。关键是：你知道自己的钱去哪了吗？
      </p>
    </div>
  );
}

export default function WhereMoneyGoes() {
  return (
    <>
      <h2>月光不可怕，可怕的是不知道为什么月光</h2>
      <p>
        很多人的财务状态是这样的：发工资那天是大爷，月底前是孙子。<strong>不是赚得不够，是不知道花到哪去了。</strong>
      </p>

      <SpendingTracker />

      <h2>收入与支出的两种模型</h2>
      <div className="knowledge-card">
        <div className="card-icon">🔴</div>
        <h3>月光模式</h3>
      </div>
      <p>收入 → 花花花 → 月底剩0 → 下月重复</p>
      <p>这是大多数人的默认模式。不是"没钱"，是钱的流向完全没有规划。</p>

      <div className="knowledge-card">
        <div className="card-icon">🟢</div>
        <h3>先储后花模式</h3>
      </div>
      <p>收入 → <strong>先存20%</strong> → 剩下的再分配花</p>
      <p>
        区别只有一步：<strong>工资到账的第一件事不是消费，是转走一部分</strong>。哪怕只有10%，也比0强一万倍。
      </p>

      <blockquote>
        理财不是让你不花钱，是让你<strong>知道</strong>花了多少、花在哪，然后做出选择。
      </blockquote>

      <h2>支出的三大分类</h2>
      <ul>
        <li><strong>固定支出</strong> — 房租、水电、话费、保险，每月固定扣的钱</li>
        <li><strong>弹性支出</strong> — 吃饭、购物、社交，可以调节的钱</li>
        <li><strong>隐形支出</strong> — 视频会员自动续费、外卖配送费、各种小额订阅。这是最容易被忽略的"吸血鬼"</li>
      </ul>

      <Quiz
        question="小红月薪8000，房租2500，吃饭1500，交通400，购物2000，社交1000，其他600。她的问题在哪？"
        options={[
          { label: "赚得太少了", feedback: "8000的月薪在大多数城市不算低。问题不在收入端。" },
          { label: "购物+社交占了37.5%，弹性支出过高", feedback: "没错！3000元的弹性支出占比过高，挤压了储蓄空间。先把储蓄'锁'住，再分配消费额度。", correct: true },
          { label: "房租太贵了", feedback: "2500的房租占收入31%，其实在合理范围内（建议不超过30-35%）。" },
        ]}
      />

      <Quiz
        question="以下哪个习惯对控制支出最有效？"
        options={[
          { label: "什么都不买，极度节省", feedback: "过度节省不可持续，而且会严重影响生活质量。" },
          { label: "工资到账后立刻转走一部分存起来", feedback: "完全正确！'先储后花'是最简单有效的方法，后面的模块会详细讲。", correct: true },
          { label: "只用现金，不用电子支付", feedback: "在数字支付时代这不太现实。关键是建立对消费的'意识'，而不是逃避工具。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>月光的根源通常不是"赚少了"，而是"不知道花哪了"</li>
          <li>支出分三类：固定、弹性、隐形</li>
          <li>"先储后花"比"花剩再存"有效100倍</li>
          <li>弹性支出和隐形支出是优化空间最大的地方</li>
        </ul>
      </div>
    </>
  );
}