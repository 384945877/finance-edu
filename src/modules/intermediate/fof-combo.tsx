"use client";
import Quiz from "@/components/Quiz";
export default function FofCombo() {
  return (<>
    <h2>基金中的基金</h2>
    <p>FOF（Fund of Funds）是买一篮子基金的基金。一只FOF可能持有10-20只不同风格的基金，帮你做好<strong>基金层面的资产配置</strong>。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F4E6;</div><h3>FOF 的优势</h3></div>
    <ul>
      <li><strong>专业配置</strong> — 由专业团队在几千只基金中精选组合</li>
      <li><strong>分散风险</strong> — 持有多只不同风格基金，不依赖单一经理</li>
      <li><strong>自动调仓</strong> — 基金经理帮你做再平衡</li>
      <li><strong>养老FOF</strong> — 目标日期/目标风险型，随年龄自动调整股债比例</li>
    </ul>
    <h2>FOF 的缺点</h2>
    <ul>
      <li><strong>双重收费</strong> — FOF收管理费，底层基金也收费。总费率可能超过2%</li>
      <li><strong>收益被摊薄</strong> — 过度分散导致收益跑不过优秀的单只基金</li>
      <li><strong>透明度低</strong> — 持仓只有季报才披露，实时看不到</li>
    </ul>
    <blockquote>FOF适合不想花时间研究基金的人。如果你愿意自己选3-5只基金做组合，可能效果更好且费率更低。</blockquote>
    <Quiz question="以下哪种人最适合买FOF？"
      options={[
        { label: "有时间研究且能自己做资产配置的人", feedback: "这类人自己选基金做组合更好，能省下FOF的额外费用。" },
        { label: "没时间研究，想一键买入省心省力的人", feedback: "对！FOF的核心价值就是省心——专业配置+自动调仓，适合没精力研究的投资者。", correct: true },
        { label: "想追求最高收益的激进投资者", feedback: "FOF因为过度分散，收益很难超越优秀单只基金。追求高收益不适合FOF。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul>
        <li>FOF = 买一篮子基金的基金</li>
        <li>优势：专业配置、分散风险、自动调仓</li>
        <li>缺点：双重收费、收益摊薄</li>
        <li>适合没时间研究的投资者</li>
      </ul>
    </div>
  </>);
}