"use client";

import Quiz from "@/components/Quiz";

export default function BankDeposit() {
  return (
    <>
      <h2>银行存款：你最熟悉的理财起点</h2>
      <p>
        几乎每个人的第一笔"理财"都是银行存款。它<strong>安全、简单、门槛为零</strong>——但也因此收益最低。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🏦</div>
        <h3>存款的种类</h3>
      </div>
      <ul>
        <li><strong>活期存款</strong> — 随存随取，利率约0.2-0.3%。方便但几乎不赚钱</li>
        <li><strong>定期存款</strong> — 约定存3个月/6个月/1年/3年等，利率1.5-2.5%。提前取按活期算</li>
        <li><strong>大额存单</strong> — 20万起步，利率比定期高一点。适合有闲钱又追求安全的人</li>
        <li><strong>结构性存款</strong> — 保本但收益浮动，挂钩某个指标。稍复杂，先了解就好</li>
      </ul>

      <h2>存款保险：50万以内国家兜底</h2>
      <div className="knowledge-card">
        <div className="card-icon">🛡️</div>
        <h3>每家银行50万保障</h3>
      </div>
      <p>
        中国的<strong>存款保险制度</strong>规定：每个人在每家银行的存款，50万以内全额赔付。所以：
      </p>
      <ul>
        <li>50万以内的银行存款是<strong>零风险的</strong>（国家信用担保）</li>
        <li>超过50万？分到不同银行存就行</li>
        <li>这里说的是存款，不包括银行代销的理财产品</li>
      </ul>

      <h2>什么时候用银行存款？</h2>
      <ul>
        <li>✅ 应急基金 — 安全第一</li>
        <li>✅ 短期用的钱 — 3个月内要用的</li>
        <li>❌ 长期闲钱 — 放这里等于被通胀吃掉</li>
      </ul>

      <blockquote>
        银行存款是安全的避风港，但不是让钱增值的地方。
      </blockquote>

      <Quiz
        question="小赵有80万存在一家银行。如果这家银行倒闭了，他最多能拿回多少？"
        options={[
          { label: "80万全额赔付", feedback: "存款保险最高保障50万，超出部分需要参与银行破产清算。" },
          { label: "50万（存款保险上限）", feedback: "正确！所以大额资金应该分散到多家银行，每家不超50万。", correct: true },
          { label: "一分钱都拿不回来", feedback: "不会的。存款保险制度保障50万以内全额赔付。" },
        ]}
      />

      <Quiz
        question="以下哪种情况最适合用银行定期存款？"
        options={[
          { label: "未来30年不动的养老金", feedback: "30年太长了，放定存跑不赢通胀。应该考虑更高收益的长期投资。" },
          { label: "半年后买手机的钱", feedback: "对！半年期定存，安全又比活期利息高一点，到期刚好用。", correct: true },
          { label: "想赚年化10%的钱", feedback: "银行定存利率最高也就2-3%，想要10%需要其他工具。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>银行存款分活期、定期、大额存单</li>
          <li>50万以内有存款保险保障，零风险</li>
          <li>利率很低（0.2-2.5%），跑不赢通胀</li>
          <li>适合放应急基金和短期资金</li>
          <li>长期闲钱需要更高效的工具</li>
        </ul>
      </div>
    </>
  );
}