"use client";

import Quiz from "@/components/Quiz";

export default function Insurance() {
  return (
    <>
      <h2>最该买但最容易买错的东西</h2>
      <p>
        保险不是"不吉利"，是<strong>用小钱锁定大风险</strong>。每年花几百块，万一出大事能赔几十万——这笔交易值不值？
      </p>

      <div className="knowledge-card">
        <div className="card-icon">🛡️</div>
        <h3>保险的本质</h3>
      </div>
      <p>保险 = <strong>花小钱把你承受不了的风险转嫁给保险公司</strong>。你付保费，出事了保险公司赔你。</p>

      <h2>年轻人最需要的四种保险</h2>
      <ul>
        <li><strong>医保（社保）</strong> — 国家基础医疗保障，<em>必须有</em>，这是底线</li>
        <li><strong>百万医疗险</strong> — 每年几百块，住院费超过1万的部分报销，最高赔几百万</li>
        <li><strong>意外险</strong> — 每年一两百块，覆盖意外伤残/身故</li>
        <li><strong>定期寿险</strong> — 有家庭责任（房贷/养家）后考虑，万一人没了给家人留一笔钱</li>
      </ul>

      <h2>年轻人不需要的保险</h2>
      <div className="knowledge-card">
        <div className="card-icon">🚫</div>
        <h3>这些先别买</h3>
      </div>
      <ul>
        <li><strong>返还型保险</strong> — "有病赔钱没病返还"，听起来好但保费贵好几倍，不如买消费型+自己投资</li>
        <li><strong>理财型保险</strong> — 收益率很低（1-3%），锁定几十年，还不如买基金</li>
        <li><strong>万能险/分红险</strong> — 复杂、费用高、退保亏损大</li>
      </ul>

      <blockquote>
        保险的正确打开方式：先保障后理财，先大人后小孩，先消费型后储蓄型。
      </blockquote>

      <Quiz
        question="25岁的小周，月入8000，应该优先买哪种保险？"
        options={[
          { label: "年交1万的返还型重疾险", feedback: "太贵了！月入8000年交1万，保费占收入太高。消费型重疾险几百块就能搞定。" },
          { label: "百万医疗险（年费约300）+ 意外险（年费约150）", feedback: "对！先用最少的钱覆盖最大的风险。每年不到500，保障几百万。", correct: true },
          { label: "理财型保险，一举两得", feedback: "理财型保险的保障和理财都做不好，两头不讨好。" },
        ]}
      />

      <Quiz
        question="关于保险，以下哪个观点是正确的？"
        options={[
          { label: "买保险不吉利，会招来坏事", feedback: "保险和运气无关。它只是一种风险管理工具。" },
          { label: "保险是花小钱转嫁大风险的工具", feedback: "正确！这是保险最本质的定义。不是投资，不是赌博，是风险转嫁。", correct: true },
          { label: "保险越贵越好", feedback: "不是。消费型保险往往更便宜但保障更实在。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>保险 = 花小钱转嫁大风险</li>
          <li>年轻人先买：医保+百万医疗+意外险</li>
          <li>避开返还型/理财型保险——贵且不实用</li>
          <li>先保障后理财，先大人后小孩</li>
          <li>消费型保险性价比最高</li>
        </ul>
      </div>
    </>
  );
}