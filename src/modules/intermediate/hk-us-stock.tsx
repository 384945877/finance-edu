"use client";
import Quiz from "@/components/Quiz";
export default function HkUsStock() {
  return (<>
    <h2>投资全球市场</h2>
    <p>A股之外还有更大的世界。港股和美股有<strong>很多A股买不到的优质公司</strong>——腾讯在港股，苹果/特斯拉/英伟达在美股。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F30D;</div><h3>三种投资海外的方式</h3></div>
    <ul>
      <li><strong>港股通/沪港通</strong> — 通过A股券商直接买港股，门槛50万</li>
      <li><strong>QDII基金</strong> — 通过基金间接投资海外，门槛10块起</li>
      <li><strong>港美股券商</strong> — 富途/老虎/盈透，开户直接交易，门槛低</li>
    </ul>
    <h2>港美股注意事项</h2>
    <ul>
      <li><strong>交易时间不同</strong> — 美股北京时间晚9:30到凌晨4:00</li>
      <li><strong>汇率风险</strong> — 赚了股价差但亏了汇率，或者相反</li>
      <li><strong>税务</strong> — 美股股息要扣30%预扣税</li>
      <li><strong>无涨跌停</strong> — 港股和美股没有涨跌幅限制，波动可能很大</li>
    </ul>
    <blockquote>不要因为A股不好就觉得海外市场一定好。全球配置是分散风险，不是追收益。</blockquote>
    <Quiz question="小李想买腾讯股票，最便捷的方式是？"
      options={[
        { label: "在A股券商直接搜索腾讯", feedback: "腾讯在港股上市，A股买不到。需要通过港股通或港美股券商。" },
        { label: "开通港股通或港美股券商账户", feedback: "对！港股通门槛50万，港美股券商门槛更低。选适合自己的方式。", correct: true },
        { label: "买腾讯相关的A股公司", feedback: "这不是买腾讯，是买和腾讯有关的其他公司，风险完全不同。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>港股通/QDII基金/港美股券商三种渠道</li><li>注意汇率风险和税务问题</li><li>海外市场无涨跌停，波动更大</li><li>全球配置是分散风险的手段</li></ul>
    </div>
  </>);
}