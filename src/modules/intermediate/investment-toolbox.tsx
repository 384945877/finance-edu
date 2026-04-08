"use client";
import Quiz from "@/components/Quiz";
export default function InvestmentToolbox() {
  return (<>
    <h2>好用的App和网站</h2>
    <p>工欲善其事，必先利其器。这些<strong>免费工具</strong>能帮你做研究、看行情、管组合。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F9F0;</div><h3>投资工具推荐</h3></div>
    <ul>
      <li><strong>行情看盘</strong> — 东方财富App、同花顺（免费实时行情）</li>
      <li><strong>基金筛选</strong> — 天天基金网、晨星中国（评级和数据）</li>
      <li><strong>估值查询</strong> — 蛋卷估值、且慢（PE/PB百分位）</li>
      <li><strong>财报分析</strong> — 巨潮资讯（官方财报）、雪球（社区讨论）</li>
      <li><strong>组合管理</strong> — 且慢、蛋卷、有知有行（跟投组合）</li>
      <li><strong>记账理财</strong> — 随手记、挖财（收支管理）</li>
    </ul>
    <h2>使用原则</h2>
    <ul>
      <li><strong>数据用官方的</strong> — 财报去巨潮，不要信小道消息</li>
      <li><strong>社区仅供参考</strong> — 雪球/东财股吧有价值但噪音更多</li>
      <li><strong>免费够用</strong> — 不需要花钱买高级会员，免费功能足够</li>
    </ul>
    <blockquote>工具只是辅助。最重要的永远是你的判断框架和投资纪律。</blockquote>
    <Quiz question="在社区看到有人推荐一只股票，配了很多技术分析图。你应该？"
      options={[
        { label: "分析那么详细肯定靠谱，跟着买", feedback: "社区推荐可能有利益驱动。详细不等于正确，需要独立验证。" },
        { label: "参考但不盲从，自己验证基本面后再决定", feedback: "对！社区信息可以作为线索，但决策必须基于自己的独立分析。", correct: true },
        { label: "完全不看社区，浪费时间", feedback: "社区有价值的观点和线索，完全不看也是一种损失。关键是辨别能力。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>善用免费工具做研究和管理</li><li>数据用官方渠道，社区仅供参考</li><li>工具辅助判断，不能替代思考</li></ul>
    </div>
  </>);
}
