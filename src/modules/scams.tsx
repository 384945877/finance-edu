"use client";

import Quiz from "@/components/Quiz";

export default function Scams() {
  return (
    <>
      <h2>这些骗局正在瞄准你</h2>
      <p>
        每年都有大量理财骗局，受害者不全是老人——<strong>20-30岁的年轻人是重灾区</strong>。因为你有钱但经验不足，最容易被"高收益"吸引。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F6A8;</div>
        <h3>骗局的共同特征</h3>
      </div>
      <ul>
        <li>承诺<strong>"保本高收益"</strong>（年化10%以上还保本）</li>
        <li><strong>"拉人头有奖励"</strong>（传销结构）</li>
        <li><strong>"限时抢购"</strong>制造紧迫感</li>
        <li>说不清楚<strong>钱投到哪里去了</strong></li>
        <li><strong>没有正规金融牌照</strong></li>
      </ul>

      <h2>常见骗局类型</h2>
      <ul>
        <li><strong>庞氏骗局</strong> — 用后来人的钱付前面人的利息。短期能提现，等你追加大额后跑路</li>
        <li><strong>杀猪盘</strong> — 先培养感情（恋爱/交友），再引导你投资某平台，最后平台消失</li>
        <li><strong>虚假外汇/数字货币平台</strong> — 自建假交易平台，你看到的涨跌都是假的</li>
        <li><strong>荐股群</strong> — 免费拉你进群"跟单"，先让你赚小钱，再诱导你买入他们要出货的股票</li>
        <li><strong>非法集资</strong> — 以"项目投资"名义向公众募资，实际没有真实项目</li>
      </ul>

      <h2>防骗指南</h2>
      <div className="knowledge-card">
        <div className="card-icon">&#x1F6E1;&#xFE0F;</div>
        <h3>记住这几条铁律</h3>
      </div>
      <ul>
        <li>年化超过6%就要警惕，超过10%且"保本" = 骗局</li>
        <li>正规理财产品可在<strong>中国理财网</strong>查到备案</li>
        <li>不要在非正规平台上投资</li>
        <li>不要因为"认识的人推荐"就放松警惕</li>
        <li>看不懂的东西不投</li>
      </ul>

      <blockquote>
        骗子不会告诉你风险，只会告诉你收益。越是"稳赚"的故事，越要小心。
      </blockquote>

      <Quiz
        question="你在网上认识了一个人，聊了两周后，TA推荐你在某个App上投资外汇，说年化50%。你应该？"
        options={[
          { label: "先投1000试试，反正不多", feedback: "这就是杀猪盘的经典套路！先让你投小钱赚到甜头，然后引导你追加。" },
          { label: "高度警惕，大概率是杀猪盘", feedback: "对！网恋+推荐投资+高收益承诺，是杀猪盘的三要素。绝对不要参与。", correct: true },
          { label: "看看App界面正不正规再说", feedback: "骗子的App可以做得非常精美。界面好看不代表是正规平台。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>保本+高收益 = 骗局信号</li>
          <li>常见骗局：庞氏骗局、杀猪盘、假平台、荐股群</li>
          <li>只在正规持牌金融机构投资</li>
          <li>看不懂的不投，说不清的不信</li>
          <li>越是"稳赚"的故事越危险</li>
        </ul>
      </div>
    </>
  );
}