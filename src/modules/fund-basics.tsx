"use client";

import Quiz from "@/components/Quiz";

export default function FundBasics() {
  return (
    <>
      <h2>不会选股？让专业的人帮你投</h2>
      <p>
        基金的本质就是<strong>"众筹投资"</strong>：你和一群人把钱交给基金经理，他来决定买什么股票/债券，赚了大家分，亏了大家一起亏。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">📦</div>
        <h3>基金的运作方式</h3>
      </div>
      <ul>
        <li>你买基金 → 钱到基金公司 → 基金经理用这些钱买股票/债券</li>
        <li>基金每天公布<strong>净值</strong>（每份基金值多少钱）</li>
        <li>你赚的钱 = 卖出净值 - 买入净值（减去手续费）</li>
      </ul>

      <h2>基金的主要类型</h2>
      <div className="knowledge-card">
        <div className="card-icon">🗂️</div>
        <h3>按投资标的分</h3>
      </div>
      <ul>
        <li><strong>货币基金</strong> — 余额宝们，上一关已经讲过</li>
        <li><strong>债券基金</strong> — 主要买债券，风险低收益中（年化3-6%）</li>
        <li><strong>混合基金</strong> — 股债都买，风险中等</li>
        <li><strong>股票基金</strong> — 主要买股票，风险高收益高</li>
        <li><strong>指数基金</strong> — 跟踪某个指数（如沪深300），下一关重点讲</li>
      </ul>

      <h2>买基金要注意的几件事</h2>
      <ul>
        <li><strong>费用</strong>：申购费（买入）+管理费（每年）+赎回费（卖出）。费率差距大，要比较</li>
        <li><strong>不要追"冠军基金"</strong>：去年第一名今年可能倒数。短期业绩不代表未来</li>
        <li><strong>看基金经理</strong>：管了多久？历史回撤多大？风格是否稳定？</li>
        <li><strong>场内vs场外</strong>：场内在股票账户买（像股票一样交易），场外在支付宝/银行App买</li>
      </ul>

      <blockquote>
        基金不是"稳赚不赔"的——它只是帮你请了个专业投资人，但专业人也会判断错误。
      </blockquote>

      <Quiz
        question="小陈看到一只基金去年涨了80%，排名第一。他应该？"
        options={[
          { label: "赶紧买入，第一名肯定厉害", feedback: "冠军基金魔咒：去年第一名今年大概率不会再是第一。短期业绩不能预测未来。" },
          { label: "先看3-5年业绩、回撤、费率，再决定", feedback: "聪明！长期稳定的基金比短期爆发的更值得信赖。", correct: true },
          { label: "基金都是骗人的，不买", feedback: "基金本身不是骗局，是正规的投资工具。关键是选对。" },
        ]}
      />

      <Quiz
        question="基金的'净值'是什么意思？"
        options={[
          { label: "基金经理的管理费", feedback: "管理费和净值是两回事。" },
          { label: "每份基金当前值多少钱", feedback: "对！净值就是每份基金的'单价'，每天根据持仓资产表现更新。", correct: true },
          { label: "你投入的本金总额", feedback: "净值是每份基金的价格，不是你投入的总额。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>基金 = 众筹投资，让专业经理帮你买</li>
          <li>按标的分：货基、债基、混合、股基、指基</li>
          <li>注意费用、不追冠军、看长期业绩</li>
          <li>净值 = 每份基金的单价</li>
          <li>基金不保本，但分散了个股风险</li>
        </ul>
      </div>
    </>
  );
}