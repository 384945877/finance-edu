"use client";
import Quiz from "@/components/Quiz";
export default function CreditBond() {
  return (<>
    <h2>怎么判断会不会违约</h2>
    <p>信用债 = 企业发行的债券。和国债不同，信用债<strong>有违约风险</strong>——公司还不起钱，你的本金就可能打水漂。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F50D;</div><h3>信用评级怎么看</h3></div>
    <ul>
      <li><strong>AAA级</strong> — 最高评级，违约概率极低（大型央企/国企）</li>
      <li><strong>AA+/AA级</strong> — 收益稍高但风险也增加</li>
      <li><strong>AA-及以下</strong> — 高收益债（也叫垃圾债），风险很大</li>
      <li><strong>信用利差</strong> — 信用债收益率 - 国债收益率 = 你承担的信用风险补偿</li>
    </ul>
    <h2>避雷要看什么</h2>
    <ul>
      <li><strong>发行人资质</strong> — 央企/国企相对安全，民企需要仔细看</li>
      <li><strong>现金流覆盖</strong> — 经营现金流能不能覆盖即将到期的债务</li>
      <li><strong>行业景气度</strong> — 地产/城投债要特别小心</li>
    </ul>
    <blockquote>信用债的收益率比国债高，但高出来的部分是对违约风险的补偿。不是白给的钱。</blockquote>
    <Quiz question="一只城投债年化收益8%（同期国债3%），你怎么看？"
      options={[
        { label: "收益高就好，买！", feedback: "8%意味着5%的信用利差，市场在告诉你这只债有不小的风险。" },
        { label: "利差太大说明市场认为风险高，需谨慎", feedback: "对！信用利差 = 风险补偿。5%的利差说明市场很担心这只债的偿还能力。", correct: true },
        { label: "城投债有政府兜底，没风险", feedback: "城投债暴雷已经有先例了。隐性担保正在被打破，不能盲目信仰。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>信用债有违约风险，收益高是风险补偿</li><li>AAA级最安全，AA-以下风险大</li><li>看发行人资质、现金流、行业景气度</li><li>信用利差越大风险越高</li></ul>
    </div>
  </>);
}
