"use client";
import Quiz from "@/components/Quiz";
export default function BrokerSelection() {
  return (<>
    <h2>佣金、功能、服务对比</h2>
    <p>券商是你投资的入口。选对券商能省钱、省心、提高效率。<strong>佣金低 + App好用 + 服务好</strong>是核心标准。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F3EA;</div><h3>选券商三要素</h3></div>
    <ul>
      <li><strong>佣金</strong> — 万1.2-万1.5是合理水平，超过万2就太高了</li>
      <li><strong>App体验</strong> — 交易顺畅、行情快、功能全</li>
      <li><strong>研报和工具</strong> — 好券商提供高质量研报和智能工具</li>
    </ul>
    <h2>各类券商特点</h2>
    <ul>
      <li><strong>头部券商</strong>（中信/华泰/招商） — 研报好、功能全、但佣金可能略高</li>
      <li><strong>互联网券商</strong>（东方财富/同花顺） — 佣金低、开户快、社区活跃</li>
      <li><strong>港美股券商</strong>（富途/老虎/盈透） — 投资全球、但监管在海外</li>
    </ul>
    <blockquote>券商账户是免费的，可以多开几家，比较了再决定主力使用哪个。</blockquote>
    <Quiz question="选券商时最重要的是？"
      options={[
        { label: "名气大就好", feedback: "名气不等于适合你。佣金、体验和服务才是日常使用的关键。" },
        { label: "综合考虑佣金、App体验和服务质量", feedback: "对！三者结合才能选出最适合自己的券商。", correct: true },
        { label: "只看佣金最低的", feedback: "佣金重要但不是唯一标准。App卡顿或服务差会带来更大的隐性成本。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>佣金万1.5以下是合理水平</li><li>综合佣金+体验+服务选券商</li><li>可以多开几家对比</li></ul>
    </div>
  </>);
}
