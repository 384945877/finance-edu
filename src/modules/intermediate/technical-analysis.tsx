"use client";
import Quiz from "@/components/Quiz";
export default function TechnicalAnalysis() {
  return (<>
    <h2>K线图不是玄学</h2>
    <p>K线（蜡烛图）是记录股价走势最基本的工具。每根K线包含<strong>开盘价、收盘价、最高价、最低价</strong>四个信息。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F4C9;</div><h3>基础K线形态</h3></div>
    <ul>
      <li><strong>阳线（红/绿色实体）</strong> — 收盘价高于开盘价，当天涨了</li>
      <li><strong>阴线</strong> — 收盘价低于开盘价，当天跌了</li>
      <li><strong>上影线长</strong> — 冲高回落，上方有压力</li>
      <li><strong>下影线长</strong> — 探底回升，下方有支撑</li>
      <li><strong>十字星</strong> — 多空拉锯，可能变盘</li>
    </ul>
    <h2>常用技术指标</h2>
    <ul>
      <li><strong>MA（均线）</strong> — 5日/20日/60日均线，判断趋势方向</li>
      <li><strong>MACD</strong> — 金叉买入信号，死叉卖出信号</li>
      <li><strong>成交量</strong> — 放量上涨是好事，缩量下跌不必恐慌</li>
      <li><strong>布林带</strong> — 价格触及上轨可能回调，触及下轨可能反弹</li>
    </ul>
    <blockquote>技术分析不能预测未来，但能帮你读懂市场情绪。结合基本面使用效果更好。</blockquote>
    <Quiz question="一只股票放量突破20日均线，MACD金叉。这通常意味着？"
      options={[
        { label: "一定会涨，马上满仓", feedback: "没有什么是一定的。技术信号只是概率工具，不能满仓梭哈。" },
        { label: "短期多头信号较强，可以适量参与", feedback: "对！放量突破均线+MACD金叉是较强的多头信号，但仍需控制仓位。", correct: true },
        { label: "技术分析没用，不用看", feedback: "技术分析有其局限性，但作为辅助判断工具还是有价值的。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>K线记录开盘/收盘/最高/最低四个价格</li><li>均线判断趋势，MACD判断买卖时机</li><li>成交量是验证信号的关键</li><li>技术分析是辅助工具，不是水晶球</li></ul>
    </div>
  </>);
}