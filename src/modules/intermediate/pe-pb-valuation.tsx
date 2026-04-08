"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";

function ValuationCalc() {
  const [price, setPrice] = useState(50);
  const [eps, setEps] = useState(2.5);
  const [bvps, setBvps] = useState(20);
  const pe = eps > 0 ? (price / eps).toFixed(1) : "N/A";
  const pb = bvps > 0 ? (price / bvps).toFixed(2) : "N/A";
  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>&#x1F3F7;&#xFE0F; PE/PB 估值计算器</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">股价: &yen;{price}</label>
          <input type="range" min={5} max={200} step={1} value={price} onChange={e => setPrice(+e.target.value)} className="w-full accent-[#f97316]" />
        </div>
        <div>
          <label className="text-sm font-medium">每股收益(EPS): &yen;{eps}</label>
          <input type="range" min={0.1} max={20} step={0.1} value={eps} onChange={e => setEps(+e.target.value)} className="w-full accent-[#f97316]" />
        </div>
        <div>
          <label className="text-sm font-medium">每股净资产(BVPS): &yen;{bvps}</label>
          <input type="range" min={1} max={100} step={1} value={bvps} onChange={e => setBvps(+e.target.value)} className="w-full accent-[#f97316]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4 text-center">
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>PE（市盈率）</div>
          <div className="text-2xl font-bold" style={{ color: "#f97316" }}>{pe}x</div>
          <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{Number(pe) < 15 ? "偏低估" : Number(pe) < 30 ? "合理" : "偏高估"}</div>
        </div>
        <div className="card-base p-3">
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>PB（市净率）</div>
          <div className="text-2xl font-bold" style={{ color: "#f97316" }}>{pb}x</div>
          <div className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>{Number(pb) < 1 ? "破净" : Number(pb) < 3 ? "合理" : "偏高估"}</div>
        </div>
      </div>
    </div>
  );
}

export default function PePbValuation() {
  return (
    <>
      <h2>估值 = 判断股票贵不贵</h2>
      <p>
        股价高不代表贵，股价低不代表便宜。<strong>估值</strong>是用价格和基本面的关系来判断一只股票到底是贵了还是便宜了。
      </p>
      <div className="knowledge-card">
        <div className="card-icon">&#x1F3F7;&#xFE0F;</div>
        <h3>两个最常用的估值指标</h3>
      </div>
      <ul>
        <li><strong>PE（市盈率）</strong>= 股价 / 每股收益。意思是：按当前盈利水平，买入这只股票多少年能回本</li>
        <li><strong>PB（市净率）</strong>= 股价 / 每股净资产。意思是：你花了净资产的几倍价格买入</li>
      </ul>

      <ValuationCalc />

      <h2>怎么用 PE/PB？</h2>
      <ul>
        <li><strong>同行对比</strong> — PE=20在银行股里算高，在科技股里算低。必须和同行比</li>
        <li><strong>历史对比</strong> — 这只股票历史PE在10-30之间，现在15就偏低估</li>
        <li><strong>PB&lt;1（破净）</strong> — 股价低于净资产，要么是捡便宜的机会，要么是公司真的有问题</li>
        <li><strong>PE不适用亏损股</strong> — 公司亏钱时PE为负数，没有参考价值</li>
      </ul>

      <blockquote>
        估值不是万能的，但不看估值是万万不能的。PE/PB是入门级工具，越用越顺手。
      </blockquote>

      <Quiz
        question="A公司PE=8，B公司PE=35，两家都是银行股。你倾向于？"
        options={[
          { label: "买B，PE高说明市场看好", feedback: "银行股通常PE在5-12之间，35倍PE说明市场可能过度乐观或有异常因素。" },
          { label: "买A，低PE可能是低估的机会", feedback: "对！同行业中PE明显更低，且基本面没有大问题的话，可能是被低估了。", correct: true },
          { label: "PE没用，随便选", feedback: "PE在同行业对比中非常有参考价值，不能忽视。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>PE = 股价/每股收益，衡量多少年回本</li>
          <li>PB = 股价/每股净资产，衡量溢价倍数</li>
          <li>估值必须同行业、同历史区间对比才有意义</li>
          <li>PB 破净要辨别是机会还是陷阱</li>
          <li>亏损公司的PE没有参考价值</li>
        </ul>
      </div>
    </>
  );
}