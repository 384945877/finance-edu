"use client";

import Quiz from "@/components/Quiz";

export default function GoldAndOthers() {
  return (
    <>
      <h2>乱世买黄金？</h2>
      <p>
        每次世界局势紧张，金价就涨。黄金被称为<strong>"避险资产"</strong>——不是让你暴富的，而是在其他东西都在跌的时候还能稳住。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🥇</div>
        <h3>黄金的特点</h3>
      </div>
      <ul>
        <li>✅ <strong>避险</strong> — 股市暴跌、货币贬值时，黄金通常会涨</li>
        <li>✅ <strong>抗通胀</strong> — 长期来看黄金大致能跟上通胀</li>
        <li>❌ <strong>不产生现金流</strong> — 黄金不像股票有分红、债券有利息</li>
        <li>❌ <strong>短期波动大</strong> — 金价也会暴涨暴跌</li>
      </ul>

      <h2>买黄金的几种方式</h2>
      <ul>
        <li><strong>黄金ETF</strong> — 在股票账户买，跟踪金价，费率低，最推荐</li>
        <li><strong>银行纸黄金</strong> — 银行App买卖，不涉及实物</li>
        <li><strong>实物金条</strong> — 买金店的金条，适合长期收藏，但买卖差价大</li>
        <li><strong>黄金首饰</strong> — 有很高加工费，不适合作为投资</li>
      </ul>

      <h2>其他另类投资</h2>
      <div className="knowledge-card">
        <div className="card-icon">🎲</div>
        <h3>了解就好，新手别碰</h3>
      </div>
      <ul>
        <li><strong>加密货币（比特币等）</strong> — 波动极大，涨10倍和跌90%都很常见。监管不确定</li>
        <li><strong>期货/期权</strong> — 杠杆工具，可以放大收益也会放大亏损。新手绝对不要碰</li>
        <li><strong>收藏品（字画、球鞋等）</strong> — 流动性极差，真假难辨，不算正经投资</li>
        <li><strong>REITs（不动产信托）</strong> — 相对新的品种，用很少的钱"投资房地产"</li>
      </ul>

      <blockquote>
        黄金在投资组合里的角色是"稳定器"，建议配置不超过总资产的5-10%。
      </blockquote>

      <Quiz
        question="想投资黄金，以下哪种方式最适合普通人？"
        options={[
          { label: "买金项链，既好看又保值", feedback: "金首饰有20-30%的加工费溢价，卖出时按原料金价回收，实际亏损很大。" },
          { label: "买黄金ETF，费率低方便交易", feedback: "正确！黄金ETF紧密跟踪金价，费率低至0.15%，在股票账户即可买卖。", correct: true },
          { label: "去金店买金条藏家里", feedback: "实物金条有保管成本和买卖差价，不如ETF方便。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>黄金是避险资产，不产生现金流</li>
          <li>推荐用黄金ETF投资，别买首饰当投资</li>
          <li>黄金建议占总资产5-10%</li>
          <li>加密货币/期货/收藏品——新手了解即可</li>
          <li>投资工具越简单越适合普通人</li>
        </ul>
      </div>

      <div className="card-featured mt-4" style={{ background: "var(--color-brand-light)" }}>
        <h3 style={{ marginTop: 0 }}>&#x1F389; 第四部分完成！</h3>
        <p>
          恭喜！你已经认识了所有主流投资工具——从最安全的银行存款到最刺激的股票，从"零钱罐"货基到"稳定器"黄金。
          下一站——<strong>建立投资系统</strong>，把这些工具组合起来，打造属于你自己的投资方案。
        </p>
      </div>
    </>
  );
}