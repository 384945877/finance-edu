"use client";
import Quiz from "@/components/Quiz";
export default function ReverseRepo() {
  return (<>
    <h2>躺赚无风险收益</h2>
    <p>国债逆回购 = 你把钱借给别人，对方用国债做抵押。到期还你本金+利息。<strong>零风险、超短期、收益随行就市</strong>。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F4B0;</div><h3>逆回购实操</h3></div>
    <ul>
      <li><strong>品种</strong> — 1天/2天/3天/7天/14天/28天，最短1天</li>
      <li><strong>门槛</strong> — 深市1000元起，沪市10万元起</li>
      <li><strong>时机</strong> — 月末/季末/年末资金紧张时利率飙升，是操作好时机</li>
      <li><strong>操作</strong> — 券商App搜索"逆回购"，选品种，输入金额，一键操作</li>
    </ul>
    <h2>什么时候做逆回购？</h2>
    <ul>
      <li><strong>闲钱过夜</strong> — 股票卖了但第二天才能取，做1天逆回购</li>
      <li><strong>节假日前</strong> — 周四做1天逆回购，享受3天利息（周五六日）</li>
      <li><strong>季末冲量</strong> — 6月末/12月末利率可能飙到10%以上</li>
    </ul>
    <blockquote>逆回购不是用来赚大钱的，而是让你的闲钱不要白白躺着。</blockquote>
    <Quiz question="周四下午你有10万闲钱在证券账户里，最聪明的做法是？"
      options={[
        { label: "放着不动，反正明天能用", feedback: "白白浪费3天利息！周四做1天逆回购，享受周五六日三天的利息。" },
        { label: "做1天逆回购，赚3天利息", feedback: "对！周四做1天逆回购是经典操作——实际享受周五六日3天利息，且周五资金自动可用。", correct: true },
        { label: "买股票", feedback: "如果你没有明确看好的标的，让闲钱做逆回购是更稳妥的选择。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul><li>国债逆回购 = 把钱借出去赚利息，国债做抵押零风险</li><li>周四做1天逆回购享受3天利息</li><li>季末/年末利率更高</li><li>适合管理证券账户闲钱</li></ul>
    </div>
  </>);
}
