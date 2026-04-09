"use client";

import { useState } from "react";
import Quiz from "@/components/Quiz";
import ScenarioGame, { type Scene } from "@/components/ScenarioGame";

function InflationMachine() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(3);
  const years = [5, 10, 20, 30];
  const results = years.map(y => ({
    year: y,
    nominal: amount,
    real: Math.round(amount / Math.pow(1 + rate / 100, y)),
  }));

  return (
    <div className="card-featured">
      <h3 style={{ marginTop: 0 }}>通胀时间机器</h3>
      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        看看你现在的钱，在未来实际能买到多少东西
      </p>
      <label className="text-sm font-medium">当前金额：¥{amount.toLocaleString()}</label>
      <input type="range" min={1000} max={100000} step={1000} value={amount}
        onChange={e => setAmount(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <label className="text-sm font-medium mt-3 block">年通胀率：{rate}%</label>
      <input type="range" min={1} max={8} step={0.5} value={rate}
        onChange={e => setRate(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
      <div className="grid grid-cols-4 gap-2 mt-4 text-center">
        {results.map(r => (
          <div key={r.year} className="card-base p-3">
            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>{r.year}年后</div>
            <div className="text-sm font-bold" style={{ color: r.real < amount * 0.5 ? "#ef4444" : "var(--color-brand-deep)" }}>
              ¥{r.real.toLocaleString()}
            </div>
            <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              缩水{Math.round((1 - r.real / amount) * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inflationScenes: Scene[] = [
  {
    id: "future-lunch",
    situation: "穿越到2035年。你走进公司楼下的面馆，发现一碗牛肉面要48块",
    detail: "你记得2025年的时候同样一碗面才25块。你手里的现金并没有变多。",
    choices: [
      { text: "这也太贵了吧！不吃了", result: "不是面变贵了，是钱变「薄」了。10年通胀3%，物价大约涨了34%。25块的面变48块，完全正常。", impact: "购买力-34%" },
      { text: "虽然贵了，但如果工资也涨了，其实差不多", result: "关键洞察！通胀不可怕，可怕的是你的收入没有跟上通胀。如果工资从8000涨到了11000，其实感受差不多。", impact: "看收入", isGood: true },
      { text: "幸好我10年前就开始投资了，钱也在涨", result: "完美认知！让钱的增长速度跑赢物价上涨速度，就是理财的第一目标。", impact: "跑赢通胀", isGood: true },
    ],
  },
  {
    id: "savings-shock",
    situation: "你打开银行App，10年前存的10万块定期到期了，变成了13万",
    detail: "10年定期利率约2.8%，复利后10万变13万。看起来赚了3万？",
    choices: [
      { text: "赚了3万，还不错啊", result: "名义上赚了3万，但10年通胀3%，物价涨了34%。13万的实际购买力只相当于10年前的9.7万——你其实亏了。", impact: "实际亏¥3000" },
      { text: "等等，算上通胀的话，这3万可能不够抵消物价上涨", result: "没错！实际收益 = 名义利率 - 通胀率 = 2.8% - 3% = -0.2%。看起来赚了，实际购买力在缩水。", impact: "实际-0.2%/年", isGood: true },
      { text: "应该当初投指数基金，年化8-10%才能真的跑赢", result: "以沪深300为例，年化8%复利10年，10万变21.6万。扣掉通胀后实际购买力约16万，远超银行定期。", impact: "如果年化8%=21.6万", isGood: true },
    ],
  },
  {
    id: "rent-rise",
    situation: "房东通知你：下个月房租从2500涨到2800",
    detail: "你问房东为什么涨，他说「物价都在涨，我也没办法」。你月薪8000。",
    choices: [
      { text: "认了，反正也涨不了多少", result: "300/月 = 3600/年。房租从占收入31%变成35%。如果你的工资没涨，这就是通胀对你的直接打击。", impact: "+¥300/月" },
      { text: "跟老板提涨薪，至少跟上通胀", result: "正确思路。如果工资3年没涨，实际购买力已经降了近10%。争取每年调薪至少3-5%，是对抗通胀的第一道防线。", impact: "争取涨薪", isGood: true },
      { text: "开始认真理财，光靠工资扛不住通胀", result: "终极觉醒。工资是抵抗通胀的第一道防线，投资理财是第二道。两条腿走路才稳。", impact: "开始理财", isGood: true },
    ],
  },
];

export default function Inflation() {
  return (
    <>
      <h2>你的钱每天都在"蒸发"</h2>
      <p>
        2005年一碗牛肉面8块，现在要25块。你的工资涨了，但<strong>物价也涨了</strong>。这就是通货膨胀——钱的购买力随时间下降。
      </p>
      <p>
        简单说：<strong>同样的钱能买到的东西越来越少</strong>。中国近20年的平均通胀率大约在2-3%，但实际感受可能更高。
      </p>

      <h2>先穿越一下，体会通胀的威力</h2>
      <ScenarioGame
        title="穿越2035"
        description="体验10年后通胀对你的真实影响"
        scenes={inflationScenes}
        endingText="通胀是一种隐形税。跑赢它的方法：工资持续增长 + 让钱投资增值。放着不动就是在亏。"
      />

      <InflationMachine />

      <h2>怎么跑赢通胀？</h2>
      <ul>
        <li>银行活期（0.2%）— 完全跑不赢</li>
        <li>货币基金（1.5-2%）— 接近但不够</li>
        <li>国债/定期（2-3%）— 勉强打平</li>
        <li>债券基金（3-5%）— 小幅跑赢</li>
        <li>指数基金长期年化（8-10%）— 远超通胀</li>
      </ul>

      <Quiz
        question="小李把10万块存银行活期（年利率0.25%），通胀率3%。一年后他的钱实际怎么样了？"
        options={[
          { label: "赚了250块利息，赚到了", feedback: "名义上多了250，但物价涨了3%，实际购买力少了约2750。" },
          { label: "虽然多了250利息，但购买力其实下降了约2750", feedback: "对！实际收益 = 名义利率 - 通胀率 = 0.25% - 3% = -2.75%，亏了。", correct: true },
          { label: "钱放银行绝对安全，不可能亏", feedback: "名义上确实没亏，但通胀让你的实际购买力缩水了。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>通货膨胀 = 同样的钱能买到的东西越来越少</li>
          <li>中国近年通胀约2-3%，实际感受可能更高</li>
          <li>钱放着不动 = 每年隐形亏损2-3%</li>
          <li>理财的第一目标：跑赢通胀</li>
          <li>银行活期完全跑不赢，需要更有效的工具</li>
        </ul>
      </div>
    </>
  );
}