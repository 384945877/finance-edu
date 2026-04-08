/**
 * 交易任务系统
 * 每个进阶课程模块关联一个实战任务，学完就练
 */

export type MissionType = "buy" | "sell" | "hold" | "profit" | "compare" | "portfolio";

export interface TradeMission {
  id: string;
  /** 关联的进阶课程模块 slug */
  moduleSlug: string;
  title: string;
  desc: string;
  /** 任务类型 */
  type: MissionType;
  /** 推荐标的 symbol（可选） */
  targetSymbol?: string;
  /** 目标金额/数量/百分比（视 type 而定） */
  targetValue?: number;
  /** 完成条件描述 */
  goal: string;
  /** 奖励经验值 */
  xp: number;
  /** 为什么做这个任务——连接课程知识 */
  reason: string;
  /** 分步操作引导 */
  steps: string[];
  /** 交易面板上下文提示 */
  hint: string;
}

/**
 * 30 个实战任务，对应进阶课程的 30 个模块
 * 任务ID = "mission-{moduleSlug}"
 */
export const TRADE_MISSIONS: TradeMission[] = [
  // Part 1: 看懂数据
  {
    id: "mission-read-financial-report", moduleSlug: "read-financial-report",
    title: "看数据买股", desc: "用刚学的财报知识，找一只你认为基本面不错的标的买入",
    type: "buy", targetValue: 100,
    goal: "买入任意标的 >= 100股", xp: 50,
    reason: "刚学了三张表，现在实际看看每只标的的特征描述，判断哪家公司「真的在赚钱」，然后买入。",
    steps: ["浏览左侧10只标的，点击查看每只的投资特征", "找到你认为现金流健康、利润可靠的标的", "在交易面板输入数量(>=100股)，点击买入"],
    hint: "看看每只标的下方的特征标签——哪只公司的描述像课程里说的「好公司」？",
  },
  {
    id: "mission-pe-pb-valuation", moduleSlug: "pe-pb-valuation",
    title: "低估值猎手", desc: "运用PE/PB估值思维，买入一只你认为被低估的标的",
    type: "buy",
    goal: "买入任意标的", xp: 50,
    reason: "课程教了PE/PB估值。现在看看10只标的的PE，找到PE最低的那几只——但记住，低PE不一定是好事，要想想为什么低。",
    steps: ["点击不同标的，对比它们的PE数值", "找PE偏低的标的（如阿里巴巴PE=10x）", "想想：它PE低是被低估，还是有风险因素？", "做出判断后买入"],
    hint: "阿里巴巴PE=10x vs 英伟达PE=55x——哪个更可能被低估？记住要同行业比较",
  },
  {
    id: "mission-roe-analysis", moduleSlug: "roe-analysis",
    title: "巴菲特选股法", desc: "用ROE筛选——买入高ROE+有品牌护城河的「贵州茅台」",
    type: "buy", targetSymbol: "600519",
    goal: "买入贵州茅台", xp: 60,
    reason: "巴菲特最爱ROE>15%的公司。贵州茅台ROE=30%，品牌护城河极深，定价权强——正是课程里讲的「优质股」典型。",
    steps: ["点击「贵州茅台」查看其投资特征：ROE 30%、护城河型", "这正是巴菲特式标的——高ROE+强品牌+低负债", "在交易面板买入贵州茅台（注意它单价较高，买少量即可）"],
    hint: "贵州茅台 ROE=30%，品牌护城河深。课程说连续5年ROE>15%是优质公司——它远超这个标准",
  },
  {
    id: "mission-cash-flow", moduleSlug: "cash-flow",
    title: "现金流之王", desc: "买入自由现金流最强的公司——「苹果公司」",
    type: "buy", targetSymbol: "AAPL",
    goal: "买入苹果公司", xp: 60,
    reason: "课程说「利润可以造假，现金流不会」。苹果公司是全球自由现金流最强的公司之一——它不只是赚纸面利润，是真的收到了钱。",
    steps: ["点击「苹果公司」查看特征：标注为「现金牛」", "回忆课程——自由现金流为正的公司才是真赚钱", "买入苹果公司，体验「用现金流选股」的思路"],
    hint: "苹果公司被标注为「现金牛」——FCF常年为正，这是课程里说的最难造假的好指标",
  },
  {
    id: "mission-industry-comparison", moduleSlug: "industry-comparison",
    title: "跨行业配置", desc: "买入2个不同板块的标的，体验行业对比思维",
    type: "portfolio", targetValue: 2,
    goal: "持有 >= 2个不同板块", xp: 80,
    reason: "课程讲了不同行业估值体系完全不同。现在实操体验——买入科技+消费，或电商+债券，感受不同板块的波动差异。",
    steps: ["浏览10只标的，注意它们分属不同板块（科技/消费/电商/债券等）", "选2个不同板块各买一只", "观察它们的价格波动差异——高波动 vs 低波动"],
    hint: "试试一只高波动(科技/新能源)+一只低波动(消费/债券)，感受板块差异",
  },
  // Part 2: 基金实战
  {
    id: "mission-fund-screening", moduleSlug: "fund-screening",
    title: "分散配置", desc: "用选基五维法思维，买入3只不同标的做分散",
    type: "portfolio", targetValue: 3,
    goal: "持有 >= 3只标的", xp: 80,
    reason: "课程教了选基五维法。核心思想之一就是「分散」——不把鸡蛋放一个篮子里。买入3只不同标的体验分散投资。",
    steps: ["选择3只不同板块/风格的标的", "比如：1只指数+1只消费+1只债券", "分别买入，观察组合的整体波动比单只小"],
    hint: "分散的核心：不同标的涨跌不同步，整体波动更小。试试股+债+黄金的组合",
  },
  {
    id: "mission-morningstar-rating", moduleSlug: "morningstar-rating",
    title: "稳健底仓", desc: "买入波动最低的「国债ETF」作为组合压舱石",
    type: "buy", targetSymbol: "BOND",
    goal: "买入国债ETF", xp: 50,
    reason: "课程讲了晨星评级看的是「风险调整后收益」。国债ETF虽然收益低，但风险极低——它是你组合的安全垫。",
    steps: ["点击「国债ETF」，注意它的波动率极低(0.3%)", "这就是课程说的「防御类资产」", "买入一些作为组合的稳定底仓"],
    hint: "国债ETF波动率0.3%，几乎不涨不跌——但这正是它的价值：股市暴跌时你还有它",
  },
  {
    id: "mission-dca-advanced", moduleSlug: "dca-advanced",
    title: "模拟定投", desc: "分3次买入同一只标的，体验分批建仓",
    type: "buy", targetValue: 3,
    goal: "同一标的买入 >= 3次", xp: 100,
    reason: "估值定投的核心是「分批买入」——不一次性All in，而是分多次进场，摊平成本。现在体验这个过程。",
    steps: ["选一只你看好的标的（推荐标普500指数）", "先买入一笔（比如总资金的10%）", "等几秒价格波动后再买第二笔", "再等几秒买第三笔——你的平均成本被分散了"],
    hint: "注意三次买入的价格不同——这就是定投「均摊成本」的原理",
  },
  {
    id: "mission-take-profit", moduleSlug: "take-profit",
    title: "止盈实战", desc: "卖出一只持仓，练习「落袋为安」",
    type: "sell",
    goal: "卖出任意持仓", xp: 80,
    reason: "课程说「会买是徒弟，会卖是师傅」。很多人只会买不会卖。现在练习一次卖出——管它赚了还是亏了，重要的是学会执行。",
    steps: ["查看右侧持仓列表，找一只已有持仓", "切换到「卖出」面板", "输入数量卖出——感受一下「落袋为安」的操作"],
    hint: "切换到「卖出」tab，选择你的持仓。课程说不追求卖在最高点，落袋为安最重要",
  },
  {
    id: "mission-fof-combo", moduleSlug: "fof-combo",
    title: "组合基金思维", desc: "像FOF一样，同时持有4只以上标的做组合",
    type: "portfolio", targetValue: 4,
    goal: "持有 >= 4只标的", xp: 100,
    reason: "FOF的思维就是「买一篮子」。与其选一只赌对错，不如分散到多只——你现在就是自己的FOF经理。",
    steps: ["检查当前持仓，看还缺哪些板块", "补齐到至少4只不同标的", "建议覆盖：股票+指数+债券+黄金"],
    hint: "FOF的核心是分散。你的组合里有股票、指数、债券和黄金吗？缺什么补什么",
  },
  // Part 3: 股票实战
  { id: "mission-open-account", moduleSlug: "open-account", title: "第一笔交易", desc: "完成你人生中的第一笔买入", type: "buy", goal: "完成一笔买入", xp: 30, reason: "万事开头难。开户之后最重要的就是迈出第一步——随便买一只，体验「下单」这个动作本身。", steps: ["浏览标的列表，选一只感兴趣的", "在交易面板输入数量（先少买一点）", "点击买入——恭喜你完成了第一笔交易！"], hint: "别纠结选哪只，先买1股体验流程。第一笔交易的意义大于金额" },
  { id: "mission-technical-analysis", moduleSlug: "technical-analysis", title: "看图交易", desc: "观察分时图走势，在你觉得合适的时机买入「宁德时代」", type: "buy", targetSymbol: "300750", goal: "买入宁德时代", xp: 60, reason: "课程讲了K线和技术分析。宁德时代波动率3.8%（最高之一），是练习看图交易的最佳标的——价格变化明显。", steps: ["点击「宁德时代」，观察它的分时走势图", "注意：它波动很大，价格时刻在变", "挑一个你觉得价格相对低的时刻买入", "体验「看图决策」的过程（不追求完美择时）"], hint: "宁德时代波动率3.8%——看分时图的走势，试着在回调时买入而不是追涨" },
  { id: "mission-value-investing", moduleSlug: "value-investing", title: "价值投资", desc: "用价值投资逻辑买入低PE的「阿里巴巴」", type: "buy", targetSymbol: "9988.HK", goal: "买入阿里巴巴", xp: 60, reason: "课程讲了价值投资三步法：好公司+好价格+长期持有。阿里巴巴PE=10x，远低于行业均值——可能是被市场低估的机会。", steps: ["点击「阿里巴巴」查看特征：PE=10x，价值股风格", "思考：它PE低是因为被低估，还是有风险？（课程讲了要辨别）", "如果你认为是机会，买入并计划长期持有"], hint: "阿里巴巴PE=10x，被标注为「价值股」。课程说好价格=PE低于历史均值——但也要想想风险" },
  { id: "mission-growth-stock", moduleSlug: "growth-stock", title: "押注成长", desc: "用成长股逻辑买入高增长的「英伟达」", type: "buy", targetSymbol: "NVDA", goal: "买入英伟达", xp: 60, reason: "课程讲了成长股看营收增速和PEG。英伟达ROE=85%极高，但PE=55x也不便宜——典型的高成长高估值。你愿意为增长付溢价吗？", steps: ["点击「英伟达」查看特征：ROE 85%、PE 55x、成长股", "对比贵州茅台(ROE 30%、PE 28x)——成长股估值为什么更高？", "课程说的PEG：如果增速50%，PE=55÷50=1.1，勉强合理", "决定后小仓位买入——成长股永远不要重仓"], hint: "英伟达ROE=85%但PE=55x。课程说成长股看PEG——增速能撑住估值吗？先小仓位试试" },
  { id: "mission-etf-strategy", moduleSlug: "etf-strategy", title: "ETF核心配置", desc: "买入「标普500指数」指数作为核心仓位", type: "buy", targetSymbol: "SPX", goal: "买入标普500指数", xp: 60, reason: "课程讲了核心-卫星策略：70%核心仓位用宽基指数。标普500指数持有500家公司，分散了个股风险——巴菲特说普通人买这个就够了。", steps: ["点击「标普500指数」查看特征：宽基指数、PE 22x、风险中等", "这就是课程说的「核心仓位」标的", "买入占总资金20-30%的标普500指数作为核心底仓"], hint: "标普500指数是巴菲特推荐给普通人的选择——分散持有500家公司，适合做组合的核心" },
  { id: "mission-hk-us-stock", moduleSlug: "hk-us-stock", title: "全球视野", desc: "同时持有中概股+美股标的，体验全球配置", type: "portfolio", targetValue: 2, goal: "持有中概+美股标的", xp: 80, reason: "课程讲了全球配置分散风险。中国和美国经济周期不完全同步——同时持有两个市场的标的，一个跌了另一个可能没跌。", steps: ["买入一只中概股（阿里巴巴/拼多多）", "再买入一只美股（苹果公司/英伟达/标普500指数）", "观察它们的价格走势是否完全同步"], hint: "中概(阿里巴巴/拼多多) + 美股(苹果/英伟达) = 全球配置的基础" },
  // Part 4: 债券进阶
  { id: "mission-convertible-bond", moduleSlug: "convertible-bond", title: "攻守兼备", desc: "同时持有股票类+债券类标的，构建攻守组合", type: "portfolio", targetValue: 2, goal: "同时持有股票+债券", xp: 80, reason: "可转债的核心思想是「攻守兼备」。在组合里同时配股票和债券——涨的时候股票赚钱，跌的时候债券撑住。", steps: ["确认你已持有至少一只股票类标的", "再买入「国债ETF」或「黄金AU」做防守", "你的组合现在有了「进攻+防守」两条腿"], hint: "股票是进攻方，债券/黄金是防守方——两条腿走路比一条腿稳" },
  { id: "mission-reverse-repo", moduleSlug: "reverse-repo", title: "现金管理", desc: "把30%以上的资金配置在国债ETF上——闲钱不能白放着", type: "buy", targetSymbol: "BOND", targetValue: 30, goal: "国债ETF占比 >= 30%", xp: 80, reason: "课程讲了逆回购是管理闲钱的工具。同样的道理：不交易的钱不要空放在账户里，配置国债ETF至少还有一点收益。", steps: ["查看当前可用资金占总资产的比例", "如果闲置资金过多，买入国债ETF", "目标：国债ETF占总资产30%以上"], hint: "可用资金太多=效率低。课程说闲钱不要白放着——至少配点国债ETF" },
  { id: "mission-credit-bond", moduleSlug: "credit-bond", title: "止损练习", desc: "卖出任意一只持仓——练习「当信号不对时果断离场」", type: "sell", goal: "卖出任意持仓", xp: 60, reason: "课程讲了信用债违约风险。投资中也要学会止损——发现逻辑不对时果断卖出，不要死扛。", steps: ["看看你的持仓，有没有亏损的", "如果有，切换到「卖出」面板卖掉它", "即使没亏也练一次卖出——学会「离场」和「进场」一样重要"], hint: "切换到「卖出」tab。课程说信用债要懂得止损——股票也一样，不对就走" },
  { id: "mission-bond-fund-strategy", moduleSlug: "bond-fund-strategy", title: "防御配置", desc: "让债券+黄金（防御资产）占你总持仓的40%以上", type: "portfolio", goal: "防御类资产占比 >= 40%", xp: 100, reason: "课程讲了纯债基金是资产配置的压舱石。把组合里的防御资产（国债ETF+黄金AU）比例拉到40%——这是稳健型配置。", steps: ["计算当前持仓中国债ETF+黄金AU的占比", "如果不足40%，卖出部分股票或增加防御资产", "目标：构建一个稳健型投资组合"], hint: "稳健型组合 = 60%股票 + 40%债券/黄金。你的防御资产够了吗？" },
  // Part 5: 另类投资
  { id: "mission-reits-practice", moduleSlug: "reits-practice", title: "另类试水", desc: "买入黄金AU——体验和股票完全不同的资产", type: "buy", targetSymbol: "AU9999", goal: "买入黄金AU", xp: 60, reason: "课程讲了REITs和另类资产。黄金AU和股票的涨跌逻辑不同——股市恐慌时黄金往往上涨，这就是「低相关性」。", steps: ["点击「黄金AU」查看特征：避险、风险低", "买入一些黄金AU", "之后观察：黄金和股票标的的涨跌是不是不同步？"], hint: "黄金与股票低相关——当你的股票在跌时，看看黄金是不是在涨" },
  { id: "mission-commodity-futures", moduleSlug: "commodity-futures", title: "黄金配置", desc: "将5-10%的资金配置在黄金上——课程推荐的比例", type: "buy", targetSymbol: "AU9999", goal: "黄金占比 >= 10%", xp: 60, reason: "课程说商品配置5-10%就够了。黄金的作用不是赚大钱，而是在市场恐慌时给你的组合加一层保护。", steps: ["计算10万总资产的10% = 1万", "买入约1万元的黄金AU", "这就是课程说的「保险配置」"], hint: "5-10%黄金 = 给组合买保险。不需要多，但不能没有" },
  { id: "mission-options-intro", moduleSlug: "options-intro", title: "波动体验", desc: "买入比特币——感受「极高波动」到底是什么感觉", type: "buy", targetSymbol: "BTC", goal: "买入比特币", xp: 60, reason: "课程讲了期权的高波动特性。比特币波动率4.5%（所有标的最高）——用极小的仓位买一点，亲身感受价格剧烈波动。", steps: ["点击「比特币」——注意它的价格波动有多剧烈", "只用总资产的1-3%买入（课程说不超过5%）", "然后盯着看30秒——感受心跳加速的感觉"], hint: "比特币波动率4.5%是最高的。只买一点点体验波动——课程说做好归零准备" },
  { id: "mission-crypto-cold", moduleSlug: "crypto-cold", title: "仓位管理", desc: "确保比特币仓位不超过总资产的5%——纪律比感觉重要", type: "buy", targetSymbol: "BTC", goal: "小仓位买入BTC", xp: 60, reason: "课程反复强调：加密资产不超过5%。这个任务让你体验「控制仓位」的纪律——知道能买多少和知道该买多少是两回事。", steps: ["计算5%的总资产 = 5000元", "买入不超过5000元的比特币", "记住：纪律就是「能买更多但选择不买」"], hint: "总资产10万的5%=5000元。纪律的核心：有钱也不多买" },
  // Part 6: 实战组合
  { id: "mission-build-portfolio", moduleSlug: "build-portfolio", title: "构建组合", desc: "持有5只以上标的，覆盖3个板块——做自己的基金经理", type: "portfolio", targetValue: 5, goal: "持有 >= 5只 + 3个板块", xp: 150, reason: "课程讲了核心-卫星策略。现在构建你的完整组合：核心仓位(指数)+卫星(行业股)+防御(债券/黄金)+博弈(加密)。", steps: ["核心：买入标普500指数(30%资金)", "卫星：选2只看好的个股(各10-15%)", "防御：配国债ETF+黄金AU(各10-15%)", "博弈：比特币小仓位(3-5%)", "检查：至少5只标的、3个以上板块"], hint: "参考配置：30%指数 + 25%个股 + 25%债券黄金 + 5%加密 + 15%现金" },
  { id: "mission-backtest-review", moduleSlug: "backtest-review", title: "复盘交易", desc: "去交易记录页回顾你的所有交易——哪些做对了？", type: "buy", targetValue: 10, goal: "累计 >= 10笔交易", xp: 100, reason: "课程说不复盘的投资者注定重复犯同样的错误。10笔交易后回头看：哪些买对了？哪些是冲动决策？", steps: ["先确保你已完成至少10笔交易", "点击右侧「查看交易记录」", "回顾每笔交易：当时为什么买/卖？结果如何？"], hint: "够10笔了吗？去交易记录页复盘——课程说每月花30分钟复盘比看100篇分析有用" },
  { id: "mission-tax-optimization", moduleSlug: "tax-optimization", title: "控制成本", desc: "完成一笔卖出——意识到每次交易都有成本", type: "sell", goal: "完成一笔卖出", xp: 50, reason: "课程讲了频繁交易的手续费是隐形杀手。每次买卖都有成本——所以不要频繁操作，想清楚再下单。", steps: ["切换到「卖出」面板", "卖出一只持仓", "想想：如果每天交易3次，一年的成本有多高？（课程答案：可能超过30%）"], hint: "每次交易都有成本。课程说频繁交易者一年手续费可能吃掉30%——所以想好再买卖" },
  { id: "mission-broker-selection", moduleSlug: "broker-selection", title: "全品种体验", desc: "交易过至少6只不同标的——了解不同资产的「性格」", type: "portfolio", targetValue: 6, goal: "交易过 >= 6只标的", xp: 100, reason: "每种资产都有自己的「性格」——科技股暴躁、债券温和、黄金神秘、加密疯狂。只有亲自交易过才有感觉。", steps: ["检查你的交易历史，看交易过哪些标的", "找到还没交易过的板块", "尝试买入——感受不同资产的波动性格"], hint: "科技暴躁、消费稳重、债券温和、加密疯狂——每种都体验一下才知道自己适合什么" },
  { id: "mission-investment-toolbox", moduleSlug: "investment-toolbox", title: "观察行情", desc: "在交易大厅盯盘60秒——体验实时行情的节奏", type: "hold", goal: "观察行情 >= 60秒", xp: 30, reason: "课程推荐了各种工具。最基本的工具就是行情看板——看几十秒实时行情，感受价格跳动的节奏。", steps: ["不要急着交易，先看60秒行情", "注意哪些标的跳动快（高波动），哪些几乎不动（低波动）", "这就是「风险」的直观感受"], hint: "先别动手——看60秒行情，感受不同标的的「心跳频率」" },
  { id: "mission-annual-checkup", moduleSlug: "annual-checkup", title: "盈利毕业", desc: "让你的总资产大于10万——用实际盈利验证你学到的知识", type: "profit", goal: "总资产 > 100,000", xp: 200, reason: "课程的最后一课是年度体检——看你的投资结果。如果总资产还是正的（没亏钱），说明你的配置和决策是合格的。", steps: ["查看顶部的总资产数字", "如果还没超过10万，调整你的持仓配置", "目标：用合理的配置让资产增长，而不是靠赌"], hint: "终极目标：总资产>10万。不是靠赌一把，而是靠合理配置+时间" },
];

/** 根据模块 slug 查找对应任务 */
export function getMissionBySlug(moduleSlug: string): TradeMission | undefined {
  return TRADE_MISSIONS.find((m) => m.moduleSlug === moduleSlug);
}

/** 根据任务 id 查找 */
export function getMissionById(id: string): TradeMission | undefined {
  return TRADE_MISSIONS.find((m) => m.id === id);
}