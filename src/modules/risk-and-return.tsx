"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";
import FlipCard from "@/components/motion/FlipCard";
import StorySimulator, { type SimStep, type SimStat } from "@/components/StorySimulator";

/* 互动：风险收益天平 */
function RiskReturnScale() {
  const assets = [
    { name: "银行活期", risk: 1, ret: 0.3, color: "#60a5fa" },
    { name: "货币基金", risk: 1.5, ret: 1.8, color: "#34d399" },
    { name: "国债", risk: 2, ret: 2.5, color: "#a78bfa" },
    { name: "债券基金", risk: 3, ret: 4, color: "#fbbf24" },
    { name: "指数基金", risk: 5, ret: 8, color: "#f97316" },
    { name: "个股", risk: 8, ret: 12, color: "#ef4444" },
    { name: "加密货币", risk: 10, ret: 20, color: "#ec4899" },
  ];
  const [selected, setSelected] = useState(0);
  const a = assets[selected];

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x2696;&#xFE0F; 风险收益天平</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {assets.map((asset, i) => (
          <button key={asset.name} onClick={() => setSelected(i)}
            className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
            style={{
              background: i === selected ? asset.color : "transparent",
              color: i === selected ? "#fff" : "var(--color-text-secondary)",
              border: `1px solid ${i === selected ? asset.color : "var(--border-subtle)"}`,
            }}>
            {asset.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>风险等级</div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${a.risk * 10}%`, background: a.color }} />
          </div>
          <div className="text-sm font-bold mt-1">{a.risk}/10</div>
        </div>
        <div>
          <div className="text-xs mb-1" style={{ color: "var(--color-text-muted)" }}>预期年化收益</div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${a.ret * 5}%`, background: "var(--color-brand)" }} />
          </div>
          <div className="text-sm font-bold mt-1">{a.ret}%</div>
        </div>
      </div>
      <p className="text-xs mt-3" style={{ color: "var(--color-text-secondary)" }}>
        风险越高，可能的收益越高，但亏损的可能性也越大。没有"高收益零风险"的东西。
      </p>
    </div>
  );
}

/* ---- 风险投资模拟器数据 ---- */
const riskStats: SimStat[] = [
  { label: "总资产", key: "total", prefix: "¥", color: "var(--color-brand)" },
  { label: "风险等级", key: "risk", suffix: "/10" },
  { label: "年化收益", key: "return", suffix: "%" },
];

const riskSteps: SimStep[] = [
  {
    id: "start", title: "第一笔投资", image: "💰",
    narrative: "你攒了50000块，打算开始投资。一个朋友推荐你一只「私募基金」，承诺年化15%保本。另一个朋友说不如买指数基金。你怎么选？",
    choices: [
      { text: "私募基金，15%保本听着不错", result: "3个月后这个「私募」跑路了，你的5万血本无归。保本+高收益 = 骗局最常见的包装。", effects: { total: -50000, risk: 10 }, isGood: false },
      { text: "指数基金，虽然慢但靠谱", result: "半年后赚了4%，不多但很稳。沪深300指数基金是大多数人最好的起步选择。", effects: { total: 2000, return: 8, risk: -2 }, isGood: true },
      { text: "先拿1万试试私募，4万买指数", result: "私募的1万没了，但指数的4万涨了4%赚1600。净亏8400。试水也有代价——骗局不分金额大小。", effects: { total: -8400, risk: 3 }, isGood: false },
    ],
  },
  {
    id: "crash", title: "市场大跌 -20%", image: "📉",
    narrative: "大盘突然暴跌20%，你的基金也跌了18%。朋友圈都在讨论要不要割肉。你的基金从52000跌到了42600。",
    choices: [
      { text: "赶紧卖！再跌就全没了", result: "你在最低点割肉了。统计显示恐慌抛售的人，90%在之后1年后悔，因为市场通常会反弹。", effects: { total: -9400, risk: -3 }, isGood: false },
      { text: "不动，长期持有穿越周期", result: "3个月后市场反弹了25%。你的42600变成了53250。坚持到底的人吃到了反弹红利。", effects: { total: 10650, return: 4 }, isGood: true },
      { text: "趁低价再买入一些", result: "越跌越买是巴菲特的策略。你在低点加仓1万，反弹后这1万涨了25%赚2500。", effects: { total: 13150, return: 6, risk: 2 }, isGood: true },
    ],
  },
  {
    id: "hype", title: "朋友推荐热门股", image: "🔥",
    narrative: "同事炫耀买了某AI概念股，一个月涨了40%。他说现在上车还来得及。你的基金稳稳的，但看着别人暴赚你心痒。",
    choices: [
      { text: "全仓冲进AI概念股", result: "你进去的第二周开始回调，一个月跌了30%。追涨杀跌是散户亏钱的首要原因。", effects: { total: -15000, risk: 5 }, isGood: false },
      { text: "拿10%的钱买着玩，大头不动", result: "用少量仓位满足好奇心，主力仓位保持纪律。这就是'卫星仓位'策略。", effects: { total: -500, risk: 1, return: -1 }, isGood: true },
      { text: "不跟风，继续定投指数", result: "半年后AI概念股跌回原价，你的指数基金又涨了6%。慢就是快。", effects: { total: 3000, return: 2 }, isGood: true },
    ],
  },
  {
    id: "diversify", title: "资产配置决策", image: "🎯",
    narrative: "一年过去了，你学了不少投资知识。现在你想重新规划投资组合。账户里有6万多，该怎么分配？",
    choices: [
      { text: "全部买收益最高的——股票基金", result: "下一次市场波动你可能损失30%+。单一资产 = 把鸡蛋放一个篮子。", effects: { total: -5000, risk: 5 }, isGood: false },
      { text: "60%指数基金 + 30%债券 + 10%货币", result: "经典的6/3/1配置。股票提供增长，债券平衡波动，货币保障流动性。这是最稳的组合之一。", effects: { total: 3000, risk: -3, return: 3 }, isGood: true },
      { text: "50%存银行，50%买股票", result: "两极分化的配置。银行部分几乎不赚钱，股票部分波动太大。不如找个中间地带。", effects: { total: 1000, risk: 1 }, isGood: false },
    ],
  },
];

export default function RiskAndReturn() {
  return (
    <>
      <h2>天下没有免费的午餐</h2>
      <p>
        如果有人告诉你<strong>{"\u201c"}保本年化15%{"\u201d"}</strong>——要么他在骗你，要么他自己也被骗了。金融世界有一条铁律：<strong>风险和收益是一对双胞胎</strong>。
      </p>

      {/* 翻转卡片：三种风险 */}
      <div className="grid grid-cols-3 gap-3 my-6">
        <FlipCard height={140}
          front={<><div className="text-xl mb-1">🌊</div><p className="text-xs font-bold">市场风险</p></>}
          back={<p className="text-xs leading-relaxed">整个市场下跌<br />所有人都亏<br />不可避免<br />只能用时间化解</p>}
        />
        <FlipCard height={140}
          front={<><div className="text-xl mb-1">💣</div><p className="text-xs font-bold">个别风险</p></>}
          back={<p className="text-xs leading-relaxed">某公司/产品暴雷<br />可以通过分散投资降低<br />不要把鸡蛋放一个篮子</p>}
        />
        <FlipCard height={140}
          front={<><div className="text-xl mb-1">📈</div><p className="text-xs font-bold">通胀风险</p></>}
          back={<p className="text-xs leading-relaxed">收益跑不赢物价<br />存银行可能越存越穷<br />至少要跑赢3%</p>}
        />
      </div>

      <RiskReturnScale />

      <h2 style={{ marginTop: "2rem" }}>风险决策模拟器</h2>
      <p>你有5万块要投资，4个关键时刻的选择将决定你一年后的资产和投资段位。</p>

      <StorySimulator
        title="风险决策模拟器"
        description="4步决策，看你是韭菜还是老手"
        stats={riskStats}
        initialValues={{ total: 50000, risk: 5, return: 0 }}
        steps={riskSteps}
        chartKey="total"
        endingText="投资不是消除风险，而是选择你能承受的风险，换取对应的回报。记住：保本+高收益=骗局，分散配置，长期持有。"
      />

      <Quiz
        question="有人推荐你一个'保本年化收益12%'的理财产品，你应该？"
        options={[
          { label: "赶紧买，收益真高", feedback: "太天真了！正规金融产品不允许承诺'保本'，12%收益意味着极高风险。大概率是骗局。" },
          { label: "高度警惕，很可能是骗局", feedback: "正确！保本+高收益几乎不存在。符合这个描述的通常是庞氏骗局或非法集资。", correct: true },
          { label: "先投一点试试水", feedback: "骗局的经典套路就是先让你赚小钱，然后让你追加大额投入。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>风险和收益成正比——没有"高收益零风险"</li>
          <li>了解三种风险：市场风险、个别风险、通胀风险</li>
          <li>"保本高收益"几乎等于骗局信号</li>
          <li>投资 = 选择你能承受的风险水平</li>
          <li>分散投资可以降低个别风险（但不能消除市场风险）</li>
        </ul>
      </div>

      <div className="card-featured mt-4" style={{ background: "var(--color-brand-light)" }}>
        <h3 style={{ marginTop: 0 }}>&#x1F389; 第三部分完成！</h3>
        <p>
          太棒了！你已经掌握了钱的核心规律：通胀在吃你的钱、复利在帮你赚钱、时间是最强大的变量、风险和收益相伴相生。
          下一站——<strong>认识投资工具</strong>，看看市面上到底有哪些东西可以让你的钱"动起来"。
        </p>
      </div>
    </>
  );
}