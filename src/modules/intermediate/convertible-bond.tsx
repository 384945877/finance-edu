"use client";
import Quiz from "@/components/Quiz";
export default function ConvertibleBond() {
  return (<>
    <h2>下有保底，上不封顶</h2>
    <p>可转债 = 可以转换成股票的债券。跌了它是债券有保底（面值100元），涨了可以转成股票赚更多。<strong>攻守兼备的品种</strong>。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F504;</div><h3>可转债核心概念</h3></div>
    <ul>
      <li><strong>面值100元</strong> — 到期会按面值+利息还给你，这是保底</li>
      <li><strong>转股价</strong> — 可以按这个价格把债券转成正股</li>
      <li><strong>转股溢价率</strong> — 越低越好，说明可转债和正股联动越紧密</li>
      <li><strong>双低策略</strong> — 价格低(接近100)+溢价率低，是最安全的玩法</li>
    </ul>
    <h2>可转债风险</h2>
    <ul>
      <li><strong>正股暴雷</strong> — 公司出问题可转债也会跌破面值</li>
      <li><strong>强赎条款</strong> — 正股涨太多公司会强制赎回，要及时卖出</li>
      <li><strong>炒作风险</strong> — 小盘可转债容易被游资炒到200-300，追高会被套</li>
    </ul>
    <blockquote>可转债是新手进阶的好工具。100元附近买入，耐心持有，风险收益比非常好。</blockquote>
    <Quiz question="一只可转债价格98元，转股溢价率5%，正股基本面不错。值得买吗？"
      options={[
        { label: "不买，价格太低说明不好", feedback: "恰恰相反！接近面值的可转债保底性强，溢价率低联动好，是不错的机会。" },
        { label: "符合双低策略，可以适量配置", feedback: "对！低价+低溢价率的可转债风险收益比很好，是双低策略的理想标的。", correct: true },
        { label: "全仓买，稳赚不赔", feedback: "可转债有保底但不是稳赚。正股暴雷可以跌破面值，不要全仓。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>可转债 = 债券+股票期权</li><li>双低策略：低价格+低溢价率</li><li>面值100元是保底参考</li><li>注意强赎条款和炒作风险</li></ul>
    </div>
  </>);
}
