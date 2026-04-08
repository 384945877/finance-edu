"use client";

import Quiz from "@/components/Quiz";

export default function StockBasics() {
  return (
    <>
      <h2>买股票 = 买公司的一小块</h2>
      <p>
        你买了腾讯的股票，你就是腾讯的<strong>股东</strong>——虽然只占0.0000001%，但你确实拥有了这家公司的一小部分。公司赚钱你分红，股价涨了你赚差价。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🏢</div>
        <h3>股票赚钱的两种方式</h3>
      </div>
      <ul>
        <li><strong>价差收益</strong> — 低买高卖。10块买的涨到15块卖，赚5块</li>
        <li><strong>分红收益</strong> — 公司把利润的一部分发给股东。稳定分红的叫"红利股"</li>
      </ul>

      <h2>股票的风险有多大？</h2>
      <ul>
        <li>A股单日涨跌幅限制：±10%（创业板/科创板±20%）</li>
        <li>一年翻倍和一年腰斩都很常见</li>
        <li>个股风险极大：一家公司可以暴雷归零（如某某地产）</li>
        <li>但长期来看，整个市场（指数）是上涨的</li>
      </ul>

      <div className="knowledge-card">
        <div className="card-icon">⚠️</div>
        <h3>新手最常犯的错误</h3>
      </div>
      <ul>
        <li><strong>追涨杀跌</strong> — 涨了才买，跌了就卖，完美错过每一波</li>
        <li><strong>满仓一只股</strong> — 把所有钱押一家公司，赌赢赚翻但赌输归零</li>
        <li><strong>短线炒作</strong> — 频繁买卖，手续费吃掉大部分利润</li>
        <li><strong>听消息炒股</strong> — 等你听到"内幕消息"时，早就被priced in了</li>
      </ul>

      <blockquote>
        对大多数人来说，买个股不如买指数基金。如果你一定要买个股，用不超过总资产10%的钱去"试水"。
      </blockquote>

      <Quiz
        question="小林第一次炒股，同事推荐了一只'内部消息说要涨'的股票。他应该？"
        options={[
          { label: "赶紧买，内部消息肯定准", feedback: "所谓的'内部消息'到你耳朵里时，已经是公开信息了。散户听到的永远是最后一手。" },
          { label: "不盲目跟风，自己研究或直接买指数基金", feedback: "对！投资决策要基于自己的分析，不是别人的'小道消息'。", correct: true },
          { label: "把所有积蓄都投进去，搏一搏", feedback: "千万不要！这是最典型的新手错误——满仓+听消息+博一把。" },
        ]}
      />

      <Quiz
        question="下面哪种投资方式风险最可控？"
        options={[
          { label: "买一只个股", feedback: "单只个股风险极大，可能暴涨也可能暴跌。" },
          { label: "买沪深300指数基金", feedback: "对！指数基金分散了个股风险，持有300家公司，不会因为一家出事就亏光。", correct: true },
          { label: "两种风险一样大", feedback: "完全不同。一只个股可以归零，但300只股票同时归零基本不可能。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>股票 = 拥有公司的一小部分</li>
          <li>赚钱靠价差和分红</li>
          <li>个股风险极大，不要满仓单股</li>
          <li>新手要避免追涨杀跌、听消息炒股</li>
          <li>大部分人买指数基金比买个股更合适</li>
        </ul>
      </div>
    </>
  );
}