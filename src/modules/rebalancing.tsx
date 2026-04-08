"use client";

import Quiz from "@/components/Quiz";

export default function Rebalancing() {
  return (
    <>
      <h2>为什么要定期调整？</h2>
      <p>
        假设你的目标配置是60%股票+40%债券。过了一年股市大涨，现在变成了75%股票+25%债券——你的风险不知不觉变大了。<strong>再平衡</strong>就是把比例调回原来的目标。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x2696;&#xFE0F;</div>
        <h3>再平衡 = 把跑得快的卖一点，补到跑得慢的</h3>
      </div>
      <ul>
        <li>股票涨多了 → 卖掉一些 → 买入债券补回比例</li>
        <li>本质是<strong>强制"高卖低买"</strong></li>
        <li>不是预测市场，是维护你的风险水平</li>
      </ul>

      <h2>多久调一次？</h2>
      <ul>
        <li><strong>时间触发</strong>：每半年或每年调一次</li>
        <li><strong>偏差触发</strong>：某类资产偏离目标超过5-10%就调</li>
        <li><strong>不要太频繁</strong>：频繁调整增加交易成本</li>
      </ul>

      <h2>实操方法</h2>
      <ul>
        <li>方法1：卖出涨多的，买入跌多的（有税费成本）</li>
        <li>方法2：新增投资往偏低的资产类别加（更推荐！无交易成本）</li>
      </ul>

      <blockquote>
        再平衡是纪律的体现。它让你的投资组合不会偏离航向。
      </blockquote>

      <Quiz
        question="你的目标是60%股票+40%债券。股市大涨后变成80%股票+20%债券。你应该？"
        options={[
          { label: "继续持有，股票还在涨呢", feedback: "风险已经比目高很多了。涨越多越该调回来，不然暴跌时亏损更大。" },
          { label: "卖出部分股票买入债券，恢复60/40", feedback: "正确！这就是再平衡——维护你设定的风险水平。", correct: true },
          { label: "全部卖出，落袋为安", feedback: "全部卖出太极端了，而且你还会面临'什么时候再买入'的问题。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>再平衡 = 定期把配置调回目标比例</li>
          <li>本质是强制"高卖低买"</li>
          <li>建议每半年到一年检查一次</li>
          <li>推荐用新增投资来调整，减少交易成本</li>
          <li>再平衡是投资纪律的核心</li>
        </ul>
      </div>
    </>
  );
}