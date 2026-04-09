"use client";

import Quiz from "@/components/Quiz";

export default function CreditScore() {
  return (
    <>
      <h2>征信报告：你的"财务身份证"</h2>
      <p>
        你可能听过<strong>{"\u201c"}征信花了{"\u201d"}{"\u201c"}上了黑名单{"\u201d"}</strong>这些说法。征信到底是什么？简单说：它是<strong>银行判断你靠不靠谱的依据</strong>。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">📋</div>
        <h3>征信报告里有什么？</h3>
      </div>
      <ul>
        <li><strong>基本信息</strong> — 姓名、身份证、工作单位、居住地址</li>
        <li><strong>信贷记录</strong> — 你办过的信用卡、贷款、花呗、白条等，每笔的额度和还款记录</li>
        <li><strong>查询记录</strong> — 谁在什么时间查了你的征信（银行审批、你自己查等）</li>
        <li><strong>公共记录</strong> — 欠税、法院判决等（希望你没有）</li>
      </ul>

      <h2>征信怎么影响你的生活？</h2>
      <div className="knowledge-card">
        <div className="card-icon">🔗</div>
        <h3>不只是贷款那么简单</h3>
      </div>
      <ul>
        <li><strong>买房贷款</strong> — 征信不好，银行直接拒贷或者利率上浮</li>
        <li><strong>信用卡申请</strong> — 征信差 = 额度低甚至办不下来</li>
        <li><strong>租房</strong> — 越来越多房东/平台要看征信</li>
        <li><strong>求职</strong> — 金融、政府等岗位会查征信</li>
        <li><strong>出行</strong> — 严重失信会被限制坐飞机、高铁</li>
      </ul>

      <h2>哪些行为会伤害征信？</h2>
      <ul>
        <li><strong>逾期还款</strong> — 最致命。逾期1天和逾期90天严重程度不同，但都有记录</li>
        <li><strong>频繁申请贷款/信用卡</strong> — 每次申请银行都会查征信，查太多说明你"很缺钱"</li>
        <li><strong>欠款不还</strong> — 变成"呆账"，是征信最严重的污点</li>
        <li><strong>给别人担保</strong> — 对方不还钱，你的征信也受连累</li>
      </ul>

      <blockquote>
        征信记录保留5年。一次逾期不是世界末日，但要避免反复出现。
      </blockquote>

      <h2>如何查你的征信？</h2>
      <div className="knowledge-card">
        <div className="card-icon">🔍</div>
        <h3>每年免费查2次</h3>
      </div>
      <ul>
        <li>中国人民银行征信中心官网：<strong>www.pbccrc.org.cn</strong></li>
        <li>线下：各城市人民银行分支机构，带身份证即可</li>
        <li>商业银行App：部分银行提供快捷查询入口</li>
      </ul>
      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        注意：不要在不明App上查征信！那些"免费查征信"的广告很多是在收集你的信息。
      </p>

      <Quiz
        question="小王频繁申请信用卡（3个月申了5张），虽然都按时还款，但征信可能会怎样？"
        options={[
          { label: "没影响，按时还款就行", feedback: "虽然没有逾期，但频繁查询会让银行认为你很缺钱，影响后续贷款审批。" },
          { label: "查询记录太多，银行会认为有风险", feedback: "对！短期内大量查询叫'征信花了'，会影响后续贷款和信用卡审批。", correct: true },
          { label: "征信会变好，说明信用额度多", feedback: "额度多不等于征信好。查询过多反而是负面信号。" },
        ]}
      />

      <Quiz
        question="征信上有一笔逾期记录，多久会消除？"
        options={[
          { label: "永久保留", feedback: "不是永久的。但前提是你已经还清了欠款。" },
          { label: "还清后保留5年自动消除", feedback: "正确！从还清之日起算，5年后自动消除。所以越早还清越早清白。", correct: true },
          { label: "花钱可以找人删除", feedback: "这是骗局！没有任何合法途径可以花钱删除正常的征信记录。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>征信 = 你的财务信用档案，影响贷款、租房、求职</li>
          <li>按时还款是维护征信的最重要行为</li>
          <li>不要频繁申请信用卡/贷款（征信查询会留记录）</li>
          <li>逾期记录还清后保留5年</li>
          <li>每年到央行官网免费查2次，不要用不明App</li>
        </ul>
      </div>

      <div className="card-featured mt-4" style={{ background: "var(--color-brand-light)" }}>
        <h3 style={{ marginTop: 0 }}>🎉 第二部分完成！</h3>
        <p>
          恭喜！你已经学会了守住钱的核心技能：储蓄、应急基金、债务管理、征信维护。
          接下来我们要进入更激动人心的领域——<strong>理解钱的规律</strong>，看看通胀和复利这两股力量如何影响你的财富。
        </p>
      </div>
    </>
  );
}