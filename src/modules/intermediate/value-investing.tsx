"use client";
import Quiz from "@/components/Quiz";
export default function ValueInvesting() {
  return (<>
    <h2>找到被低估的好公司</h2>
    <p>价值投资的核心：用<strong>打折的价格买优质公司</strong>。不是买便宜股，而是买物超所值的股。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F48E;</div><h3>价值投资三步法</h3></div>
    <ul>
      <li><strong>第一步：选好公司</strong> — ROE连续5年大于15%，现金流稳定，护城河明显</li>
      <li><strong>第二步：等好价格</strong> — PE低于历史均值，PB在合理区间</li>
      <li><strong>第三步：长期持有</strong> — 以年为单位持有，赚公司成长的钱</li>
    </ul>
    <h2>什么是护城河？</h2>
    <ul>
      <li><strong>品牌壁垒</strong> — 茅台、可口可乐，别人模仿不了的品牌溢价</li>
      <li><strong>转换成本</strong> — 用了微信就不想换，用了苹果就离不开</li>
      <li><strong>网络效应</strong> — 用户越多越好用，新玩家很难追上</li>
      <li><strong>成本优势</strong> — 规模大到成本远低于竞争对手</li>
    </ul>
    <blockquote>价值投资最难的不是选股，是等待。好公司不一定马上涨，但时间会奖励耐心的人。</blockquote>
    <Quiz question="一家公司ROE=22%，PE=12，但最近一个季度利润下滑了10%。你怎么看？"
      options={[
        { label: "利润下滑就是不行，赶紧卖", feedback: "短期波动是正常的。如果长期ROE稳定、护城河还在，一个季度的波动不改大趋势。" },
        { label: "分析下滑原因，如果护城河还在可能是买入机会", feedback: "对！短期利润波动+低PE，如果核心竞争力没变，反而可能是好的买入时机。", correct: true },
        { label: "等涨回来再买", feedback: "价值投资就是在别人恐惧时贪婪。等涨回来再买就不是价值投资了。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>好公司+好价格+长期持有 = 价值投资</li><li>护城河是判断好公司的关键</li><li>短期波动不改长期价值</li><li>耐心是价值投资最重要的品质</li></ul>
    </div>
  </>);
}
