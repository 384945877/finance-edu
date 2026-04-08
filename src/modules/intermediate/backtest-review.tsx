"use client";
import Quiz from "@/components/Quiz";
export default function BacktestReview() {
  return (<>
    <h2>用数据验证策略</h2>
    <p>回测 = 用历史数据检验你的投资策略在过去表现如何。复盘 = 定期回顾你的实际交易，总结经验教训。<strong>两者都是进步的必经之路</strong>。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F4CA;</div><h3>回测三要素</h3></div>
    <ul>
      <li><strong>时间跨度</strong> — 至少覆盖一个完整牛熊周期（5-10年）</li>
      <li><strong>基准对比</strong> — 你的策略跑赢了沪深300吗？</li>
      <li><strong>最大回撤</strong> — 最惨的时候亏了多少？你能承受吗？</li>
    </ul>
    <h2>复盘清单</h2>
    <ul>
      <li><strong>每笔交易回顾</strong> — 为什么买？为什么卖？结果如何？</li>
      <li><strong>情绪记录</strong> — 哪些决策是理性的？哪些是冲动的？</li>
      <li><strong>胜率统计</strong> — 赚钱的交易占多少比例？</li>
      <li><strong>持仓时间</strong> — 是不是太短了？长期持有的效果如何？</li>
    </ul>
    <blockquote>不复盘的投资者注定重复犯同样的错误。每月花30分钟复盘，比看100篇分析文章有用。</blockquote>
    <Quiz question="你的策略回测年化收益15%但最大回撤50%。这个策略好吗？"
      options={[
        { label: "年化15%很棒，直接用", feedback: "50%的最大回撤意味着资产腰斩。绝大多数人扛不住这种亏损。" },
        { label: "回撤太大，大部分人受不了，需要优化", feedback: "对！收益率要结合回撤看。50%回撤的策略在实战中几乎没人能坚持到最后。", correct: true },
        { label: "回撤无所谓，长期赚钱就行", feedback: "理论上对，但实际中50%回撤时你几乎一定会恐慌卖出。策略要匹配人性。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>回测要覆盖完整牛熊周期</li><li>不仅看收益率，还要看最大回撤</li><li>每月复盘交易记录和情绪</li><li>好策略 = 合理收益 + 可承受回撤</li></ul>
    </div>
  </>);
}
