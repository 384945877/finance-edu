"use client";
import Quiz from "@/components/Quiz";
export default function EtfStrategy() {
  return (<>
    <h2>场内基金的玩法</h2>
    <p>ETF（Exchange Traded Fund）= 在股票交易所买卖的基金。像买股票一样买基金，<strong>实时交易、费率超低、透明度高</strong>。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F3B2;</div><h3>ETF vs 场外基金</h3></div>
    <ul>
      <li><strong>交易方式</strong> — ETF在券商App实时买卖，场外基金T+1确认</li>
      <li><strong>费率</strong> — ETF管理费0.15-0.5%，场外基金通常0.8-1.5%</li>
      <li><strong>最低门槛</strong> — ETF最低买1手（100份），场外基金10块起</li>
      <li><strong>品种丰富</strong> — 宽基/行业/商品/跨境ETF应有尽有</li>
    </ul>
    <h2>ETF 实战策略</h2>
    <ul>
      <li><strong>核心-卫星策略</strong> — 70%配沪深300/中证500等宽基ETF，30%配行业ETF</li>
      <li><strong>网格交易</strong> — 设定价格区间，跌到下格买入，涨到上格卖出</li>
      <li><strong>轮动策略</strong> — 在不同行业ETF间轮动，追强势板块</li>
    </ul>
    <blockquote>ETF是普通投资者能买到的最接近机构级工具的产品。低费率+高透明+分散风险。</blockquote>
    <Quiz question="想长期定投沪深300，ETF和场外指数基金哪个更划算？"
      options={[
        { label: "场外基金，买起来方便", feedback: "方便是方便，但费率比ETF高出不少，长期下来差距明显。" },
        { label: "ETF，费率更低长期省很多", feedback: "对！ETF管理费通常是场外的1/3-1/2，持有10年能省下不少钱。", correct: true },
        { label: "都一样", feedback: "费率差距长期会被复利放大。ETF的低费率优势非常明显。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>ETF像股票一样交易，费率远低于场外基金</li><li>核心配宽基ETF，卫星配行业ETF</li><li>适合有券商账户的投资者</li></ul>
    </div>
  </>);
}