"use client";

import Quiz from "@/components/Quiz";
import ScenarioGame, { type Scene } from "@/components/ScenarioGame";

const spendingScenes: Scene[] = [
  {
    id: "anchor",
    image: "🏷️",
    situation: "周末逛商场，你看到一件外套标着「原价1999，今日特价599」",
    detail: "售货员说这是最后一天活动了。你其实出门前没打算买衣服。",
    choices: [
      { text: "省了1400，不买是傻子，直接拿下", result: "你中了「锚定效应」——1999这个原价操控了你的判断。这件衣服可能出厂价就200，标1999只是为了让599看起来便宜。", impact: "-¥599", moneyChange: -599 },
      { text: "先拍照加购物车，回家想一天再决定", result: "24小时冷静期是对抗冲动消费最好的武器。统计显示70%加购物车的东西，过一天就不想买了。", impact: "¥0", isGood: true },
      { text: "不看标价，只问自己：没有折扣的话，我愿意花599买这个吗？", result: "完美！跳出锚定效应的关键就是忽略原价，只评估真实价值。这才是理性消费。", impact: "¥0", isGood: true },
    ],
  },
  {
    id: "latte",
    image: "🧋",
    situation: "工作日午休，同事喊你一起点35块的外卖奶茶",
    detail: "你几乎每天都点，感觉也就一杯奶茶的事。",
    choices: [
      { text: "才35块，日常快乐不能省", result: "35 × 22个工作日 = 每月770元，一年9,240元。一杯不多，但「拿铁效应」的威力在于日积月累。", impact: "-¥770/月", moneyChange: -35 },
      { text: "这周已经点了3次了，今天带保温杯泡茶", result: "你意识到了小额消费的累积效应。不是不能喝，而是从「无意识消费」变成「有意识选择」。", impact: "省¥35", isGood: true },
      { text: "点便宜的，选个12块的柠檬水", result: "折中方案也不错。消费降级不是目的，有意识地控制额度才是关键。一年能少花5,000多。", impact: "-¥12", moneyChange: -12, isGood: true },
    ],
  },
  {
    id: "flash-sale",
    image: "👟",
    situation: "手机弹出通知：「你关注的AJ限量款补货了，仅剩23双，10分钟后开抢」",
    detail: "这双鞋你种草很久了，原价1299。但你这个月已经花超预算了。",
    choices: [
      { text: "冲！限量的不买就没了，先用花呗", result: "限量焦虑+信用消费，两个陷阱叠加。你买的不是鞋，是「怕错过」的焦虑感。下个月花呗账单会提醒你这个决定。", impact: "-¥1299", moneyChange: -1299 },
      { text: "确实想要，但这个月超了。下月预算里专门留一笔再说", result: "延迟满足 + 预算管理，双重理性。真正喜欢的东西不会因为晚买一个月就不香了。", impact: "¥0", isGood: true },
      { text: "打开二手平台看看同款，可能便宜好几百", result: "聪明！同样的东西用更低的价格获取，这就是消费者剩余最大化。", impact: "省¥400+", moneyChange: -899, isGood: true },
    ],
  },
  {
    id: "dopamine",
    image: "😮‍💨",
    situation: "加班到深夜，心情低落。你打开购物App开始刷……",
    detail: "购物车已经加了3样东西：蓝牙耳机199、解压玩具49、一本没时间看的书39。手指已经在付款按钮上了。",
    choices: [
      { text: "今天辛苦了，买了犒劳自己", result: "「多巴胺消费」——快感来自点击「付款」那一刻，而不是收到东西之后。你上次冲动买的东西，现在还在用吗？", impact: "-¥287", moneyChange: -287 },
      { text: "关掉App，去跑步/听歌/早点睡", result: "找到了不花钱的解压方式。情绪低落时做消费决策，事后后悔概率高达60%。", impact: "¥0", isGood: true },
      { text: "只买书，其他两个明天再看还想不想要", result: "不错，设了一个底线。39块的书是最有价值的那个，其他两个大概率不会再想买。", impact: "-¥39", moneyChange: -39, isGood: true },
    ],
  },
  {
    id: "subscribe",
    image: "📱",
    situation: "你打开手机，发现自己在悄悄扣费……",
    detail: "视频会员25/月、音乐会员15/月、健身App 30/月、云空间6/月、一个不记得了的App 12/月。你上次用健身App是两个月前。",
    choices: [
      { text: "都是小钱，懒得管", result: "25+15+30+6+12 = 每月88元，一年1,056元。而你至少有两个几乎不用。「订阅疲劳」是现代最隐蔽的财富黑洞。", impact: "-¥88/月", moneyChange: -88 },
      { text: "现在就取消不用的，至少省掉健身和那个不记得的App", result: "42元/月 × 12 = 一年省504元。5分钟操作，等于给自己发了500块年终奖。", impact: "省¥42/月", moneyChange: -46, isGood: true },
      { text: "全部取消，用到的时候再重新开", result: "激进但有效。大部分订阅服务随时能重开，但自动续费会一直扣到你发现为止。", impact: "省¥88/月", isGood: true },
    ],
  },
];

export default function SpendingPsychology() {
  return (
    <>
      <h2>你的钱包有一个隐形敌人：你的大脑</h2>
      <p>
        商家每年花几千亿研究一件事：<strong>如何让你忍不住掏钱</strong>。接下来不讲理论，直接给你5个真实场景——看看你能扛住几轮。
      </p>

      <ScenarioGame
        title="消费心理闯关"
        description="5个真实场景，测试你的消费理性"
        scenes={spendingScenes}
        initialMoney={5000}
        endingText="记住四个武器：24小时冷静期、忽略锚定价、识别拿铁效应、情绪低落时远离购物App。"
      />

      <h2>刚才那些场景背后的心理学</h2>
      <ul>
        <li><strong>锚定效应</strong> — 原价标签操控你的「便宜感」。破解：只看绝对价值</li>
        <li><strong>拿铁效应</strong> — 小额消费年化后是个吓人的数字。35/天 = 9000+/年</li>
        <li><strong>限时焦虑</strong> — 「最后3件」让你来不及思考。破解：真喜欢就不怕等</li>
        <li><strong>多巴胺消费</strong> — 快感来自买的瞬间，不是用的过程</li>
        <li><strong>订阅黑洞</strong> — 每月几十块的自动续费，一年轻松吞掉上千</li>
      </ul>

      <Quiz
        question="回想一下你最近一次冲动消费，它最可能属于哪种心理陷阱？"
        options={[
          { label: "看到打折觉得不买亏了（锚定效应）", feedback: "很多人都栽在这里。下次试试：遮住原价，只看现价，你还会买吗？" },
          { label: "每天的小额消费根本没注意（拿铁效应）", feedback: "打开支付宝/微信账单看看上个月的外卖+奶茶总额，你会吓一跳。" },
          { label: "心情不好的时候下单了（多巴胺消费）", feedback: "下次情绪低落想购物时，试试：先去走10分钟路，回来再决定。", correct: true },
        ]}
      />

      <div className="card-featured mt-8">
        <h3 style={{ marginTop: 0 }}>本关要点</h3>
        <ul>
          <li>商家利用锚定、限时、拿铁效应和多巴胺让你多花钱</li>
          <li>24小时冷静期是对抗冲动消费最有效的武器</li>
          <li>小额消费的年化累积远超想象</li>
          <li>理财不是不花钱，而是"清醒地"花钱</li>
        </ul>
      </div>
    </>
  );
}