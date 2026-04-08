"use client";

import Quiz from "@/components/Quiz";

export default function WhatIsMoney() {
  return (
    <>
      <h2>你每天都在用的东西，你真的了解它吗？</h2>
      <p>
        打开手机扫个码，一杯奶茶到手。但你有没有想过：<strong>为什么一张纸、一串数字，就能换来实实在在的东西？</strong>
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🪙</div>
        <h3>钱的三个超能力</h3>
      </div>
      <ul>
        <li><strong>交易媒介</strong> — 你不用扛着一袋大米去换理发，有钱就行</li>
        <li><strong>价值尺度</strong> — 一杯奶茶15块、一部手机5000块，钱帮你比较一切</li>
        <li><strong>价值储存</strong> — 今天赚的钱可以明天再花（但这里有个坑，后面会讲）</li>
      </ul>

      <h2>钱的进化史：5分钟版</h2>
      <div className="knowledge-card">
        <div className="card-icon">📜</div>
        <h3>从贝壳到手机支付</h3>
      </div>
      <p>人类用过的"钱"比你想象的丰富得多：</p>
      <ul>
        <li><strong>物物交换时代</strong> — 我有鱼你有盐，交换就行。但问题是：你想要鱼，养鱼的人不想要你的草鞋怎么办？</li>
        <li><strong>贝壳/贵金属</strong> — 找一个大家都认的"中间物"。金银之所以被选中，因为稀缺、不会坏、容易分割</li>
        <li><strong>纸币</strong> — 宋朝的"交子"是世界最早的纸币。本质是一张"欠条"，代表背后有真金白银</li>
        <li><strong>信用货币</strong> — 现在的人民币背后没有黄金了，靠的是国家信用。政府说它值钱，大家就用</li>
        <li><strong>数字支付</strong> — 微信支付、支付宝让钱变成了屏幕上的数字。钱的"形态"消失了，但本质没变</li>
      </ul>

      <blockquote>
        钱的形态一直在变，但核心功能 3000 年没变过：交易、衡量、储存。
      </blockquote>

      <h2>一个关键认知：钱本身不是财富</h2>
      <p>
        很多人把"有钱"等同于"有财富"，其实不完全对。
      </p>
      <p>
        <strong>钱只是一种工具</strong>——它代表购买力，但购买力会随时间变化。100块钱在2005年能买到的东西，和2025年能买到的完全不同。
      </p>
      <p>
        这就引出了理财的核心问题：<strong>如何让你的购买力不缩水，甚至增长？</strong>这是后面所有模块要解决的事。
      </p>

      <Quiz
        question="小明攒了10万块现金锁在保险柜里，3年后拿出来。这10万块怎么了？"
        options={[
          { label: "还是10万，一分没少", feedback: "数字确实没变，但购买力下降了。物价上涨后，同样的钱能买到的东西变少了。" },
          { label: "虽然还是10万，但实际能买到的东西变少了", feedback: "对！这就是通货膨胀的效果。钱的数字没变，但'值'变了。", correct: true },
          { label: "会变多，因为钱放着会升值", feedback: "现金放着不会自动变多哦。只有投资或存入有利息的账户才会增长。" },
        ]}
        explanation="现金不会自动增值，但物价每年都在涨。所以把钱放在那里不动，其实是在'隐形亏损'——这就是我们后面要讲的'通货膨胀'。"
      />

      <Quiz
        question="以下哪个说法最准确？"
        options={[
          { label: "人民币之所以有价值，是因为背后有黄金", feedback: "1971年全球已经脱离了金本位。现在的货币背后没有黄金支撑。" },
          { label: "人民币的价值来源于国家信用和法律规定", feedback: "完全正确！现代货币是'法定货币(fiat money)'，由政府信用背书。", correct: true },
          { label: "人民币本身就是财富", feedback: "钱只是交换工具，不是财富本身。真正的财富是它能买到的商品和服务。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>钱有三个核心功能：交易、衡量、储存</li>
          <li>钱的形态从贝壳演变到数字，但本质不变</li>
          <li>现代货币靠国家信用支撑，不再有黄金背书</li>
          <li>钱 &ne; 财富，钱只是购买力的载体</li>
          <li>放着不动的钱会因为通胀而贬值</li>
        </ul>
      </div>
    </>
  );
}