"use client";

import Quiz from "@/components/Quiz";

export default function ChasingMarkets() {
  return (
    <>
      <h2>为什么你总买在最高点？</h2>
      <p>
        市场涨了三个月，朋友圈都在晒收益，你忍不住冲进去——然后市场掉头暴跌。你慌了，割肉卖出——然后市场又涨回来了。<strong>这就是追涨杀跌</strong>，90%的散户都在重复这个死循环。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F3A2;</div>
        <h3>追涨杀跌的心理机制</h3>
      </div>
      <ul>
        <li><strong>FOMO（错失恐惧）</strong>— 别人都赚钱了，我不能落下</li>
        <li><strong>损失厌恶</strong>— 亏1000的痛苦是赚1000快乐的2.5倍</li>
        <li><strong>羊群效应</strong>— 大家都在买/卖，我也跟着</li>
        <li><strong>近因偏差</strong>— 最近涨了=以后也会涨（其实不一定）</li>
      </ul>

      <h2>数据告诉你有多惨</h2>
      <p>
        研究表明：如果你在过去20年里<strong>错过了涨幅最大的10个交易日</strong>，你的总收益会减少一半以上。而这10天往往出现在暴跌之后——刚好是你恐慌卖出的时候。
      </p>

      <blockquote>
        市场最赚钱的日子，往往出现在最恐慌的时刻。追涨杀跌的人，两头都错过。
      </blockquote>

      <h2>怎么避免？</h2>
      <ul>
        <li><strong>定投</strong> — 不择时，自动买入，消除情绪干扰</li>
        <li><strong>设定止损/止盈规则</strong> — 提前定好在什么条件下买/卖，严格执行</li>
        <li><strong>少看盘</strong> — 每天盯着账户看只会增加焦虑和冲动操作</li>
        <li><strong>投资日记</strong> — 记录你每次买卖的理由，事后复盘</li>
      </ul>

      <Quiz
        question="市场连涨3个月后，朋友圈都在说'牛市来了'。你应该？"
        options={[
          { label: "赶紧全仓杀入，牛市不能错过", feedback: "当所有人都在喊牛市时，往往是最危险的时候。聪明钱已经在撤了。" },
          { label: "按原计划继续定投，不因市场情绪改变策略", feedback: "对！不被市场情绪带节奏，按纪律执行，是避免追涨杀跌的最好方法。", correct: true },
          { label: "先等等，看看再说", feedback: "观望本身不是坏事，但如果你本来就有定投计划，应该继续执行而不是暂停。" },
        ]}
      />

      <Quiz
        question="以下哪种行为最容易导致亏损？"
        options={[
          { label: "每月自动定投不看账户", feedback: "这反而是最健康的投资方式。" },
          { label: "看到暴跌就恐慌卖出，看到暴涨就追入", feedback: "没错！这就是经典的追涨杀跌——高买低卖，必亏模式。", correct: true },
          { label: "持有3年不动", feedback: "长期持有是很好的策略，不容易亏损。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>追涨杀跌 = 高买低卖，是亏损的主要原因</li>
          <li>FOMO和损失厌恶是罪魁祸首</li>
          <li>定投+少看盘是最好的解药</li>
          <li>错过最好的10个交易日，收益减半</li>
          <li>投资要有纪律，不被情绪左右</li>
        </ul>
      </div>
    </>
  );
}