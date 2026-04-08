"use client";

import Quiz from "@/components/Quiz";

export default function TrackingMoney() {
  return (
    <>
      <h2>你不需要记住每一分钱，但需要看清大方向</h2>
      <p>
        记账这件事听起来很烦——谁愿意每天打开 App 输入"午餐外卖 25 元"？但记账的目的<strong>不是记录每笔花销</strong>，而是<strong>发现你的消费模式</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🔍</div>
        <h3>记账解决的核心问题</h3>
      </div>
      <ul>
        <li>每月到底花了多少？（很多人高估收入、低估支出）</li>
        <li>钱主要花在了哪几个大类？</li>
        <li>有没有"不知不觉"就没了的钱？（隐形消费）</li>
        <li>哪些消费带来了真正的满足感？哪些只是冲动？</li>
      </ul>

      <h2>三种记账方式，选一个适合你的</h2>
      <div className="knowledge-card">
        <div className="card-icon">📱</div>
        <h3>方式一：App 自动记账</h3>
      </div>
      <p>
        支付宝、微信支付自带账单，还有随手记、MoneyWiz 等专门记账 App。<strong>优点是省事</strong>，扫码支付自动归类；缺点是现金消费记不到。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">📊</div>
        <h3>方式二：表格记账</h3>
      </div>
      <p>
        用 Excel 或 Google Sheets，每周花 5 分钟把大额消费填进去。适合喜欢掌控感的人。不用记每一笔，<strong>抓大放小</strong>就好。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🧠</div>
        <h3>方式三：月度复盘法（推荐新手）</h3>
      </div>
      <p>
        不用每天记。每月底花 10 分钟看一次银行卡和支付账单，把消费分成 3-5 个大类（住、吃、玩、交通、其他），看看比例是否合理。<strong>10 分钟/月就够了。</strong>
      </p>

      <blockquote>
        最好的记账方法 = 你能坚持下来的方法。不用完美，每月一次复盘就比 99% 的人强。
      </blockquote>

      <Quiz
        question="关于记账，以下哪个说法是对的？"
        options={[
          { label: "必须每笔消费都记下来才有效", feedback: "太精确的记账大多数人坚持不下来。记账的目的是看大方向，不是记住每一分钱。" },
          { label: "只要每月花10分钟看一次账单，就能发现问题", feedback: "正确！关键是定期复盘，发现消费模式，而不是事无巨细地记录。", correct: true },
          { label: "记账没什么用，该花还是会花", feedback: "研究表明，仅仅是'意识到'自己的消费模式，就能让人自动减少15%的冲动消费。" },
        ]}
      />

      <Quiz
        question="小李用App记了一个月的账，发现外卖支出占了月收入的18%。他该怎么做？"
        options={[
          { label: "以后完全不点外卖", feedback: "太极端了，难以持续。理财不是苦行。" },
          { label: "设定外卖月预算（比如不超过10%），超了就自己做饭", feedback: "非常好！设定上限而不是完全禁止，这是可持续的优化方式。", correct: true },
          { label: "无所谓，爱吃就吃", feedback: "如果18%让你不舒服（可能导致月光），那就值得调整。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>记账的目的是发现消费模式，不是记住每一笔</li>
          <li>三种方式：App自动记录、表格、月底复盘</li>
          <li>推荐新手：每月花10分钟看账单，分3-5大类</li>
          <li>最好的方法 = 你能坚持的方法</li>
        </ul>
      </div>
    </>
  );
}