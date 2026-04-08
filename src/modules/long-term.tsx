"use client";

import Quiz from "@/components/Quiz";

export default function LongTerm() {
  return (
    <>
      <h2>投资是场马拉松，不是百米冲刺</h2>
      <p>
        你听过哪个人靠短线炒股成为巴菲特的？<strong>没有</strong>。真正的财富是在漫长的时间里安静地增长出来的。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F3C3;</div>
        <h3>长期主义的核心理念</h3>
      </div>
      <ul>
        <li><strong>时间是最好的朋友</strong> — 复利需要时间发挥威力</li>
        <li><strong>短期波动是噪音</strong> — 沪深300过去20年年化约8%，但中间经历了无数次暴跌暴涨</li>
        <li><strong>坚持比聪明重要</strong> — 大部分人不是输在策略上，是输在"拿不住"</li>
      </ul>

      <h2>长期投资的数据支持</h2>
      <ul>
        <li>美股标普500任意20年持有期，历史上<strong>从未亏损</strong></li>
        <li>持有时间越长，收益的波动越小、确定性越高</li>
        <li>频繁交易的投资者平均收益<strong>比长期持有者低3-5%/年</strong></li>
      </ul>

      <blockquote>
        投资最难的不是选什么，而是在市场恐慌时不卖出，在市场狂热时不追入。
      </blockquote>

      <h2>如何培养长期心态？</h2>
      <ul>
        <li><strong>定义你的"投资期限"</strong> — 这笔钱10年不用？那10年内的涨跌跟你无关</li>
        <li><strong>自动化一切</strong> — 定投自动扣、再平衡按计划，减少主动决策</li>
        <li><strong>写下投资目标</strong> — 模糊的"赚钱"容易放弃，具体的"10年攒够50万旅行基金"更有动力</li>
        <li><strong>接受"无聊"</strong> — 好的投资大部分时间很无聊，无聊才是正常的</li>
      </ul>

      <Quiz
        question="巴菲特99%的财富是在50岁之后赚到的。这说明了什么？"
        options={[
          { label: "巴菲特年轻时投资水平不行", feedback: "巴菲特11岁就开始投资了。不是水平问题，是复利需要时间。" },
          { label: "复利效应需要长时间才能爆发", feedback: "对！前几十年在积累，后几十年在爆发。这就是时间+复利的力量。", correct: true },
          { label: "50岁后运气变好了", feedback: "和运气无关，是几十年复利积累的结果。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>长期持有的确定性远高于短期交易</li>
          <li>时间越长，复利越强大</li>
          <li>频繁交易是收益的最大杀手</li>
          <li>自动化、定纪律、写目标</li>
          <li>好的投资大部分时间很"无聊"</li>
        </ul>
      </div>

      <div className="card-featured mt-4" style={{ background: "var(--color-brand-light)" }}>
        <h3 style={{ marginTop: 0 }}>&#x1F389; 第六部分完成！</h3>
        <p>
          恭喜！你已经掌握了投资心态的核心：不追涨杀跌、过滤信息噪音、识别骗局、坚持长期主义。
          最后一站——<strong>人生理财地图</strong>，把所有知识应用到真实人生场景中！
        </p>
      </div>
    </>
  );
}