"use client";
import Quiz from "@/components/Quiz";
export default function AnnualCheckup() {
  return (<>
    <h2>每年必做的复盘清单</h2>
    <p>就像身体需要年度体检，你的财务状况也需要每年做一次全面检查。<strong>年度财务体检</strong>能帮你发现问题、调整策略。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1FA7A;</div><h3>年度体检清单</h3></div>
    <ul>
      <li><strong>资产清点</strong> — 列出所有资产和负债，算净资产</li>
      <li><strong>收益复盘</strong> — 今年赚了多少？跑赢了沪深300吗？</li>
      <li><strong>持仓审视</strong> — 每只持仓还符合买入逻辑吗？要不要调整？</li>
      <li><strong>费用审计</strong> — 今年花了多少交易费？基金管理费？</li>
      <li><strong>保险检查</strong> — 保额够不够？有没有重复投保？</li>
      <li><strong>再平衡</strong> — 股债比例是否偏离了目标？需要调回来</li>
      <li><strong>目标更新</strong> — 生活变化了吗？投资目标需要调整吗？</li>
    </ul>
    <h2>体检时间表</h2>
    <ul>
      <li><strong>每月</strong> — 快速看一眼收益和持仓（5分钟）</li>
      <li><strong>每季度</strong> — 检查基金经理是否变更、持仓是否偏移（15分钟）</li>
      <li><strong>每年</strong> — 全面体检+再平衡+目标更新（1-2小时）</li>
    </ul>
    <blockquote>投资不是设定了就不管。但也不需要每天看。找到适合自己的检查频率。</blockquote>
    <Quiz question="你的目标是股7债3，年底发现变成了股8.5债1.5。应该怎么做？"
      options={[
        { label: "不管，涨了就好", feedback: "比例偏离说明风险暴露增加了。牛市过后可能面临更大回撤。" },
        { label: "再平衡，卖出部分股票买入债券回到7:3", feedback: "对！再平衡是年度体检最重要的动作。把偏离的比例调回目标，控制风险。", correct: true },
        { label: "全部转成债券", feedback: "过度反应了。只需要微调回目标比例，不需要大幅改变策略。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>每年做一次全面财务体检</li><li>核心动作：清点资产、复盘收益、再平衡</li><li>每月5分钟快看，每年1-2小时深度复盘</li><li>生活变化时及时更新投资目标</li></ul>
    </div>
  </>);
}
