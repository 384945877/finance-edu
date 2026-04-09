"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";
import ScenarioGame, { type Scene } from "@/components/ScenarioGame";

function BudgetSlider() {
  const [income, setIncome] = useState(8000);
  const [needs, setNeeds] = useState(50);
  const [wants, setWants] = useState(30);
  const savings = 100 - needs - wants;
  const clampedSavings = Math.max(savings, 0);

  return (
    <div className="my-8 rounded-2xl border p-6" style={{ borderColor: "var(--border-subtle)", background: "var(--color-gray-50)" }}>
      <p className="label-upper mb-1" style={{ color: "var(--color-brand-deep)" }}>互动实验</p>
      <h3 style={{ marginTop: 0 }}>50/30/20 预算分配器</h3>
      <div className="mb-3">
        <label className="text-xs font-medium">月收入</label>
        <input type="range" min={3000} max={30000} step={500} value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full" style={{ accentColor: "var(--color-brand)" }} />
        <p className="text-right text-sm font-semibold">{income.toLocaleString()} 元</p>
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-xs">
          <span>必要支出</span>
          <span className="font-semibold">{needs}% = {Math.round(income * needs / 100).toLocaleString()} 元</span>
        </div>
        <input type="range" min={20} max={80} value={needs}
          onChange={(e) => setNeeds(Number(e.target.value))}
          className="w-full" style={{ accentColor: "#3772cf" }} />
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-xs">
          <span>个人消费</span>
          <span className="font-semibold">{wants}% = {Math.round(income * wants / 100).toLocaleString()} 元</span>
        </div>
        <input type="range" min={0} max={60} value={wants}
          onChange={(e) => setWants(Number(e.target.value))}
          className="w-full" style={{ accentColor: "#c37d0d" }} />
      </div>
      <div className="p-3 rounded-xl mt-2" style={{
        background: savings >= 15 ? "#d4fae830" : savings >= 0 ? "#c37d0d15" : "#d4565615",
        border: `1px solid ${savings >= 15 ? "#0fa76e30" : savings >= 0 ? "#c37d0d30" : "#d4565630"}`,
      }}>
        <div className="flex justify-between text-sm">
          <span>储蓄 / 投资</span>
          <span className="font-bold" style={{ color: savings >= 15 ? "#0fa76e" : savings >= 0 ? "#c37d0d" : "#d45656" }}>
            {clampedSavings}% = {Math.round(income * clampedSavings / 100).toLocaleString()} 元
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
          {savings >= 20 ? "很棒！达到了理想的储蓄比例" :
           savings >= 10 ? "还不错，但还有优化空间" :
           savings >= 0 ? "储蓄空间太小了，试试降低消费比例" :
           "超支了！必要支出+个人消费超过了100%"}
        </p>
      </div>
    </div>
  );
}

const budgetScenes: Scene[] = [
  {
    id: "payday",
    situation: "发工资日！8000块到账了。你要做的第一件事是？",
    detail: "这个月的房租2500、水电200、话费100已经是固定支出了。",
    choices: [
      { text: "先转1600到储蓄账户，剩下的才是生活费", result: "先付给自己！这就是50/30/20的精髓——储蓄不是花剩的，而是先留的。1600 = 20%，完美。", impact: "存¥1600", isGood: true },
      { text: "先把想买的东西买了，月底看看还剩多少", result: "这就是大部分月光族的模式。「花剩下的再存」= 永远存不下来，因为花钱没上限。", impact: "月底¥0" },
      { text: "全部存起来，这个月尽量不花钱", result: "精神可嘉但不现实。过度节俭会反弹——坚持两天就忍不住报复性消费了。预算的目的是合理分配，不是不花。", impact: "坚持不住" },
    ],
  },
  {
    id: "rent-week",
    situation: "交完房租水电话费后，你还剩5200。接下来这个月怎么分配？",
    detail: "已留1600储蓄。可支配5200中要覆盖：吃饭、交通、社交、购物。",
    choices: [
      { text: "不做计划，走一步看一步", result: "没有预算 = 盲目花钱。调查显示，不做预算的人平均每月多花23%。5200到月底可能一分不剩。", impact: "可能超支" },
      { text: "吃饭2500、交通500、社交1000、自由花1200", result: "有计划就有掌控感。把大数字拆小，每天吃饭预算约83元，清清楚楚。", impact: "有计划", isGood: true },
      { text: "每周给自己发1300，花完就等下周", result: "周薪制是非常聪明的预算技巧！把月预算拆成4周，每周1300，花完即止。简单粗暴但有效。", impact: "¥1300/周", isGood: true },
    ],
  },
  {
    id: "mid-month",
    situation: "月中了，朋友约你这周末去密室逃脱+吃火锅，预计人均300",
    detail: "你本月社交预算还剩500。去的话这个月社交基本用完了。",
    choices: [
      { text: "预算还够，去！但后半月社交活动就不参加了", result: "在预算内消费，清醒地做选择。享受生活的同时保持纪律，这就是预算的意义——不是不花，是花得清楚。", impact: "-¥300", isGood: true },
      { text: "超出预算了但没关系，开心最重要", result: "一次超支问题不大，但如果每次都「开心最重要」，那预算就形同虚设了。", impact: "预算失控" },
      { text: "太贵了，借口不去", result: "如果是为了省钱而牺牲所有社交，长期不可持续。预算的目的是让你能说「去」的时候，是真的能去。", impact: "省¥300" },
    ],
  },
  {
    id: "end-month",
    situation: "月底了！盘点一下：储蓄1600已安全到位，卡里还剩380",
    detail: "这380是你的「结余」——花不掉就会成为额外储蓄。",
    choices: [
      { text: "犒劳自己，把380花掉", result: "花掉也没错——这是预算内的钱。但如果能把结余也存起来，一年下来能多攒4000多。", impact: "-¥380" },
      { text: "转到储蓄账户，这个月超额完成任务", result: "储蓄率从20%变成了25%。这种「结余储蓄」积少成多，一年可能多存4000-5000。", impact: "多存¥380", isGood: true },
      { text: "一半存一半花——190买个小东西奖励自己", result: "平衡策略。既满足了即时满足感，又额外存了一笔。长期可持续。", impact: "多存¥190", isGood: true },
    ],
  },
];

export default function Budgeting() {
  return (
    <>
      <h2>50/30/20：全世界最简单的预算法则</h2>
      <p>
        预算不是做 Excel 报表。它就是<strong>一个简单的分配原则</strong>，帮你在花钱之前就决定好每块钱的"岗位"。
      </p>
      <ul>
        <li><strong>50% — 必要支出</strong>：房租、水电、吃饭、交通——不花不行的钱</li>
        <li><strong>30% — 个人消费</strong>：购物、娱乐、社交——让生活有趣的钱</li>
        <li><strong>20% — 储蓄/投资</strong>：先付给未来的自己——真正让你变富的钱</li>
      </ul>

      <BudgetSlider />

      <h2>接下来，试试管一个月的钱</h2>
      <p>假设你月薪8000，看看从发工资到月底，你能不能做出每一步的正确选择。</p>

      <ScenarioGame
        title="月薪生存挑战"
        description="从发工资到月底的4个决策场景"
        scenes={budgetScenes}
        endingText="预算的核心就8个字：先存后花，花得清楚。比例可以灵活调整，但「先储后花」的原则不能变。"
      />

      <Quiz
        question="月薪6000的小王在一线城市，房租2500。用50/30/20法则，他的个人消费预算是？"
        options={[
          { label: "1800元（6000 × 30%）", feedback: "如果机械套用确实是1800，但房租已占42%，必须调整比例。" },
          { label: "1500元（剩下的钱里分配）", feedback: "考虑到高房租，先确保20%储蓄=1200，再分配消费确实更合理。但可以更灵活。" },
          { label: "没有标准答案，关键是先保住储蓄的部分", feedback: "完全正确！比例可以灵活调整，但'先储后花'的原则不变。哪怕只存10%（600元），也比0强。", correct: true },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>50/30/20 = 必要支出/个人消费/储蓄投资</li>
          <li>这是起点不是死规定，可以根据实际调整</li>
          <li>核心原则：工资到账先转走储蓄，剩下的才是能花的</li>
          <li>哪怕只存10%，也比0%强一万倍</li>
        </ul>
      </div>
    </>
  );
}