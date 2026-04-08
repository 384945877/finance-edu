"use client";
import Quiz from "@/components/Quiz";

export default function MorningstarRating() {
  return (
    <>
      <h2>晨星评级 = 基金的体检报告</h2>
      <p>晨星是全球最权威的基金评级机构。它的星级评级（1-5星）是根据<strong>风险调整后收益</strong>算出来的——不是谁涨得多就给高分，而是看性价比。</p>
      <div className="knowledge-card">
        <div className="card-icon">&#x2B50;</div>
        <h3>星级怎么看？</h3>
      </div>
      <ul>
        <li><strong>5星</strong> — 同类基金中风险调整收益排前10%</li>
        <li><strong>4星</strong> — 排前10%-32.5%</li>
        <li><strong>3星</strong> — 中间35%</li>
        <li><strong>2星和1星</strong> — 后面的32.5%和10%</li>
      </ul>
      <h2>除了星级还要看什么？</h2>
      <ul>
        <li><strong>晨星风格箱</strong> — 9宫格分类：大盘/中盘/小盘 &times; 价值/平衡/成长</li>
        <li><strong>基金经理评分</strong> — 铜/银/金牌经理，越高越好</li>
        <li><strong>费率评分</strong> — 低费率基金长期优势明显</li>
        <li><strong>最大回撤</strong> — 基金从最高点跌到最低点的幅度</li>
      </ul>
      <blockquote>
        4星和5星基金值得深入研究，但不能只看星级买。星级是回顾过去3-5年的表现，不代表未来。
      </blockquote>
      <Quiz
        question="一只3星基金近半年涨了50%，一只5星基金近半年只涨了8%。选哪个？"
        options={[
          { label: "选3星的，涨得多说明更好", feedback: "短期涨幅不代表长期质量。5星评级是看3-5年风险调整后的收益，含金量更高。" },
          { label: "倾向5星，长期风险调整收益更重要", feedback: "对！短期暴涨可能是赌对了风口，5星是穿越周期的稳定表现。", correct: true },
          { label: "都不选，星级没用", feedback: "晨星评级是全球最被认可的基金评价体系之一，很有参考价值。" },
        ]}
      />
      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>晨星评级基于风险调整后收益，不是简单看涨幅</li>
          <li>5星 = 同类前10%，但只代表过去不保证未来</li>
          <li>还要看风格箱、经理评分、费率、回撤</li>
          <li>4-5星基金是好的起点，但不能只看星级做决策</li>
        </ul>
      </div>
    </>
  );
}