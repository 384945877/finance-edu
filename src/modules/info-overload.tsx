"use client";

import Quiz from "@/components/Quiz";

export default function InfoOverload() {
  return (
    <>
      <h2>打开手机就焦虑？</h2>
      <p>
        财经新闻、自媒体分析、朋友圈晒单、直播间喊单……每天几百条"投资信息"轰炸你，结果呢？<strong>越看越焦虑，越操作越亏</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F4F1;</div>
        <h3>信息过载的三个症状</h3>
      </div>
      <ul>
        <li><strong>分析瘫痪</strong> — 信息太多反而无法决策，一直犹豫不敢买</li>
        <li><strong>频繁操作</strong> — 看到一条利空新闻就想卖，看到利好就想买</li>
        <li><strong>焦虑不安</strong> — 总觉得自己错过了什么，不看手机就不安</li>
      </ul>

      <h2>如何过滤噪音？</h2>
      <ul>
        <li><strong>区分信号和噪音</strong> — 99%的财经新闻是噪音，对你的长期投资没有意义</li>
        <li><strong>减少信息源</strong> — 关掉不必要的推送，取关营销号</li>
        <li><strong>定期而非实时</strong> — 一周/一月看一次账户，不要每天盯盘</li>
        <li><strong>制定投资计划后严格执行</strong> — 有计划的人不容易被噪音干扰</li>
      </ul>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F6A8;</div>
        <h3>远离这些内容</h3>
      </div>
      <ul>
        <li>{"\u201c"}明天必涨的三只股票{"\u201d"} —— 没人能预测明天</li>
        <li>{"\u201c"}这个方法稳赚不赔{"\u201d"} —— 稳赚不赔不存在</li>
        <li>{"\u201c"}不看亏一百万{"\u201d"} —— 标题党，制造恐慌获取流量</li>
      </ul>

      <blockquote>
        最好的投资信息策略是：少看、少动、多等待。
      </blockquote>

      <Quiz
        question="小孙每天花3小时看财经新闻和投资直播，频繁调整持仓。年终一算亏了15%。问题出在哪？"
        options={[
          { label: "看的信息还不够多", feedback: "不是不够多，是太多了。信息过载导致频繁操作，频繁操作导致亏损。" },
          { label: "信息过载导致频繁操作，应该制定计划后少看少动", feedback: "对！过多的信息不会让你更聪明，只会让你更焦虑和冲动。", correct: true },
          { label: "运气不好", feedback: "不是运气。研究表明频繁交易的投资者收益普遍更差。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>99%的财经新闻对长期投资没有意义</li>
          <li>信息过载导致分析瘫痪和频繁操作</li>
          <li>减少信息源，定期而非实时查看账户</li>
          <li>远离标题党和"稳赚不赔"的承诺</li>
          <li>少看、少动、多等待</li>
        </ul>
      </div>
    </>
  );
}