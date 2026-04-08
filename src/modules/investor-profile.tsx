"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动：风险偏好小测试 */
function RiskQuiz() {
  const questions = [
    { q: "市场暴跌20%，你会？", opts: ["全部卖出", "不看不管", "加仓抄底"], scores: [1, 2, 3] },
    { q: "这笔钱多久不用？", opts: ["1年内", "1-5年", "5年以上"], scores: [1, 2, 3] },
    { q: "你能接受的最大亏损？", opts: ["不能亏", "亏10%以内", "亏30%也能扛"], scores: [1, 2, 3] },
    { q: "投资经验？", opts: ["完全没有", "买过基金", "买过股票/期货"], scores: [1, 2, 3] },
  ];
  const [answers, setAnswers] = useState<number[]>([]);
  const total = answers.reduce((a, b) => a + b, 0);

  const getProfile = () => {
    if (total <= 5) return { type: "保守型", emoji: "🐢", desc: "适合存款、货基、债基为主，少量指数基金", color: "#60a5fa" };
    if (total <= 8) return { type: "稳健型", emoji: "🦊", desc: "适合债基+指数基金各半，少量个股", color: "#34d399" };
    return { type: "进取型", emoji: "🦅", desc: "适合指数基金为主，可配部分个股，长期持有", color: "#f97316" };
  };

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>🧪 你是哪类投资者？</h3>
      {questions.map((item, qi) => (
        <div key={qi} className="mb-4">
          <p className="text-sm font-medium mb-2">{qi + 1}. {item.q}</p>
          <div className="flex flex-wrap gap-2">
            {item.opts.map((opt, oi) => (
              <button key={oi} onClick={() => {
                const next = [...answers];
                next[qi] = item.scores[oi];
                setAnswers(next);
              }}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: answers[qi] === item.scores[oi] ? "var(--color-brand)" : "transparent",
                  color: answers[qi] === item.scores[oi] ? "#0d0d0d" : "var(--color-text-secondary)",
                  border: `1px solid ${answers[qi] === item.scores[oi] ? "var(--color-brand)" : "var(--border-subtle)"}`,
                }}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      {answers.length === 4 && (() => {
        const p = getProfile();
        return (
          <div className="card-base p-4 mt-2 text-center">
            <div className="text-3xl mb-2">{p.emoji}</div>
            <div className="text-lg font-bold" style={{ color: p.color }}>{p.type}</div>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>{p.desc}</p>
          </div>
        );
      })()}
    </div>
  );
}

export default function InvestorProfile() {
  return (
    <>
      <h2>在投资之前，先认识你自己</h2>
      <p>
        同样的投资方案，有人睡得安稳，有人焦虑到失眠。区别不在方案好不好，在于<strong>适不适合你</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🧪</div>
        <h3>三种投资者类型</h3>
      </div>
      <ul>
        <li><strong>保守型 🐢</strong> — 不能接受亏损，追求本金安全。适合低风险产品为主</li>
        <li><strong>稳健型 🦊</strong> — 能接受小幅波动，追求稳定增长。适合股债平衡</li>
        <li><strong>进取型 🦅</strong> — 能承受较大波动，追求长期高收益。适合权益类为主</li>
      </ul>

      <RiskQuiz />

      <h2>影响你风险偏好的因素</h2>
      <ul>
        <li><strong>年龄</strong> — 越年轻越能承受风险，因为有时间恢复</li>
        <li><strong>收入稳定性</strong> — 公务员vs自由职业者，风险承受能力不同</li>
        <li><strong>投资期限</strong> — 钱越久不用，越能承受短期波动</li>
        <li><strong>心理承受力</strong> — 有人看到-5%就睡不着，有人-30%还能淡定</li>
      </ul>

      <blockquote>
        没有"最好"的投资方案，只有"最适合你"的方案。认识自己比认识市场更重要。
      </blockquote>

      <Quiz
        question="25岁的小杨，月薪稳定，这笔钱10年不用。他应该偏向哪种配置？"
        options={[
          { label: "全部存银行，安全第一", feedback: "年轻+长期+收入稳定，全存银行太保守了，白白浪费时间杠杆。" },
          { label: "以指数基金为主，配合部分债券", feedback: "正确！年轻+长期投资+收入稳定 = 可以承受较高风险，充分利用时间优势。", correct: true },
          { label: "全部买个股搏一把", feedback: "即使年轻也不该全仓个股。分散是基本原则。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>投资前先了解自己的风险承受能力</li>
          <li>三种类型：保守、稳健、进取</li>
          <li>年龄、收入、期限、心理都影响风险偏好</li>
          <li>没有最好的方案，只有最适合你的</li>
          <li>年轻+长期 = 可以适当提高风险配置</li>
        </ul>
      </div>
    </>
  );
}