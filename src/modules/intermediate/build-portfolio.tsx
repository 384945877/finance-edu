"use client";
import Quiz from "@/components/Quiz";
export default function BuildPortfolio() {
  return (<>
    <h2>从理论到实操</h2>
    <p>学了那么多，是时候真正构建一个投资组合了。<strong>核心-卫星策略</strong>是最适合普通人的框架。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F9E9;</div><h3>核心-卫星策略</h3></div>
    <ul>
      <li><strong>核心仓位(70%)</strong> — 宽基指数基金/ETF（沪深300/标普500），长期持有</li>
      <li><strong>卫星仓位(20%)</strong> — 行业/主题基金，阶段性配置</li>
      <li><strong>机动仓位(10%)</strong> — 个股/可转债/另类资产，小仓位博弈</li>
    </ul>
    <h2>构建第一个组合</h2>
    <ul>
      <li><strong>第一步</strong> — 确定股债比例。25岁可以股7债3，40岁股5债5</li>
      <li><strong>第二步</strong> — 股票部分用宽基ETF为主</li>
      <li><strong>第三步</strong> — 债券部分用纯债基金</li>
      <li><strong>第四步</strong> — 加5%黄金做分散</li>
      <li><strong>第五步</strong> — 每半年再平衡一次</li>
    </ul>
    <blockquote>完美的组合不存在。重要的是有一个合理的框架，然后坚持执行。</blockquote>
    <Quiz question="25岁月入1万，想构建第一个投资组合。哪个方案更合理？"
      options={[
        { label: "全仓买一只股票", feedback: "太集中了。全仓单股风险极大，不是投资组合。" },
        { label: "70%沪深300ETF + 20%债基 + 10%黄金ETF", feedback: "对！简单、分散、可执行，非常适合年轻人的第一个组合。", correct: true },
        { label: "全买货币基金", feedback: "太保守了。25岁有很长的时间跨度，应该承担适度的风险获取更高收益。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>核心-卫星-机动三层结构</li><li>核心仓位用宽基ETF长期持有</li><li>根据年龄确定股债比例</li><li>每半年再平衡</li></ul>
    </div>
  </>);
}
