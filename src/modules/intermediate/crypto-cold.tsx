"use client";
import Quiz from "@/components/Quiz";
export default function CryptoCold() {
  return (<>
    <h2>比特币的真相</h2>
    <p>加密货币是过去10年最火也最有争议的资产。比特币从几毛钱涨到几万美元，也经历过多次腰斩。<strong>高波动、高风险、不可预测</strong>。</p>
    <div className="knowledge-card"><div className="card-icon">&#x20BF;</div><h3>你需要知道的事实</h3></div>
    <ul>
      <li><strong>总量有限</strong> — 比特币只有2100万个，这是它价值逻辑的基础</li>
      <li><strong>波动极大</strong> — 一天涨跌20%是常事，一年翻倍或腰斩都正常</li>
      <li><strong>监管不确定</strong> — 各国政策不同，中国禁止交易所</li>
      <li><strong>不产生现金流</strong> — 和股票不同，加密货币没有分红和利润</li>
    </ul>
    <h2>如果你一定要配置</h2>
    <ul>
      <li><strong>不超过总资产5%</strong> — 亏光了也不影响生活</li>
      <li><strong>只买BTC/ETH</strong> — 其他山寨币风险更大</li>
      <li><strong>长期持有</strong> — 不要试图短线炒作</li>
      <li><strong>做好归零准备</strong> — 把投入的钱当作已经花掉了</li>
    </ul>
    <blockquote>加密货币是可选的小仓位卫星配置，不是核心资产。不懂就不碰�碰了就不怕归零。</blockquote>
    <Quiz question="朋友推荐一个新发行的加密货币，说能涨100倍。你应该？"
      options={[
        { label: "赶紧买，100倍很诱人", feedback: "99%的新币最终归零。所谓100倍承诺几乎都是骗局。" },
        { label: "远离山寨币，如果要配置只考虑BTC/ETH", feedback: "对！山寨币绝大多数是骗局或泡沫。如果要配置加密资产，只考虑主流币。", correct: true },
        { label: "投一点试试运气", feedback: "投资不是赌博。不了解的东西不要碰，尤其是号称百倍回报的。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>加密货币波动极大，不产生现金流</li><li>配置不超过总资产5%</li><li>只考虑BTC/ETH，远离山寨币</li><li>做好归零准备</li></ul>
    </div>
  </>);
}
