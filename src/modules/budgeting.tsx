"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

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
      <p className="text-xs mb-4" style={{ color: "var(--color-text-muted)" }}>
        拖动滑块，看看不同分配比例下你的钱怎么花
      </p>

      <div className="mb-3">
        <label className="text-xs font-medium">月收入</label>
        <input type="range" min={3000} max={30000} step={500} value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full" style={{ accentColor: "var(--color-brand)" }} />
        <p className="text-right text-sm font-semibold">{income.toLocaleString()} 元</p>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs">
          <span>🏠 必要支出</span>
          <span className="font-semibold">{needs}% = {Math.round(income * needs / 100).toLocaleString()} 元</span>
        </div>
        <input type="range" min={20} max={80} value={needs}
          onChange={(e) => setNeeds(Number(e.target.value))}
          className="w-full" style={{ accentColor: "#3772cf" }} />
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs">
          <span>🛍️ 个人消费</span>
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
          <span>💰 储蓄 / 投资</span>
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

export default function Budgeting() {
  return (
    <>
      <h2>50/30/20：全世界最简单的预算法则</h2>
      <p>
        预算不是让你像公司一样做 Excel 报表。它就是<strong>一个简单的分配原则</strong>，帮你在花钱之前就决定好每块钱的"岗位"。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🎯</div>
        <h3>50/30/20 法则</h3>
      </div>
      <ul>
        <li><strong>50% — 必要支出</strong>：房租、水电、吃饭、交通、手机话费——不花不行的钱</li>
        <li><strong>30% — 个人消费</strong>：购物、娱乐、社交、旅行——让生活有趣的钱</li>
        <li><strong>20% — 储蓄/投资</strong>：先付给未来的自己——这才是真正让你变富的钱</li>
      </ul>

      <BudgetSlider />

      <h2>这个比例不是死的</h2>
      <p>
        50/30/20 是<strong>起点</strong>，不是终点。你的实际情况可能不同：
      </p>
      <ul>
        <li>一线城市房租高？必要支出可能要 60%，那就从消费里挤</li>
        <li>刚毕业收入低？先做到 10% 储蓄就很好了</li>
        <li>想攒钱买房？可以把储蓄比例提到 30-40%</li>
      </ul>
      <p>
        <strong>关键不是数字，而是原则：</strong>工资到账后，先转走储蓄的部分，剩下的才是你能花的。
      </p>

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