"use client";

import Quiz from "@/components/Quiz";

export default function MoneyMarketFund() {
  return (
    <>
      <h2>余额宝到底是什么？</h2>
      <p>
 把钱放进余额宝，每天都能看到"收益+0.xx元"。感觉像银行利息但又比银行高。它的真实身份是——<strong>货币基金</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">💵</div>
        <h3>货币基金的运作方式</h3>
      </div>
      <p>
        基金公司把你和其他人的钱凑在一起，去买<strong>超短期、超安全的金融资产</strong>：银行大额存单、国债逆回购、短期债券等。赚到的利息分给你。
      </p>

      <h2>货基的优缺点</h2>
      <ul>
        <li>✅ <strong>安全性极高</strong> — 虽然理论上不保本，但历史上几乎没亏过</li>
        <li>✅ <strong>流动性好</strong> — T+0赎回，随时能用（单日限额1万）</li>
        <li>✅ <strong>门槛低</strong> — 1分钱就能买</li>
        <li>❌ <strong>收益低</strong> — 目前年化1.5-2%左右，只比银行活期好一点</li>
        <li>❌ <strong>收益持续下降</strong> — 2013年余额宝年化7%的时代不会再来了</li>
      </ul>

      <div className="knowledge-card">
        <div className="card-icon">📊</div>
        <h3>看收益要看"七日年化"</h3>
      </div>
      <p>
        货基的收益每天变化。<strong>七日年化收益率</strong>是过去7天收益折算成年化后的数字。1.8%意味着如果放1万块一年大约赚180块。
      </p>

      <blockquote>
        货基是"零钱罐"，不是"投资工具"。适合放生活费，不适合放长期闲钱。
      </blockquote>

      <Quiz
        question="以下关于余额宝（货币基金）的说法，哪个是错的？"
        options={[
          { label: "货币基金是保本保息的", feedback: "这就是错误的！货基不承诺保本，只是风险极低，历史上几乎没亏过。", correct: true },
          { label: "货基的收益会每天变化", feedback: "这是正确的。货基收益确实每天波动。" },
          { label: "货基的钱可以随时取出来用", feedback: "这也是正确的。T+0赎回，虽然单日有限额。" },
        ]}
        explanation="2022年资管新规后，所有理财产品都不允许承诺保本了。货基虽然安全，但法律上不'保本'。"
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>余额宝/零钱通的本质是货币基金</li>
          <li>投资短期安全资产，风险极低但不保本</li>
          <li>年化收益约1.5-2%，比活期好但跑不赢通胀</li>
          <li>适合放日常零花钱，不适合长期投资</li>
          <li>看"七日年化收益率"判断当前收益水平</li>
        </ul>
      </div>
    </>
  );
}