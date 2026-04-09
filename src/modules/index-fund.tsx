"use client";

import Quiz from "@/components/Quiz";

export default function IndexFund() {
  return (
    <>
      <h2>巴菲特给普通人的唯一建议</h2>
      <p>
        巴菲特在遗嘱中给妻子的投资建议只有一句话：<strong>{"\u201c"}把90%的钱放到低费率的标普500指数基金里{"\u201d"}</strong>。为什么股神推荐指数基金？
      </p>

      <div className="knowledge-card">
        <div className="card-icon">📈</div>
        <h3>指数基金是什么？</h3>
      </div>
      <p>
        指数基金不需要基金经理去选股，它直接<strong>复制一个指数的成分股</strong>。比如沪深300指数基金就买沪深300里的所有股票，涨跌跟指数基本一致。
      </p>

      <h2>指数基金 vs 主动基金</h2>
      <ul>
        <li><strong>主动基金</strong>：基金经理选股，费率高（管理费1-1.5%），业绩看经理水平</li>
        <li><strong>指数基金</strong>：跟踪指数，费率低（管理费0.1-0.5%），业绩看市场整体表现</li>
      </ul>
      <p>
        研究表明：<strong>长期来看，80%以上的主动基金跑不赢指数</strong>。也就是说大部分基金经理还不如"不选股"。
      </p>

      <h2>中国常见的指数</h2>
      <div className="knowledge-card">
        <div className="card-icon">🇨🇳</div>
        <h3>你应该知道的几个指数</h3>
      </div>
      <ul>
        <li><strong>沪深300</strong> — A股最大的300家公司，代表大盘蓝筹</li>
        <li><strong>中证500</strong> — 第301-800名，代表中小盘</li>
        <li><strong>创业板指</strong> — 科技成长型公司为主</li>
        <li><strong>中证全指</strong> — 覆盖面最广，接近"买入整个A股"</li>
        <li><strong>标普500（美股）</strong> — 美国500家最大公司，全球最知名指数</li>
      </ul>

      <blockquote>
        指数基金的核心优势：费率低、分散好、不依赖某个人的判断、长期收益跑赢大部分主动基金。
      </blockquote>

      <Quiz
        question="为什么巴菲特推荐指数基金而不是主动基金？"
        options={[
          { label: "因为指数基金收益更高", feedback: "不完全是'更高'，而是大部分主动基金长期跑不赢指数，加上高费率，实际到手更少。" },
          { label: "费率低+长期跑赢大部分主动基金", feedback: "正确！低费率+不靠人为判断+分散风险，是普通人最好的选择。", correct: true },
          { label: "因为巴菲特自己不会选股", feedback: "巴菲特是最会选股的人之一。但他认为普通人不需要选股，买指数就够了。" },
        ]}
      />

      <Quiz
        question="如果你想'买入整个中国大盘股市场'，应该选什么指数基金？"
        options={[
          { label: "货币基金", feedback: "货币基金投资的是短期债券，不是股票市场。" },
          { label: "沪深300指数基金", feedback: "正确！沪深300覆盖A股最大的300家公司，是大盘市场的代表。", correct: true },
          { label: "某某明星基金经理的基金", feedback: "那是主动基金，不是'买入整个市场'。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>指数基金 = 复制指数，不选股，费率低</li>
          <li>80%以上主动基金长期跑不赢指数</li>
          <li>沪深300、中证500是最常见的国内指数</li>
          <li>巴菲特推荐普通人买指数基金</li>
          <li>适合长期定投（后面会详细讲定投策略）</li>
        </ul>
      </div>
    </>
  );
}