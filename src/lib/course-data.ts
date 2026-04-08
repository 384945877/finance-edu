/* ===== Multi-course data system ===== */

export interface Module {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
  part: number;
}

export interface Part {
  id: number;
  title: string;
  emoji: string;
  modules: Module[];
}

export interface Course {
  id: string;           // "beginner" | "intermediate" | "advanced"
  title: string;
  subtitle: string;
  emoji: string;
  level: string;
  color: string;
  parts: Part[];
}

/* ===== Lv.1 理财小白 (35 modules) ===== */
const beginnerParts: Part[] = [
  {
    id: 1, title: "认识钱", emoji: "💰",
    modules: [
      { id: 1, slug: "what-is-money", title: "钱是什么", subtitle: "货币的本质与演变", emoji: "🪙", part: 1 },
      { id: 2, slug: "where-money-goes", title: "钱去哪了", subtitle: "收入与支出的全景图", emoji: "📊", part: 1 },
      { id: 3, slug: "tracking-money", title: "记账这件小事", subtitle: "为什么记、怎么记", emoji: "📝", part: 1 },
      { id: 4, slug: "budgeting", title: "预算术", subtitle: "50/30/20 法则", emoji: "🎯", part: 1 },
      { id: 5, slug: "spending-psychology", title: "消费心理学", subtitle: "为什么你总忍不住花钱", emoji: "🧠", part: 1 },
    ],
  },
  {
    id: 2, title: "守住钱", emoji: "🛡️",
    modules: [
      { id: 6, slug: "saving", title: "储蓄的正确姿势", subtitle: "先付给自己", emoji: "🐷", part: 2 },
      { id: 7, slug: "emergency-fund", title: "应急基金", subtitle: "你的财务安全气囊", emoji: "🆘", part: 2 },
      { id: 8, slug: "debt-management", title: "债务管理", subtitle: "信用卡、花呗、房贷", emoji: "💳", part: 2 },
      { id: 9, slug: "credit-score", title: "信用体系", subtitle: "征信是什么，为什么重要", emoji: "📋", part: 2 },
    ],
  },
  {
    id: 3, title: "理解钱的规律", emoji: "📐",
    modules: [
      { id: 10, slug: "inflation", title: "通货膨胀", subtitle: "你的钱每天都在缩水", emoji: "📉", part: 3 },
      { id: 11, slug: "compound-interest", title: "复利效应", subtitle: "第八大奇迹", emoji: "🔄", part: 3 },
      { id: 12, slug: "time-value", title: "时间价值", subtitle: "今天的1块 > 明天的1块", emoji: "⏳", part: 3 },
      { id: 13, slug: "rule-of-72", title: "72法则", subtitle: "多久翻一倍的速算", emoji: "🔢", part: 3 },
      { id: 14, slug: "risk-and-return", title: "风险与收益", subtitle: "永恒的跷跷板", emoji: "⚖️", part: 3 },
    ],
  },
  {
    id: 4, title: "认识投资工具", emoji: "🧰",
    modules: [
      { id: 15, slug: "bank-deposit", title: "银行存款", subtitle: "最安全的起点", emoji: "🏦", part: 4 },
      { id: 16, slug: "money-market-fund", title: "货币基金", subtitle: "余额宝们的真相", emoji: "💵", part: 4 },
      { id: 17, slug: "bonds", title: "债券", subtitle: "借钱给国家/公司", emoji: "📄", part: 4 },
      { id: 18, slug: "fund-basics", title: "基金入门", subtitle: "让专业的人帮你投", emoji: "📦", part: 4 },
      { id: 19, slug: "index-fund", title: "指数基金", subtitle: "巴菲特推荐给普通人的", emoji: "📈", part: 4 },
      { id: 20, slug: "stock-basics", title: "股票基础", subtitle: "买公司的一小块", emoji: "🏢", part: 4 },
      { id: 21, slug: "insurance", title: "保险", subtitle: "最该买但最容易买错的", emoji: "🛡️", part: 4 },
      { id: 22, slug: "gold-and-others", title: "黄金与其他", subtitle: "避险资产与另类投资", emoji: "🥇", part: 4 },
    ],
  },
  {
    id: 5, title: "建立投资系统", emoji: "⚙️",
    modules: [
      { id: 23, slug: "investor-profile", title: "你是哪类投资者", subtitle: "风险画像测评", emoji: "🧪", part: 5 },
      { id: 24, slug: "asset-allocation", title: "资产配置", subtitle: "唯一的免费午餐", emoji: "🍕", part: 5 },
      { id: 25, slug: "dca-strategy", title: "定投策略", subtitle: "最适合普通人的方法", emoji: "📅", part: 5 },
      { id: 26, slug: "rebalancing", title: "再平衡", subtitle: "为什么要定期调整", emoji: "⚖️", part: 5 },
      { id: 27, slug: "account-system", title: "账户体系", subtitle: "钱该放几个篮子", emoji: "🧺", part: 5 },
    ],
  },
  {
    id: 6, title: "心态与避坑", emoji: "🧘",
    modules: [
      { id: 28, slug: "chasing-markets", title: "追涨杀跌", subtitle: "为什么你总买在最高点", emoji: "🎢", part: 6 },
      { id: 29, slug: "info-overload", title: "信息过载", subtitle: "如何过滤噪音", emoji: "📱", part: 6 },
      { id: 30, slug: "scams", title: "常见骗局", subtitle: "识别庞氏骗局与虚假理财", emoji: "🚨", part: 6 },
      { id: 31, slug: "long-term", title: "长期主义", subtitle: "投资是场马拉松", emoji: "🏃", part: 6 },
    ],
  },
  {
    id: 7, title: "人生理财地图", emoji: "🗺️",
    modules: [
      { id: 32, slug: "first-salary", title: "第一笔工资怎么分", subtitle: "职场新人方案", emoji: "🎓", part: 7 },
      { id: 33, slug: "travel-fund", title: "攒够旅行基金", subtitle: "短期目标规划", emoji: "✈️", part: 7 },
      { id: 34, slug: "rent-vs-buy", title: "租房还是买房", subtitle: "大额支出决策框架", emoji: "🏠", part: 7 },
      { id: 35, slug: "retirement", title: "养老规划", subtitle: "现在开始不算早", emoji: "🌅", part: 7 },
    ],
  },
];

/* ===== Lv.2 进阶实战 (30 modules) ===== */
const intermediateParts: Part[] = [
  {
    id: 1, title: "看懂数据", emoji: "📊",
    modules: [
      { id: 1, slug: "read-financial-report", title: "读懂财报", subtitle: "三张表的核心逻辑", emoji: "📑", part: 1 },
      { id: 2, slug: "pe-pb-valuation", title: "PE/PB估值", subtitle: "判断贵还是便宜", emoji: "🏷️", part: 1 },
      { id: 3, slug: "roe-analysis", title: "ROE分析", subtitle: "巴菲特最爱的指标", emoji: "🎯", part: 1 },
      { id: 4, slug: "cash-flow", title: "现金流分析", subtitle: "利润可以造假，现金流不会", emoji: "💧", part: 1 },
      { id: 5, slug: "industry-comparison", title: "行业对比", subtitle: "不同行业怎么比", emoji: "🔍", part: 1 },
    ],
  },
  {
    id: 2, title: "基金实战", emoji: "🎖️",
    modules: [
      { id: 6, slug: "fund-screening", title: "选基五维法", subtitle: "业绩/回撤/费率/经理/规模", emoji: "🔬", part: 2 },
      { id: 7, slug: "morningstar-rating", title: "晨星评级", subtitle: "看懂基金的体检报告", emoji: "⭐", part: 2 },
      { id: 8, slug: "dca-advanced", title: "定投进阶", subtitle: "智能定投与估值定投", emoji: "📈", part: 2 },
      { id: 9, slug: "take-profit", title: "止盈策略", subtitle: "会买是徒弟，会卖是师傅", emoji: "🎯", part: 2 },
      { id: 10, slug: "fof-combo", title: "FOF与组合基金", subtitle: "基金中的基金", emoji: "📦", part: 2 },
    ],
  },
  {
    id: 3, title: "股票实战", emoji: "📈",
    modules: [
      { id: 11, slug: "open-account", title: "开户实操", subtitle: "从注册到第一笔交易", emoji: "🏦", part: 3 },
      { id: 12, slug: "technical-analysis", title: "K线与技术面", subtitle: "看懂图表的基础", emoji: "📉", part: 3 },
      { id: 13, slug: "value-investing", title: "价值投资选股", subtitle: "找到被低估的好公司", emoji: "💎", part: 3 },
      { id: 14, slug: "growth-stock", title: "成长股逻辑", subtitle: "押注未来的赢家", emoji: "🚀", part: 3 },
      { id: 15, slug: "etf-strategy", title: "ETF实战", subtitle: "场内基金的玩法", emoji: "🎲", part: 3 },
      { id: 16, slug: "hk-us-stock", title: "港美股入门", subtitle: "投资全球市场", emoji: "🌍", part: 3 },
    ],
  },
  {
    id: 4, title: "债券进阶", emoji: "📄",
    modules: [
      { id: 17, slug: "convertible-bond", title: "可转债", subtitle: "下有保底上不封顶", emoji: "🔄", part: 4 },
      { id: 18, slug: "reverse-repo", title: "国债逆回购", subtitle: "躺赚无风险收益", emoji: "💰", part: 4 },
      { id: 19, slug: "credit-bond", title: "信用债分析", subtitle: "怎么判断会不会违约", emoji: "🔍", part: 4 },
      { id: 20, slug: "bond-fund-strategy", title: "债基策略", subtitle: "纯债/混合/增强怎么选", emoji: "📋", part: 4 },
    ],
  },
  {
    id: 5, title: "另类投资", emoji: "🎰",
    modules: [
      { id: 21, slug: "reits-practice", title: "REITs实操", subtitle: "小钱投资大房产", emoji: "🏢", part: 5 },
      { id: 22, slug: "commodity-futures", title: "商品期货科普", subtitle: "原油黄金怎么玩", emoji: "🛢️", part: 5 },
      { id: 23, slug: "options-intro", title: "期权入门", subtitle: "给你的股票买保险", emoji: "🎯", part: 5 },
      { id: 24, slug: "crypto-cold", title: "数字资产冷知识", subtitle: "比特币的真相", emoji: "₿", part: 5 },
    ],
  },
  {
    id: 6, title: "实战组合", emoji: "🛠️",
    modules: [
      { id: 25, slug: "build-portfolio", title: "构建第一个组合", subtitle: "从理论到实操", emoji: "🧩", part: 6 },
      { id: 26, slug: "backtest-review", title: "回测与复盘", subtitle: "用数据验证策略", emoji: "📊", part: 6 },
      { id: 27, slug: "tax-optimization", title: "交易税费优化", subtitle: "少交一分是一分", emoji: "🧮", part: 6 },
      { id: 28, slug: "broker-selection", title: "券商选择", subtitle: "佣金/功能/服务对比", emoji: "🏪", part: 6 },
      { id: 29, slug: "investment-toolbox", title: "投资工具箱", subtitle: "好用的App和网站", emoji: "🧰", part: 6 },
      { id: 30, slug: "annual-checkup", title: "年度财务体检", subtitle: "每年必做的复盘清单", emoji: "🩺", part: 6 },
    ],
  },
];

/* ===== Lv.3 高阶规划 (25 modules) ===== */
const advancedParts: Part[] = [
  {
    id: 1, title: "家庭财务", emoji: "🏠",
    modules: [
      { id: 1, slug: "family-balance-sheet", title: "家庭资产负债表", subtitle: "摸清你的家底", emoji: "📋", part: 1 },
      { id: 2, slug: "cash-flow-planning", title: "现金流规划", subtitle: "让钱有序流动", emoji: "💧", part: 1 },
      { id: 3, slug: "dual-income", title: "双收入家庭策略", subtitle: "1+1怎么大于2", emoji: "👫", part: 1 },
      { id: 4, slug: "education-fund", title: "教育金规划", subtitle: "给孩子攒学费的正确方式", emoji: "🎓", part: 1 },
      { id: 5, slug: "big-purchase", title: "大额消费决策", subtitle: "车/装修/婚礼怎么规划", emoji: "🛒", part: 1 },
    ],
  },
  {
    id: 2, title: "税务智慧", emoji: "🧾",
    modules: [
      { id: 6, slug: "income-tax", title: "个税全解", subtitle: "搞懂你的工资条", emoji: "💸", part: 2 },
      { id: 7, slug: "bonus-optimization", title: "年终奖优化", subtitle: "单独计税还是合并", emoji: "🎁", part: 2 },
      { id: 8, slug: "special-deduction", title: "专项扣除最大化", subtitle: "少交税的合法武器", emoji: "🛡️", part: 2 },
      { id: 9, slug: "tax-saving", title: "合法节税策略", subtitle: "个体户/公积金/保险抵税", emoji: "🧮", part: 2 },
    ],
  },
  {
    id: 3, title: "保险深度", emoji: "🏥",
    modules: [
      { id: 10, slug: "critical-illness", title: "重疾险实操", subtitle: "怎么选不踩坑", emoji: "❤️", part: 3 },
      { id: 11, slug: "policy-checkup", title: "保单体检", subtitle: "你买的保险到底保了什么", emoji: "🔍", part: 3 },
      { id: 12, slug: "family-protection", title: "家庭保障方案", subtitle: "不同阶段怎么配", emoji: "👨‍👩‍👧‍👦", part: 3 },
      { id: 13, slug: "claim-practice", title: "理赔实战", subtitle: "出险了怎么拿到钱", emoji: "📝", part: 3 },
    ],
  },
  {
    id: 4, title: "房产策略", emoji: "🏗️",
    modules: [
      { id: 14, slug: "property-valuation", title: "房产估值", subtitle: "这套房到底值多少", emoji: "🏷️", part: 4 },
      { id: 15, slug: "mortgage-strategy", title: "房贷策略", subtitle: "等额本息vs等额本金", emoji: "🏦", part: 4 },
      { id: 16, slug: "provident-fund", title: "公积金最大化", subtitle: "被低估的福利", emoji: "💰", part: 4 },
      { id: 17, slug: "property-in-portfolio", title: "房产与资产配置", subtitle: "房子在你的财富中占多少", emoji: "🍕", part: 4 },
    ],
  },
  {
    id: 5, title: "海外视野", emoji: "🌏",
    modules: [
      { id: 18, slug: "qdii-fund", title: "QDII基金", subtitle: "在国内投全球", emoji: "🌐", part: 5 },
      { id: 19, slug: "hk-us-deep", title: "港美股深度", subtitle: "美股打新/港股通", emoji: "🇺🇸", part: 5 },
      { id: 20, slug: "global-allocation", title: "全球资产配置", subtitle: "不把鸡蛋放一个国家", emoji: "🌍", part: 5 },
      { id: 21, slug: "fx-risk", title: "汇率风险管理", subtitle: "换汇时机与对冲", emoji: "💱", part: 5 },
    ],
  },
  {
    id: 6, title: "财富传承", emoji: "👑",
    modules: [
      { id: 22, slug: "will-and-trust", title: "遗嘱与信托", subtitle: "提前安排不是忌讳", emoji: "📜", part: 6 },
      { id: 23, slug: "family-asset", title: "家族资产规划", subtitle: "富过三代的秘密", emoji: "🏰", part: 6 },
      { id: 24, slug: "insurance-legacy", title: "保险在传承中的角色", subtitle: "杠杆+确定性", emoji: "🛡️", part: 6 },
      { id: 25, slug: "charity", title: "慈善与公益", subtitle: "用财富创造更大价值", emoji: "❤️", part: 6 },
    ],
  },
];

/* ===== Courses registry ===== */
export const courses: Course[] = [
  {
    id: "beginner", title: "理财小白", subtitle: "从零开始，建立理财基本功",
    emoji: "🌱", level: "Lv.1", color: "#18E299",
    parts: beginnerParts,
  },
  {
    id: "intermediate", title: "进阶实战", subtitle: "看懂数据，实操交易，构建组合",
    emoji: "⚡", level: "Lv.2", color: "#f97316",
    parts: intermediateParts,
  },
  {
    id: "advanced", title: "高阶规划", subtitle: "家庭财务、税务优化、财富传承",
    emoji: "👑", level: "Lv.3", color: "#8b5cf6",
    parts: advancedParts,
  },
];

/* ===== Helper functions ===== */
export function getCourse(courseId: string): Course | undefined {
  return courses.find(c => c.id === courseId);
}

export function getAllModules(courseId: string): Module[] {
  const course = getCourse(courseId);
  return course ? course.parts.flatMap(p => p.modules) : [];
}

export function getTotalModules(courseId: string): number {
  return getAllModules(courseId).length;
}

export function getModuleBySlug(courseId: string, slug: string): Module | undefined {
  return getAllModules(courseId).find(m => m.slug === slug);
}

export function getModuleById(courseId: string, id: number): Module | undefined {
  return getAllModules(courseId).find(m => m.id === id);
}

export function getPartById(courseId: string, id: number): Part | undefined {
  return getCourse(courseId)?.parts.find(p => p.id === id);
}

export function getNextModule(courseId: string, currentId: number): Module | undefined {
  return getAllModules(courseId).find(m => m.id === currentId + 1);
}

export function getPrevModule(courseId: string, currentId: number): Module | undefined {
  return getAllModules(courseId).find(m => m.id === currentId - 1);
}

/* Backward compat — default to beginner */
export const parts = beginnerParts;
export const allModules = getAllModules("beginner");
export const TOTAL_MODULES = allModules.length;