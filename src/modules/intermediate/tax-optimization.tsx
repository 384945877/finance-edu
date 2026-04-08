"use client";
import Quiz from "@/components/Quiz";
export default function TaxOptimization() {
  return (<>
    <h2>少交一分是一分</h2>
    <p>交易不是免费的。每笔交易都有<strong>佣金、印花税、过户费</strong>。频繁交易的人，一年光手续费就可能亏掉5%以上。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F9EE;</div><h3>A股交易费用</h3></div>
    <ul>
      <li><strong>佣金</strong> — 万1-万3不等，双向收取。最低5元/笔</li>
      <li><strong>印花税</strong> — 卖出时收0.05%（2023年减半后）</li>
      <li><strong>过户费</strong> — 0.001%，沪深都收</li>
      <li><strong>基金申购费</strong> — 场外基金1.5%（打一折0.15%）</li>
    </ul>
    <h2>省钱技巧</h2>
    <ul>
      <li><strong>找客户经理谈佣金</strong> — 万1.2甚至更低是常见水平</li>
      <li><strong>减少交易频率</strong> — 频繁买卖的手续费是隐形杀手</li>
      <li><strong>场外基金走第三方</strong> — 天天基金/蛋卷等平台申购费打1折</li>
      <li><strong>基金持有超过730天</strong> — 大部分基金持有2年以上免赎回费</li>
    </ul>
    <blockquote>投资赚的钱要扣掉交易成本才是真实收益。降低成本等于直接提高收益。</blockquote>
    <Quiz question="小张每天买卖3次股票，佣金万2.5。一年下来交易成本大概占多少？"
      options={[
        { label: "不到1%，可以忽略", feedback: "算一下：每天6笔 × 万2.5 × 250个交易日 ≈ 37.5%！频繁交易的成本极其惊人。" },
        { label: "可能高达30%以上", feedback: "对！频繁交易者的交易成本是巨大的隐形杀手。这也是大部分短线客亏钱的原因。", correct: true },
        { label: "5%左右", feedback: "远不止5%。每天6笔交易一年下来成本占比非常高。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>每笔交易都有佣金+印花税+过户费</li><li>频繁交易的成本是隐形杀手</li><li>佣金一定要谈低，基金申购走打折平台</li><li>降成本 = 提收益</li></ul>
    </div>
  </>);
}
