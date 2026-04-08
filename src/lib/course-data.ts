/* ===== 35-module course data ===== */

export interface Module {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
  part: number;        // 1-7
}

export interface Part {
  id: number;
  title: string;
  emoji: string;
  modules: Module[];
}

export const parts: Part[] = [
  {
    id: 1,
    title: "认识钱",
    emoji: "💰",
    modules: [
      { id: 1, slug: "what-is-money", title: "钱是什么", subtitle: "货币的本质与演变", emoji: "🪙", part: 1 },
      { id: 2, slug: "where-money-goes", title: "钱去哪了", subtitle: "收入与支出的全景图", emoji: "📊", part: 1 },
      { id: 3, slug: "tracking-money", title: "记账这件小事", subtitle: "为什么记、怎么记", emoji: "📝", part: 1 },
      { id: 4, slug: "budgeting", title: "预算术", subtitle: "50/30/20 法则", emoji: "🎯", part: 1 },
      { id: 5, slug: "spending-psychology", title: "消费心理学", subtitle: "为什么你总忍不住花钱", emoji: "🧠", part: 1 },
    ],
  },
  {
    id: 2,
    title: "守住钱",
    emoji: "🛡️",
    modules: [
      { id: 6, slug: "saving", title: "储蓄的正确姿势", subtitle: "先付给自己", emoji: "🐷", part: 2 },
      { id: 7, slug: "emergency-fund", title: "应急基金", subtitle: "你的财务安全气囊", emoji: "🆘", part: 2 },
      { id: 8, slug: "debt-management", title: "债务管理", subtitle: "信用卡、花呗、房贷", emoji: "💳", part: 2 },
      { id: 9, slug: "credit-score", title: "信用体系", subtitle: "征信是什么，为什么重要", emoji: "📋", part: 2 },
    ],
  },
  {
    id: 3,
    title: "理解钱的规律",
    emoji: "📐",
    modules: [
      { id: 10, slug: "inflation", title: "通货膨胀", subtitle: "你的钱每天都在缩水", emoji: "📉", part: 3 },
      { id: 11, slug: "compound-interest", title: "复利效应", subtitle: "第八大奇迹", emoji: "🔄", part: 3 },
      { id: 12, slug: "time-value", title: "时间价值", subtitle: "今天的1块 > 明天的1块", emoji: "⏳", part: 3 },
      { id: 13, slug: "rule-of-72", title: "72法则", subtitle: "多久翻一倍的速算", emoji: "🔢", part: 3 },
      { id: 14, slug: "risk-and-return", title: "风险与收益", subtitle: "永恒的跷跷板", emoji: "⚖️", part: 3 },
    ],
  },
  {
    id: 4,
    title: "认识投资工具",
    emoji: "🧰",
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
    id: 5,
    title: "建立投资系统",
    emoji: "⚙️",
    modules: [
      { id: 23, slug: "investor-profile", title: "你是哪类投资者", subtitle: "风险画像测评", emoji: "🧪", part: 5 },
      { id: 24, slug: "asset-allocation", title: "资产配置", subtitle: "唯一的免费午餐", emoji: "🍕", part: 5 },
      { id: 25, slug: "dca-strategy", title: "定投策略", subtitle: "最适合普通人的方法", emoji: "📅", part: 5 },
      { id: 26, slug: "rebalancing", title: "再平衡", subtitle: "为什么要定期调整", emoji: "⚖️", part: 5 },
      { id: 27, slug: "account-system", title: "账户体系", subtitle: "钱该放几个篮子", emoji: "🧺", part: 5 },
    ],
  },
  {
    id: 6,
    title: "心态与避坑",
    emoji: "🧘",
    modules: [
      { id: 28, slug: "chasing-markets", title: "追涨杀跌", subtitle: "为什么你总买在最高点", emoji: "🎢", part: 6 },
      { id: 29, slug: "info-overload", title: "信息过载", subtitle: "如何过滤噪音", emoji: "📱", part: 6 },
      { id: 30, slug: "scams", title: "常见骗局", subtitle: "识别庞氏骗局与虚假理财", emoji: "🚨", part: 6 },
      { id: 31, slug: "long-term", title: "长期主义", subtitle: "投资是场马拉松", emoji: "🏃", part: 6 },
    ],
  },
  {
    id: 7,
    title: "人生理财地图",
    emoji: "🗺️",
    modules: [
      { id: 32, slug: "first-salary", title: "第一笔工资怎么分", subtitle: "职场新人方案", emoji: "🎓", part: 7 },
      { id: 33, slug: "travel-fund", title: "攒够旅行基金", subtitle: "短期目标规划", emoji: "✈️", part: 7 },
      { id: 34, slug: "rent-vs-buy", title: "租房还是买房", subtitle: "大额支出决策框架", emoji: "🏠", part: 7 },
      { id: 35, slug: "retirement", title: "养老规划", subtitle: "现在开始不算早", emoji: "🌅", part: 7 },
    ],
  },
];

export const allModules: Module[] = parts.flatMap((p) => p.modules);
export const TOTAL_MODULES = allModules.length; // 35

export function getModuleBySlug(slug: string): Module | undefined {
  return allModules.find((m) => m.slug === slug);
}

export function getModuleById(id: number): Module | undefined {
  return allModules.find((m) => m.id === id);
}

export function getPartById(id: number): Part | undefined {
  return parts.find((p) => p.id === id);
}

export function getNextModule(currentId: number): Module | undefined {
  return allModules.find((m) => m.id === currentId + 1);
}

export function getPrevModule(currentId: number): Module | undefined {
  return allModules.find((m) => m.id === currentId - 1);
}