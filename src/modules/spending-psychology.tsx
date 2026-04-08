"use client";

import Quiz from "@/components/Quiz";

export default function SpendingPsychology() {
  return (
    <>
      <h2>你的钱包有一个隐形敌人：你的大脑</h2>
      <p>
        商家每年花几千亿研究一件事：<strong>如何让你忍不住掏钱</strong>。了解这些心理陷阱，不是让你变得抠门，而是让你花得更清醒。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🧲</div>
        <h3>陷阱一：锚定效应</h3>
      </div>
      <p>
        原价 999，现在只要 299！你觉得赚了——但其实这东西可能就值 199。<strong>你的判断被"原价"这个锚点操控了。</strong>
      </p>
      <p>
        破解方法：不看折扣力度，只问自己"如果没有原价标签，这个东西值这个钱吗？"
      </p>

      <div className="knowledge-card">
        <div className="card-icon">⏰</div>
        <h3>陷阱二：限时/限量焦虑</h3>
      </div>
      <p>
        "仅剩最后 3 件！""倒计时 2 小时！"——制造紧迫感，让你来不及思考就下单。
      </p>
      <p>
        破解方法：<strong>24小时冷静期</strong>。把东西加入购物车，明天还想要再买。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🍰</div>
        <h3>陷阱三：拿铁效应</h3>
      </div>
      <p>
        每天一杯 30 块的咖啡感觉不多，但一个月就是 900，一年就是 <strong>10,800</strong>。小额消费的累积效应远超你的想象。
      </p>
      <p>
        不是说不能喝咖啡——是要意识到这些"无痛支出"加起来的规模。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">💊</div>
        <h3>陷阱四：多巴胺消费</h3>
      </div>
      <p>
        拆快递那一刻的快感、刷到好看的东西立马下单——这是多巴胺在驱动你。<strong>快感来自"买"的动作，而不是"用"的过程。</strong>
      </p>
      <p>
        你有没有买过什么东西，拆开后就再也没碰过？
      </p>

      <h2>四个实用对策</h2>
      <ul>
        <li><strong>24小时法则</strong> — 超过 100 块的非必需品，强制等一天再买</li>
        <li><strong>问三个问题</strong> — 我需要它吗？我有替代品吗？一周后我还会想要它吗？</li>
        <li><strong>取消自动续费</strong> — 现在就打开手机检查一下，你可能有好几个忘记取消的订阅</li>
        <li><strong>用现金感受痛感</strong> — 研究发现，刷卡/扫码的"支付痛感"比现金低 30%，所以电子支付更容易超支</li>
      </ul>

      <Quiz
        question="你看到一件衣服，原价1299，现在打3折只要389。你该怎么想？"
        options={[
          { label: "便宜了900多，必须买！", feedback: "你中了锚定效应的圈套。折扣力度不代表这东西真的值这个钱。" },
          { label: "不看原价，只问自己：如果标价就是389，我还会买吗？", feedback: "正确思路！抛开锚点，回到真实需求和价值判断。", correct: true },
          { label: "打折的东西都是质量差的", feedback: "不一定，但关键不在质量，而在于你是否真的需要它。" },
        ]}
      />

      <Quiz
        question="小美每天点一杯25元的外卖奶茶。一年下来花了多少？"
        options={[
          { label: "大概3000-4000元", feedback: "25 × 365 = 9,125元，比你想的多多了！这就是拿铁效应。" },
          { label: "大概9,000元", feedback: "没错！25 × 365 = 9,125元。如果每天少喝一杯，一年能多攒近一万。", correct: true },
          { label: "无所谓，快乐最重要", feedback: "享受生活没错，但至少你应该知道这杯奶茶一年的总价。知道了再选择喝，跟不知道就喝，是两回事。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>商家利用锚定效应、限时焦虑、拿铁效应和多巴胺消费让你多花钱</li>
          <li>24小时冷静期是对抗冲动消费最有效的方法</li>
          <li>小额消费的年化累积远超想象</li>
          <li>理财不是不花钱，而是"清醒地"花钱</li>
        </ul>
      </div>

      <div className="card-featured mt-4 text-center" style={{ background: "var(--color-brand-light)" }}>
        <p className="text-3xl mb-2">🎉</p>
        <h3 style={{ marginTop: 0 }}>恭喜！你完成了第一部分</h3>
        <p className="text-sm" style={{ color: "var(--color-gray-700)" }}>
          你已经掌握了"认识钱"的全部5个模块。接下来进入第二部分——如何守住钱。
        </p>
      </div>
    </>
  );
}