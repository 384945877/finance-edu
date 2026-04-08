"use client";

import Quiz from "@/components/Quiz";

export default function Bonds() {
  return (
    <>
      <h2>借钱给国家或公司，收利息</h2>
      <p>
        你买债券 = 你借钱给别人。对方按约定还你本金+利息。就这么简单。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">📄</div>
        <h3>三种常见债券</h3>
      </div>
      <ul>
        <li><strong>国债</strong> — 借钱给国家。安全性最高（国家信用），利率2-3%左右</li>
        <li><strong>地方债</strong> — 借钱给地方政府。比国债利率略高，风险略高</li>
        <li><strong>企业债/公司债</strong> — 借钱给公司。利率更高但公司可能违约</li>
      </ul>

      <h2>债券的核心逻辑</h2>
      <div className="knowledge-card">
        <div className="card-icon">🔑</div>
        <h3>三个关键词</h3>
      </div>
      <ul>
        <li><strong>面值</strong> — 到期还你的金额，通常100元</li>
        <li><strong>票面利率</strong> — 每年付给你的利息比例</li>
        <li><strong>到期日</strong> — 什么时候还你钱。期限越长利率通常越高</li>
      </ul>

      <h2>一个重要规律：利率涨，债券跌</h2>
      <p>
        如果你持有一个3%利率的债券，市场新发行的债券利率涨到4%了——谁还要你这个3%的？你要打折才能卖出去。
      </p>
      <p>
        <strong>反过来</strong>：市场利率降到2%，你手上3%的老债券反而变成"香饽饽"，价格会涨。
      </p>

      <blockquote>
        债券是"稳健投资"的基石。不如股票刺激，但波动小得多，适合平衡风险。
      </blockquote>

      <Quiz
        question="国债和企业债，哪个利率通常更高？为什么？"
        options={[
          { label: "国债更高，因为是国家发的", feedback: "正好反了。国家信用最高，所以不需要给太高利率。" },
          { label: "企业债更高，因为风险更大", feedback: "正确！风险越高的借款方需要支付越高的利息来吸引投资者。", correct: true },
          { label: "一样高，都是债券", feedback: "不一样。风险不同，利率补偿也不同。" },
        ]}
      />

      <Quiz
        question="央行降息，你手上持有的老债券价格会怎样？"
        options={[
          { label: "下跌", feedback: "反了。降息 = 新债利率变低，你的老债相比之下更值钱。" },
          { label: "上涨", feedback: "正确！降息让老债券的相对吸引力增加，价格上涨。", correct: true },
          { label: "不变", feedback: "会变。利率和债券价格呈反向关系。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>债券 = 借钱给别人收利息</li>
          <li>国债最安全，企业债收益高但有违约风险</li>
          <li>利率和债券价格成反比</li>
          <li>债券是投资组合中的"稳定器"</li>
          <li>适合追求稳健收益的资金配置</li>
        </ul>
      </div>
    </>
  );
}