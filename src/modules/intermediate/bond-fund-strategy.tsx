"use client";
import Quiz from "@/components/Quiz";
export default function BondFundStrategy() {
  return (<>
    <h2>纯债、混合、增强怎么选</h2>
    <p>债基不是一种，而是一个家族。<strong>纯债基金</strong>只买债券最稳，<strong>混合债基</strong>能打新/买少量股票，<strong>增强债基</strong>更激进。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F4CB;</div><h3>三种债基对比</h3></div>
    <ul>
      <li><strong>纯债基金</strong> — 只买债券，年化3-5%，回撤极小，适合保守型</li>
      <li><strong>一级债基</strong> — 债券为主+可打新，年化4-7%</li>
      <li><strong>二级债基</strong> — 债券+不超过20%股票，年化5-10%但回撤更大</li>
    </ul>
    <h2>怎么选？</h2>
    <ul>
      <li><strong>替代银行理财</strong> — 选纯债基金</li>
      <li><strong>想多赚一点</strong> — 选一级债基</li>
      <li><strong>能承受小幅波动</strong> — 选二级债基</li>
    </ul>
    <blockquote>债基是资产配置中的压舱石。不指望它大涨，但在股市暴跌时它是你的安全垫。</blockquote>
    <Quiz question="资金1年内要用，最适合哪种？"
      options={[
        { label: "二级债基，收益高", feedback: "1年内要用的钱不适合有股票仓位的基金，波动可能导致亏损。" },
        { label: "短债基金或纯债基金", feedback: "对！短期资金优先安全性，短债/纯债基金回撤小，适合短期理财。", correct: true },
        { label: "货币基金更好", feedback: "货基也可以，但短债基金收益通常比货基高0.5-1%，且风险同样很低。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>纯债最稳、一级居中、二级波动最大</li><li>根据资金使用时间选择</li><li>债基是资产配置的压舱石</li></ul>
    </div>
  </>);
}
