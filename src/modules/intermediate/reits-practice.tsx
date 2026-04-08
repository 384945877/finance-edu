"use client";
import Quiz from "@/components/Quiz";
export default function ReitsPractice() {
  return (<>
    <h2>小钱投资大房产</h2>
    <p>REITs（不动产投资信托）让你用几百块就能投资写字楼、商场、仓库。<strong>每年必须把90%以上利润分红</strong>，是收息利器。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F3E2;</div><h3>REITs 核心优势</h3></div>
    <ul>
      <li><strong>分红率高</strong> — 法律要求90%利润分红，股息率通常4-8%</li>
      <li><strong>流动性好</strong> — 在交易所买卖，不像实体房产卖不掉</li>
      <li><strong>分散风险</strong> — 底层是多个物业组合</li>
      <li><strong>抗通胀</strong> — 租金会随物价上涨</li>
    </ul>
    <h2>REITs 风险</h2>
    <ul>
      <li><strong>利率上升</strong> — 加息周期REITs表现通常较差</li>
      <li><strong>经济衰退</strong> — 空置率上升影响租金收入</li>
      <li><strong>底层物业质量</strong> — 有些REITs持有的物业质量参差不齐</li>
    </ul>
    <blockquote>REITs适合想要稳定现金流的投资者。把它当债券看，不要期望大涨。</blockquote>
    <Quiz question="REITs最大的吸引力是？"
      options={[
        { label: "股价涨幅大", feedback: "REITs主要赚分红，股价涨幅通常不如成长股。" },
        { label: "强制高分红带来的稳定现金流", feedback: "对！90%利润分红是REITs最核心的吸引力，适合追求稳定收入的投资者。", correct: true },
        { label: "零风险", feedback: "REITs有利率风险、经济周期风险等，不是零风险。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>REITs用小钱投资房地产，强制高分红</li><li>适合追求稳定现金流的投资者</li><li>利率上升和经济衰退是主要风险</li></ul>
    </div>
  </>);
}
