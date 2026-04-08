"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

/* 互动：旅行基金计划器 */
function TravelPlanner() {
  const [target, setTarget] = useState(15000);
  const [months, setMonths] = useState(12);
  const monthly = Math.ceil(target / months);

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x2708;&#xFE0F; 旅行基金计划器</h3>
      <label className="text-sm font-medium">目标金额：¥{target.toLocaleString()}</label>
      <input type="range" min={3000} max={50000} step={1000} value={target}
        onChange={e => setTarget(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <label className="text-sm font-medium mt-3 block">计划月数：{months}个月</label>
      <input type="range" min={3} max={24} step={1} value={months}
        onChange={e => setMonths(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <div className="card-base p-4 mt-4 text-center">
        <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>每月需要存</div>
        <div className="text-2xl font-bold" style={{ color: "var(--color-brand)" }}>¥{monthly.toLocaleString()}</div>
        <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
          建议放在货基或短期理财中，出发前1个月取出
        </p>
      </div>
    </div>
  );
}

export default function TravelFund() {
  return (
    <>
      <h2>用理财思维规划一次旅行</h2>
      <p>
        想去日本、泰国、欧洲？与其冲动刷信用卡，不如<strong>用之前学到的所有知识规划一次旅行基金</strong>——这就是短期目标理财的完美练习。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x2708;&#xFE0F;</div>
        <h3>短期目标理财三步法</h3>
      </div>
      <ul>
        <li><strong>定目标</strong> — 去哪、花多少、什么时候去？具体到数字</li>
        <li><strong>拆分</strong> — 总金额 &divide; 剩余月数 = 每月要存多少</li>
        <li><strong>专户存</strong> — 开一个专门账户，自动转入，不要和生活费混</li>
      </ul>

      <TravelPlanner />

      <blockquote>
        短期目标（1年内）的钱不要放股票/基金，放货基或银行定存就行。安全第一。
      </blockquote>

      <Quiz
        question="小吴想明年暑假去日本，预算2万。现在距离出发还有10个月。最好的准备方式是？"
        options={[
          { label: "到时候再说，刷信用卡分期", feedback: "分期要付利息，而且回来后每月还款会影响其他支出。" },
          { label: "每月自动存2000到旅行专用账户（货基）", feedback: "完美！目标清晰+分月执行+专户管理。出发时钱已经攒够了。", correct: true },
          { label: "把2万一次性投入股市，赚了再去", feedback: "10个月的短期目标不应该承担股市风险。万一亏了旅行计划泡汤。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>短期目标用"定目标→拆分→专户存"三步法</li>
          <li>短期（1年内）的钱放安全资产，不放股票</li>
          <li>专款专用，自动化执行</li>
          <li>不要借钱消费，攒够再出发</li>
        </ul>
      </div>
    </>
  );
}