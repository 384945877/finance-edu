"use client";
import Quiz from "@/components/Quiz";
export default function GrowthStock() {
  return (<>
    <h2>押注未来的赢家</h2>
    <p>成长股投资的逻辑：找到<strong>营收和利润高速增长</strong>的公司，享受业绩爆发带来的股价飙升。高风险高回报。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F680;</div><h3>成长股特征</h3></div>
    <ul>
      <li><strong>营收增速</strong> — 连续3年营收增长超过20%</li>
      <li><strong>行业空间大</strong> — 所在赛道天花板高（新能源/AI/生物医药）</li>
      <li><strong>PE高但PEG合理</strong> — PEG = PE/增速，PEG小于1是合理的</li>
      <li><strong>研发投入大</strong> — 不断创新才能保持增长</li>
    </ul>
    <h2>成长股的风险</h2>
    <ul>
      <li><strong>估值杀</strong> — 增速一旦放缓，市场会猛砍估值，股价可能腰斩</li>
      <li><strong>竞争加剧</strong> — 赛道好会引来大量玩家，先发优势可能被蚕食</li>
      <li><strong>烧钱风险</strong> — 很多成长股还没盈利，靠融资续命</li>
    </ul>
    <blockquote>成长股赚的是预期差的钱。当现实跟不上预期时，跌起来比涨的时候还猛。</blockquote>
    <Quiz question="一家AI公司营收年增80%但还在亏损，PE为负。值得投吗？"
      options={[
        { label: "亏损公司绝对不能碰", feedback: "很多伟大的成长股早期都是亏损的（如亚马逊）。关键看增速和商业模式。" },
        { label: "看营收增速和商业模式，小仓位参与", feedback: "对！高增长+大赛道的亏损公司可以小仓位博弈，但绝不能重仓。", correct: true },
        { label: "全仓梭哈，AI是未来", feedback: "再看好也不能全仓。成长股波动极大，全仓可能血本无归。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>成长股看营收增速、行业空间、PEG</li><li>估值杀是最大风险</li><li>小仓位参与，不要重仓单只成长股</li><li>关注增速的可持续性</li></ul>
    </div>
  </>);
}
