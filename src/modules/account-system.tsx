"use client";

import Quiz from "@/components/Quiz";

export default function AccountSystem() {
  return (
    <>
      <h2>钱该放几个篮子？</h2>
      <p>
        一个银行卡走天下？那你的生活费、应急钱、投资钱全混在一起，根本搞不清哪些能花哪些不能动。<strong>账户体系</strong>就是给你的钱分好类。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F9FA;</div>
        <h3>四个账户模型</h3>
      </div>
      <ul>
        <li><strong>日常消费账户</strong> — 生活费、房租、吃饭。绑定微信/支付宝的卡</li>
        <li><strong>应急储蓄账户</strong> — 3-6个月生活费。单独银行卡，不绑定消费</li>
        <li><strong>投资增值账户</strong> — 基金、股票等。长期不动的钱放这里</li>
        <li><strong>梦想基金账户</strong> — 旅行、数码、学习等中期目标。专款专用</li>
      </ul>

      <h2>怎么搭建？</h2>
      <ul>
        <li>工资到账 → <strong>先自动转</strong>：储蓄20% + 投资15% + 梦想5%</li>
        <li>剩下60%才是日常消费账户的额度</li>
        <li>每个账户用<strong>不同的银行卡</strong>或App管理</li>
        <li>投资账户的钱<strong>设置定投</strong>，自动执行</li>
      </ul>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F4A1;</div>
        <h3>关键原则：物理隔离</h3>
      </div>
      <p>
        不要只在脑子里"标记"——人的自控力有限。<strong>用不同的银行卡/App物理隔离</strong>，让"花掉应急基金"这件事变得很麻烦，你自然就不会动它。
      </p>

      <blockquote>
        管理钱的第一步不是赚更多，而是分清哪些钱干什么用。
      </blockquote>

      <Quiz
        question="小何月薪1万，以下哪种分配方式最合理？"
        options={[
          { label: "全部放在一张卡上，心里记着就行", feedback: "心里记着=记不住。月底大概率全花完。" },
          { label: "发工资自动转：2000储蓄+1500投资+500梦想+6000日常", feedback: "对！自动化+物理隔离，每笔钱都有明确用途。", correct: true },
          { label: "全部存起来，要花的时候再取", feedback: "太极端了，没有日常消费预算会影响生活质量和持续性。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>把钱分成4个账户：消费、应急、投资、梦想</li>
          <li>工资到账先自动转，剩下的才是生活费</li>
          <li>物理隔离（不同卡/App）比心理记账有效100倍</li>
          <li>投资账户设置自动定投</li>
          <li>分清钱的用途是理财的基础设施</li>
        </ul>
      </div>

      <div className="card-featured mt-4" style={{ background: "var(--color-brand-light)" }}>
        <h3 style={{ marginTop: 0 }}>&#x1F389; 第五部分完成！</h3>
        <p>
          太棒了！你已经建立了完整的投资系统——知道自己是哪类投资者、怎么配置资产、如何定投和再平衡、钱怎么分账户管理。
          下一站——<strong>心态与避坑</strong>，看看投资路上最常见的心理陷阱和骗局。
        </p>
      </div>
    </>
  );
}