"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动组件：先付给自己模拟器 */
function PayYourselfFirst() {
  const [salary, setSalary] = useState(8000);
  const [saveRate, setSaveRate] = useState(20);
  const saveAmount = Math.round(salary * saveRate / 100);
  const spendable = salary - saveAmount;
  const yearTotal = saveAmount * 12;

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>💡 先付给自己模拟器</h3>
      <label className="text-sm font-medium">月薪：¥{salary.toLocaleString()}</label>
      <input type="range" min={3000} max={30000} step={500} value={salary}
        onChange={e => setSalary(+e.target.value)} className="w-full accent-[var(--color-brand)]" />

      <label className="text-sm font-medium mt-3 block">储蓄比例：{saveRate}%</label>
      <input type="range" min={5} max={50} step={1} value={saveRate}
        onChange={e => setSaveRate(+e.target.value)} className="w-full accent-[var(--color-brand)]" />

      <div className="grid grid-cols-3 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>每月储蓄</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand)" }}>¥{saveAmount.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>可支配</div>
          <div className="text-lg font-bold">¥{spendable.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>一年攒到</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand-deep)" }}>¥{yearTotal.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default function Saving() {
  return (
    <>
      <h2>为什么大部分人攒不下钱？</h2>
      <p>
        不是因为赚得少——很多月入2万的人也是月光。核心问题是<strong>花钱的顺序搞反了</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🐷</div>
        <h3>先付给自己 vs 先花再攒</h3>
      </div>
      <ul>
        <li><strong>多数人的模式</strong>：收入 → 各种消费 → 月底看看还剩多少 → 通常剩0</li>
        <li><strong>正确的模式</strong>：收入 → <em>先转一笔到储蓄账户</em> → 剩下的才是生活费</li>
      </ul>
      <p>
        这就是巴比伦最古老的理财智慧：<strong>\u201c每赚10个金币，至少留1个给自己\u201d</strong>。现代版本就是发工资当天自动转账。
      </p>

      <PayYourselfFirst />

      <h2>储蓄的三个段位</h2>
      <div className="knowledge-card">
        <div className="card-icon">🎮</div>
        <h3>青铜 → 白银 → 黄金</h3>
      </div>
      <ul>
        <li><strong>青铜：能攒下来</strong> — 不管多少，每月有固定储蓄就行。哪怕只有200块</li>
        <li><strong>白银：自动化储蓄</strong> — 设置自动转账，发工资当天直接扣走，你根本"看不见"这笔钱</li>
        <li><strong>黄金：储蓄率持续提升</strong> — 每次涨薪，把涨的部分50%加到储蓄里，生活水平不降但攒钱速度翻倍</li>
      </ul>

      <blockquote>
        储蓄不是省吃俭用，是把未来的你当成一个需要"养活"的人。
      </blockquote>

      <h2>实操：零门槛开始</h2>
      <ul>
        <li>打开银行App → 设置<strong>自动转账</strong>（工资日+1天）</li>
        <li>转到一个<strong>不绑定支付的账户</strong>（增加取钱的"摩擦力"）</li>
        <li>初始比例建议：收入的 <strong>10%</strong>，稳定后逐步提升到20-30%</li>
      </ul>

      <Quiz
        question="小丽月薪8000，想开始存钱。以下哪种方式最有效？"
        options={[
          { label: "月底看看剩多少就存多少", feedback: "这种方式的结果通常是剩0……因为消费会自动填满所有预算。" },
          { label: "发工资当天自动转800到储蓄账户", feedback: "完美！自动化+先付给自己，是最靠谱的储蓄策略。", correct: true },
          { label: "把所有钱都存起来，需要时再取", feedback: "太极端了，坚持不了几天。好的储蓄方案是可持续的。" },
        ]}
        explanation="自动化储蓄的精髓是：把'攒钱'从一个需要意志力的事变成一个不需要思考的事。"
      />

      <Quiz
        question="涨薪1000块，最聪明的做法是？"
        options={[
          { label: "全部用来提升生活质量", feedback: "这就是'生活方式膨胀'——赚得越多花得越多，永远攒不下来。" },
          { label: "拿500加到储蓄，500改善生活", feedback: "聪明！涨薪分半原则——既享受了生活提升，又加速了储蓄。", correct: true },
          { label: "全部存起来", feedback: "理论上不错，但太苛刻容易反弹。理财需要可持续性。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>先付给自己 = 收入先转储蓄，剩下才是生活费</li>
          <li>自动化是最强储蓄武器，消除意志力依赖</li>
          <li>涨薪时把50%加到储蓄，防止生活方式膨胀</li>
          <li>储蓄账户要和消费账户物理隔离</li>
          <li>从10%开始，比不开始强100倍</li>
        </ul>
      </div>
    </>
  );
}