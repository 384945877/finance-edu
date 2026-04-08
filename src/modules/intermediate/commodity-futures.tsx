"use client";
import Quiz from "@/components/Quiz";
export default function CommodityFutures() {
  return (<>
    <h2>原油黄金怎么玩</h2>
    <p>商品期货是对原油、黄金、铜、大豆等实物商品的合约交易。<strong>普通人不需要直接炒期货</strong>，通过商品ETF和黄金ETF参与更安全。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F6E2;&#xFE0F;</div><h3>商品投资的价值</h3></div>
    <ul>
      <li><strong>抗通胀</strong> — 通胀时商品价格通常上涨</li>
      <li><strong>和股债低相关</strong> — 分散投资组合风险</li>
      <li><strong>避险功能</strong> — 黄金在市场恐慌时通常上涨</li>
    </ul>
    <h2>普通人怎么参与</h2>
    <ul>
      <li><strong>黄金ETF</strong> — 最简单的方式，在券商App直接买</li>
      <li><strong>商品ETF</strong> — 追踪原油/豆粕等商品价格</li>
      <li><strong>期货账户</strong> — 门槛高、杠杆大，新手不建议</li>
    </ul>
    <blockquote>商品配置不需要多，总仓位的5-10%就够了。主要起到分散风险和抗通胀的作用。</blockquote>
    <Quiz question="在投资组合中配置5%黄金的主要目的是？"
      options={[
        { label: "追求高收益", feedback: "黄金长期收益率不高，它的价值在于分散风险和避险。" },
        { label: "分散风险和避险", feedback: "对！黄金与股票相关性低，在市场恐慌时通常逆势上涨，是天然的避险工具。", correct: true },
        { label: "赌金价上涨", feedback: "配置黄金不是赌方向，而是作为组合的保险功能。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>商品投资能抗通胀、分散风险</li><li>普通人通过黄金ETF参与最简单</li><li>配置比例5-10%即可</li><li>不建议新手直接炒期货</li></ul>
    </div>
  </>);
}
