"use client";
import Quiz from "@/components/Quiz";
export default function DcaAdvanced() {
  return (<>
    <h2>定投不止一种方式</h2>
    <p>小白课程讲了基础定投，但实际上定投也有&ldquo;段位&rdquo;之分。<strong>智能定投和估值定投</strong>能让你在市场低估时多买、高估时少买，效果更好。</p>
    <div className="knowledge-card"><div className="card-icon">&#x1F4C8;</div><h3>三种定投策略</h3></div>
    <ul>
      <li><strong>普通定投</strong> — 每月固定金额买入，最简单</li>
      <li><strong>智能定投</strong> — 根据均线偏离自动调整金额。跌得多多买，涨得多少买</li>
      <li><strong>估值定投</strong> — 看PE百分位。PE低于30%多投1.5倍，高于70%减半或暂停</li>
    </ul>
    <h2>估值定投实操</h2>
    <ul>
      <li><strong>选指数</strong> — 沪深300/中证500等宽基指数</li>
      <li><strong>查PE百分位</strong> — 用蛋卷/且慢等App查看</li>
      <li><strong>低估多投</strong> — PE百分位 &lt; 30% 投1.5倍</li>
      <li><strong>正常投</strong> — 30%-70% 正常投</li>
      <li><strong>高估少投或暂停</strong> — &gt; 70% 投0.5倍或暂停</li>
    </ul>
    <blockquote>智能定投不是择时，而是用纪律性的规则替代主观判断。</blockquote>
    <Quiz question="沪深300当前PE百分位在20%（历史低位），你应该？"
      options={[
        { label: "害怕继续跌，暂停定投", feedback: "低估正是加大投入的好时机，暂停反而错过了低价筹码。" },
        { label: "加大定投金额，低估多买", feedback: "对！估值定投的核心就是低估多投。便宜的时候多买，长期收益更高。", correct: true },
        { label: "一次性把钱全投进去", feedback: "虽然估值低，但一次性全投没有了分批建仓的优势，万一继续跌会很被动。" },
      ]} />
    <div className="card-featured mt-8"><h3 style={{ marginTop: 0 }}>本关要点</h3>
      <ul>
        <li>智能定投根据均线偏离调整金额</li>
        <li>估值定投根据PE百分位决定投多少</li>
        <li>低估多投、高估少投是核心原则</li>
        <li>纪律比判断更重要</li>
      </ul>
    </div>
  </>);
}