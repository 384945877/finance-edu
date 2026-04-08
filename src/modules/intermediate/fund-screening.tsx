"use client";
import Quiz from "@/components/Quiz";

const dims = [
  { name: "业绩", weight: "30%", desc: "近3年/5年排名前1/3，穿越牛熊", icon: "📈" },
  { name: "回撤", weight: "25%", desc: "最大回撤不超过同类平均的1.2倍", icon: "📉" },
  { name: "费率", weight: "15%", desc: "管理费+托管费，越低越好（指数基金<0.6%）", icon: "💸" },
  { name: "基金经理", weight: "20%", desc: "从业>5年，管理规模适中（10-200亿）", icon: "👤" },
  { name: "规模", weight: "10%", desc: "2-100亿为宜。太小有清盘风险，太大船大难调头", icon: "📊" },
];

export default function FundScreening() {
  return (
    <>
      <h2>选基金不是碰运气</h2>
      <p>
        市面上基金几千只，怎么选？不靠感觉，靠<strong>五维评估法</strong>——把业绩、回撤、费率、经理、规模五个维度拉出来打分。
      </p>

      <div className="card-featured">
        <h3 style={{ marginTop: 0 }}>&#x1F52C; 选基五维法</h3>
        <div className="space-y-3">
          {dims.map(d => (
            <div key={d.name} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--color-gray-50)" }}>
              <span className="text-xl">{d.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{d.name}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ background: "#f9731620", color: "#f97316" }}>{d.weight}</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>选基红线</h2>
      <ul>
        <li><strong>成立不满3年</strong> — 数据太少，无法判断穿越牛熊的能力</li>
        <li><strong>基金经理频繁更换</strong> — 说明团队不稳定</li>
        <li><strong>规模低于2亿</strong> — 有清盘风险</li>
        <li><strong>名字里有&ldquo;分级&rdquo;&ldquo;杠杆&rdquo;</strong> — 新手别碰</li>
      </ul>

      <blockquote>
        选基金就是选基金经理。业绩好的基金几乎都有一个特点：基金经理稳定且从业超过5年。
      </blockquote>

      <Quiz
        question="小王看到一只基金近1年涨了80%，成立才1年，规模1.5亿。他应该？"
        options={[
          { label: "赶紧买，涨这么多肯定好", feedback: "1年的数据太短，可能只是赶上了行情。规模太小还有清盘风险。" },
          { label: "观察但不急着买，数据太少无法判断", feedback: "对！至少要看3年以上数据，且规模最好在2亿以上，才能做出靠谱判断。", correct: true },
          { label: "直接买，涨了80%跟着赚", feedback: "追涨是最常见的亏钱方式。短期高收益往往意味着高风险。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>选基五维：业绩、回撤、费率、基金经理、规模</li>
          <li>至少看3年以上业绩，穿越牛熊的才靠谱</li>
          <li>规模2-100亿为宜</li>
          <li>基金经理是核心——稳定从业5年以上优先</li>
        </ul>
      </div>
    </>
  );
}