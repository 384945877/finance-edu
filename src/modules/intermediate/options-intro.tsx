"use client";
import Quiz from "@/components/Quiz";
export default function OptionsIntro() {
  return (<>
    <h2>给你的股票买保险</h2>
    <p>期权 = 花一笔小钱（权利金），买一个未来以某个价格买入/卖出股票的<strong>权利</strong>（不是义务）。就像给你的持仓买了一份保险。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F3AF;</div><h3>两种基本期权</h3></div>
    <ul>
      <li><strong>看涨期权(Call)</strong> — 花权利金买入未来以X价买股票的权利。看涨时买</li>
      <li><strong>看跌期权(Put)</strong> — 花权利金买入未来以X价卖股票的权利。对冲下跌风险</li>
    </ul>
    <h2>期权的风险</h2>
    <ul>
      <li><strong>时间衰减</strong> — 期权有到期日，每天都在贬值</li>
      <li><strong>权利金归零</strong> — 如果到期没涨到行权价，权利金全部亏光</li>
      <li><strong>复杂度高</strong> — 期权定价涉及波动率、时间等复杂因素</li>
    </ul>
    <blockquote>期权是进阶中的进阶。了解概念就好，不建议新手实操。先掌握好股票和基金。</blockquote>
    <Quiz question="你持有一只股票担心短期下跌，可以用什么对冲？"
      options={[
        { label: "买看涨期权", feedback: "看涨期权是赌上涨的，不能对冲下跌风险。" },
        { label: "买看跌期权(Put)", feedback: "对！买Put就像给股票买保险——跌了期权赚钱弥补股票亏损。", correct: true },
        { label: "直接卖掉股票", feedback: "可以，但如果你长期看好只是担心短期波动，买Put是更灵活的选择。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>期权 = 花小钱买权利（不是义务）</li><li>Call看涨，Put看跌/对冲</li><li>有时间衰减和权利金归零风险</li><li>了解概念即可，新手不建议实操</li></ul>
    </div>
  </>);
}
