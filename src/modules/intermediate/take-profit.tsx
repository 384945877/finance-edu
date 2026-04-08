"use client";
import Quiz from "@/components/Quiz";
export default function TakeProfit() {
  return (<>
    <h2>会买是徒弟，会卖是师傅</h2>
    <p>大部分人知道什么时候买，但不知道什么时候卖。<strong>止盈</strong>就是在赚钱的时候卖出，把利润从纸面变成真金白银。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F3AF;</div><h3>三种止盈策略</h3></div>
    <ul>
      <li><strong>目标收益率止盈</strong> — 设定一个目标（如+30%），到了就卖。简单粗暴但有效</li>
      <li><strong>估值止盈</strong> — PE百分位超过80%时分批止盈。适合指数基金</li>
      <li><strong>回撤止盈</strong> — 从最高点回撤超过10%就卖。保住大部分利润</li>
    </ul>
    <h2>止盈的心理陷阱</h2>
    <ul>
      <li><strong>&ldquo;还能再涨&rdquo;</strong> — 贪婪让你迟迟不卖，结果坐了过山车</li>
      <li><strong>&ldquo;卖了又涨&rdquo;后悔</strong> — 这是必然的，没人能卖在最高点。落袋为安</li>
      <li><strong>分批止盈</strong> — 不要一次性全卖，分3次卖出可以减少后悔</li>
    </ul>
    <blockquote>止盈不是为了卖在最高点，而是为了确保你赚到的钱不被吐回去。</blockquote>
    <Quiz question="你的基金赚了35%，设定的目标是30%。但最近还在涨。你应该？"
      options={[
        { label: "继续持有，能涨到50%再说", feedback: "已经超过目标了还不止盈，说明你在被贪婪驱动。万一回撤呢？" },
        { label: "按计划止盈，至少先卖出一部分", feedback: "对！纪律就是在该执行的时候执行。可以先卖2/3，留1/3博继续上涨。", correct: true },
        { label: "全部卖光", feedback: "一次性全卖也可以，但分批止盈心理更舒适，也保留了继续赚的可能。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul>
        <li>止盈三种方式：目标收益率、估值止盈、回撤止盈</li>
        <li>分批止盈减少心理负担</li>
        <li>纪律比感觉更重要</li>
        <li>落袋为安，不追求卖在最高点</li>
      </ul>
    </div>
  </>);
}