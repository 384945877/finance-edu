"use client";

import { useState } from "react";
import ScenarioGame from "@/components/ScenarioGame";

/* 互动组件：先付给自己模拟器 */
function PayYourselfFirst() {
  const [salary, setSalary] = useState(8000);
  const [saveRate, setSaveRate] = useState(20);
  const saveAmount = Math.round(salary * saveRate / 100);
  const spendable = salary - saveAmount;
  const yearTotal = saveAmount * 12;

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>💡 先付给自己模拟器</h3>
      <label className="text-sm font-medium">月薪：¥{salary.toLocaleString()}</label>
      <input type="range" min={3000} max={30000} step={500} value={salary}
        onChange={e => setSalary(+e.target.value)} className="w-full accent-[var(--color-brand)]" />

      <label className="text-sm font-medium mt-3 block">储蓄比例：{saveRate}%</label>
      <input type="range" min={5} max={50} step={1} value={saveRate}
        onChange={e => setSaveRate(+e.target.value)} className="w-full accent-[var(--color-brand)]" />

      <div className="grid grid-cols-3 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>每月储蓄</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand)" }}>¥{saveAmount.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>可支配</div>
          <div className="text-lg font-bold">¥{spendable.toLocaleString()}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>一年攒到</div>
          <div className="text-lg font-bold" style={{ color: "var(--color-brand-deep)" }}>¥{yearTotal.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 情景闯关：月光族逆袭 ---------- */
const savingScenes = [
  {
    id: "payday",
    situation: "发薪日：工资 8000 到账",
    detail: "你刚毕业，月薪8000。今天发工资了，银行App弹出到账提醒。你的花呗还有1200要还，朋友约周末聚餐。你打算怎么安排这笔钱？",
    choices: [
      { text: "先还花呗，剩下的该花花", result: "还完花呗剩6800，但没有任何储蓄计划，月底大概率又月光。", isGood: false },
      { text: "先自动转800到储蓄账户，再还花呗", result: "先付给自己！800到储蓄账户，还1200花呗，剩6000安排生活。聪明的顺序。", impact: "先付给自己", isGood: true },
      { text: "先给自己买个奖励庆祝发薪", result: "花了500庆祝，还了花呗1200，剩6300但储蓄依然是0。\"犒赏自己\"是月光族最常见的借口。", isGood: false },
      { text: "全存起来，这个月吃土", result: "8000全存？坚持不了3天你就会取出来。极端储蓄反而最不可持续。", isGood: false },
    ],
  },
  {
    id: "temptation",
    situation: "第二周：购物车清空诱惑",
    detail: "你收藏了一双限量球鞋（1299），刚好平台推送'满1000减200'。你的储蓄账户有800，消费账户还剩4500。距离月底还有16天。",
    choices: [
      { text: "趁优惠买了！错过不再有", result: "花1099买球鞋，消费账户剩3401。接下来16天日均只能花212，大概率月底要动用储蓄。", impact: "冲动消费", isGood: false },
      { text: "加入心愿单，等下个月预算再买", result: "延迟满足！把购物欲望转化为下个月的储蓄动力。研究表明，72小时后60%的冲动购物欲望会自动消失。", impact: "延迟满足", isGood: true },
      { text: "从储蓄账户转800出来补贴一下", result: "储蓄账户清零。这就是为什么储蓄账户要设成\"不方便取\"——只要取过一次，心理防线就崩了。", impact: "动用储蓄", isGood: false },
      { text: "找朋友借钱买，下个月还", result: "借钱消费是最差选择。下个月你要还债+当月开销，储蓄更没希望。", isGood: false },
    ],
  },
  {
    id: "social",
    situation: "第三周：同事结婚随份子",
    detail: "同事发来婚礼请帖，部门群里大家商量随500。你消费账户还剩3200，距离月底还有9天。这个礼金你怎么处理？",
    choices: [
      { text: "随500，人情世故不能省", result: "随了500，剩2700。人情消费确实无法避免，但你保住了储蓄账户没动。下次可以提前预留人情基金。", impact: "正常社交支出", isGood: true },
      { text: "随1000显得大方", result: "超额随礼只是面子消费。剩2200，后面9天每天只能花244。没必要在人情上过度投入。", isGood: false },
      { text: "找借口不去，省下这500", result: "虽然省了钱，但职场关系受损。正确做法不是回避社交，而是提前做预算。", isGood: false },
    ],
  },
  {
    id: "raise",
    situation: "三个月后：你涨薪了！",
    detail: "恭喜！因为表现出色，月薪从8000涨到10000。多了2000块。三个月来你已经养成每月存800的习惯。现在怎么安排多出来的钱？",
    choices: [
      { text: "全部用来改善生活", result: "2000全花掉。这就是经典的\"生活方式膨胀\"——赚得越多花得越多，储蓄永远不涨。", impact: "生活膨胀", isGood: false },
      { text: "涨薪的50%加到储蓄，50%享受生活", result: "每月储蓄从800涨到1800，生活费也多了1000。半年后储蓄账户破万！这就是\"涨薪分半\"原则。", impact: "涨薪分半", isGood: true },
      { text: "2000全存起来", result: "理论完美但不可持续。给自己留一些改善空间，储蓄才能长期坚持。", isGood: false },
      { text: "多出来的钱投基金", result: "方向对但顺序不对。还没攒够3-6个月的应急金之前，先把储蓄做扎实。投资是储蓄之后的事。", isGood: false },
    ],
  },
  {
    id: "emergency",
    situation: "半年后：手机摔碎了",
    detail: "你的手机屏幕碎了，维修要1500，换新机要4000。你的储蓄账户已经攒到1万，消费账户有3000。怎么办？",
    choices: [
      { text: "修屏幕1500，从消费账户出", result: "1500修好继续用。消费账户还剩1500勉强够到月底，储蓄账户完好。应急支出用当月预算解决是最佳方案。", impact: "理性应急", isGood: true },
      { text: "趁机换新旗舰，花呗分期4000", result: "分期消费让你背上4000债务。接下来几个月你既要还分期又要储蓄，压力山大。", isGood: false },
      { text: "从储蓄取1500修手机", result: "可以但不是最佳。你的消费账户够用，没必要动储蓄。储蓄是最后一道防线。", isGood: false },
      { text: "先凑合用碎屏手机", result: "节约精神可嘉，但碎屏影响日常使用效率。合理的维修支出不算浪费。", isGood: false },
    ],
  },
];

export default function Saving() {
  return (
    <>
      <h2>为什么大部分人攒不下钱？</h2>
      <p>
        不是因为赚得少——很多月入2万的人也是月光。核心问题是<strong>花钱的顺序搞反了</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🐷</div>
        <h3>先付给自己 vs 先花再攒</h3>
      </div>
      <ul>
        <li><strong>多数人的模式</strong>：收入 → 各种消费 → 月底看看还剩多少 → 通常剩0</li>
        <li><strong>正确的模式</strong>：收入 → <em>先转一笔到储蓄账户</em> → 剩下的才是生活费</li>
      </ul>

      <PayYourselfFirst />

      <h2 style={{ marginTop: "2rem" }}>情景闯关：月光族逆袭记</h2>
      <p>你是一个刚毕业的月光族，月薪8000。接下来半年里，你能成功养成储蓄习惯吗？每个选择都会影响你的结局。</p>

      <ScenarioGame
        title="月光族逆袭记"
        description="从发薪到涨薪，5个真实场景考验你的储蓄意志力"
        scenes={savingScenes}
        endingTitle="你的攒钱段位"
        endingText="储蓄不是省吃俭用，是把未来的你当成一个需要养活的人。先付给自己，剩下的才是生活费。"
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>先付给自己 = 收入先转储蓄，剩下才是生活费</li>
          <li>自动化是最强储蓄武器，消除意志力依赖</li>
          <li>涨薪时把50%加到储蓄，防止生活方式膨胀</li>
          <li>储蓄账户要和消费账户物理隔离</li>
          <li>延迟满足：72小时后60%的冲动购物欲望会消失</li>
        </ul>
      </div>
    </>
  );
}