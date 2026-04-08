"use client";

import Quiz from "@/components/Quiz";

export default function FirstSalary() {
  return (
    <>
      <h2>拿到人生第一笔工资，怎么分？</h2>
      <p>
        第一份工资5000、8000还是12000不重要，重要的是<strong>从第一天就建立好习惯</strong>。这里给你一个可以直接抄的方案。
      </p>

      <div className="knowledge-card">
        <div className="card-icon">&#x1F393;</div>
        <h3>新人理财四步走</h3>
      </div>
      <ul>
        <li><strong>第1步：留出生活费</strong> — 房租+吃饭+交通+日常，大约占60%</li>
        <li><strong>第2步：设置自动储蓄</strong> — 发工资当天自动转10-20%到储蓄账户</li>
        <li><strong>第3步：攒应急基金</strong> — 先攒够3个月生活费，放单独账户</li>
        <li><strong>第4步：开始定投</strong> — 应急基金攒够后，每月定投500-1000到指数基金</li>
      </ul>

      <h2>月薪8000的参考方案</h2>
      <ul>
        <li>房租：2500（最好不超过收入的30%）</li>
        <li>生活费：2000（吃饭+交通+日常）</li>
        <li>储蓄/应急基金：1500</li>
        <li>投资定投：1000</li>
        <li>自由支配（社交/娱乐）：1000</li>
      </ul>

      <h2>新人最容易犯的错</h2>
      <ul>
        <li><strong>生活方式膨胀</strong> — 有钱了就升级一切。刚工作别急着换手机/搬大房子</li>
        <li><strong>借钱消费</strong> — 花呗白条让你花"未来的钱"，但未来的你可能更缺钱</li>
        <li><strong>不买保险</strong> — 最基础的百万医疗+意外险，一年500块，必须有</li>
      </ul>

      <blockquote>
        22岁开始每月投1000，比32岁开始每月投3000，到60岁可能还多。因为时间比金额重要。
      </blockquote>

      <Quiz
        question="刚毕业月薪6000，最应该先做什么？"
        options={[
          { label: "先享受生活，理财等赚多了再说", feedback: "等赚多了才理财的人，往往赚多了也攒不下钱。习惯比金额重要。" },
          { label: "留够生活费，设置自动储蓄，开始攒应急基金", feedback: "对！从第一份工资就建立储蓄习惯，哪怕只存600（10%），也是好的开始。", correct: true },
          { label: "全部投入股市搏一把", feedback: "没有应急基金就投资=走钢丝没安全网。先储蓄后投资。" },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>第一份工资就开始理财，习惯比金额重要</li>
          <li>四步走：留生活费→自动储蓄→攒应急基金→开始定投</li>
          <li>房租不超过收入30%</li>
          <li>避免生活方式膨胀和借钱消费</li>
          <li>别忘了买最基础的保险</li>
        </ul>
      </div>
    </>
  );
}