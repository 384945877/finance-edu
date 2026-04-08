/**
 * 模拟行情引擎
 * 10 只虚拟标的 + 基于布朗运动的实时价格波动
 */

export interface Stock {
  symbol: string;       // 代码
  name: string;         // 名称
  emoji: string;        // 图标
  category: string;     // 板块
  basePrice: number;    // 基准价
  volatility: number;   // 日波动率（0-1）
  /** 投资特征标注，连接课程知识 */
  traits: {
    roe?: string;       // ROE 水平
    pe?: string;        // PE 水平
    style?: string;     // 投资风格标签
    risk?: string;      // 风险等级
    tip?: string;       // 一句话投资逻辑
  };
}

export interface Tick {
  price: number;
  change: number;       // 涨跌额
  changePercent: number; // 涨跌幅 %
  high: number;
  low: number;
  open: number;
  volume: number;
  timestamp: number;
}

export interface KLineBar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/** 10 只虚拟标的 */
export const STOCKS: Stock[] = [
  { symbol: "AAPL", name: "苹果科技", emoji: "🍎", category: "科技", basePrice: 188.5, volatility: 0.022, traits: { roe: "160%", pe: "32x", style: "现金牛", risk: "中", tip: "全球现金流最强的公司之一，自由现金流常年为正" } },
  { symbol: "TSLA", name: "星际电车", emoji: "🚗", category: "新能源", basePrice: 245.0, volatility: 0.038, traits: { roe: "22%", pe: "65x", style: "成长股", risk: "高", tip: "高增长+高波动，典型成长股——营收增速快但估值贵" } },
  { symbol: "BABA", name: "东方电商", emoji: "🛒", category: "电商", basePrice: 85.2, volatility: 0.028, traits: { roe: "12%", pe: "10x", style: "价值股", risk: "中", tip: "低PE中概龙头，可能被低估也可能有折价原因" } },
  { symbol: "NVDA", name: "芯动力", emoji: "🧠", category: "芯片", basePrice: 480.0, volatility: 0.035, traits: { roe: "85%", pe: "55x", style: "成长股", risk: "高", tip: "AI算力龙头，ROE极高但估值也高——典型PEG选股标的" } },
  { symbol: "PDD", name: "拼多省", emoji: "🏷️", category: "电商", basePrice: 128.0, volatility: 0.032, traits: { roe: "35%", pe: "12x", style: "价值成长", risk: "中高", tip: "高ROE+低PE的罕见组合，但有政策和竞争风险" } },
  { symbol: "MOUTAI", name: "酱香白酒", emoji: "🍶", category: "消费", basePrice: 1680.0, volatility: 0.015, traits: { roe: "30%", pe: "28x", style: "护城河", risk: "低", tip: "巴菲特式标的——品牌护城河+高ROE+强定价权" } },
  { symbol: "BTC", name: "比特币", emoji: "₿", category: "加密", basePrice: 65000.0, volatility: 0.045, traits: { style: "另类资产", risk: "极高", tip: "总量2100万枚，波动极大——不超过总资产5%配置" } },
  { symbol: "GOLD", name: "黄金ETF", emoji: "🥇", category: "贵金属", basePrice: 2350.0, volatility: 0.008, traits: { style: "避险", risk: "低", tip: "抗通胀+避险——组合配5-10%起到保险作用" } },
  { symbol: "SP500", name: "标普500", emoji: "📈", category: "指数", basePrice: 5200.0, volatility: 0.012, traits: { roe: "18%", pe: "22x", style: "宽基指数", risk: "中", tip: "分散持有500家美国公司——巴菲特推荐给普通人的选择" } },
  { symbol: "BOND", name: "国债ETF", emoji: "🏛️", category: "债券", basePrice: 100.0, volatility: 0.003, traits: { style: "防御资产", risk: "极低", tip: "零风险资产，收益低但在股市暴跌时是安全垫" } },
];

/** 高斯随机数（Box-Muller） */
function gaussRandom(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/** 生成一条新 Tick：基于上一个价格做随机游走 */
export function nextTick(stock: Stock, prev: Tick): Tick {
  const dt = 1 / 390; // ~1分钟 / 390分钟交易日
  const drift = 0.0001; // 微弱上升偏差
  const shock = stock.volatility * gaussRandom() * Math.sqrt(dt);
  const returnRate = drift * dt + shock;
  const newPrice = Math.max(prev.price * (1 + returnRate), 0.01);
  const price = Math.round(newPrice * 100) / 100;

  const change = price - prev.open;
  const changePercent = prev.open === 0 ? 0 : Math.round((change / prev.open) * 10000) / 100;

  return {
    price,
    change: Math.round(change * 100) / 100,
    changePercent,
    high: Math.max(prev.high, price),
    low: Math.min(prev.low, price),
    open: prev.open,
    volume: prev.volume + Math.floor(Math.random() * 5000),
    timestamp: Date.now(),
  };
}

/** 根据 basePrice 创建初始 Tick */
export function initTick(stock: Stock): Tick {
  // 给一个 ±3% 的随机开盘偏移
  const openOffset = 1 + (Math.random() - 0.5) * 0.06;
  const open = Math.round(stock.basePrice * openOffset * 100) / 100;
  return {
    price: open,
    change: 0,
    changePercent: 0,
    high: open,
    low: open,
    open,
    volume: Math.floor(Math.random() * 100000),
    timestamp: Date.now(),
  };
}

/** 生成 N 根历史 K 线（从右往左，最右=当前） */
export function generateKLines(stock: Stock, bars: number = 60): KLineBar[] {
  const result: KLineBar[] = [];
  let price = stock.basePrice;
  const now = Date.now();
  const interval = 5 * 60 * 1000; // 5 分钟

  for (let i = bars; i >= 0; i--) {
    const open = price;
    const changes = Array.from({ length: 5 }, () =>
      price * stock.volatility * gaussRandom() * Math.sqrt(1 / 390)
    );

    let high = open, low = open, close = open;
    for (const c of changes) {
      close = Math.max(close + c, 0.01);
      high = Math.max(high, close);
      low = Math.min(low, close);
    }

    result.push({
      time: now - i * interval,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume: Math.floor(Math.random() * 200000) + 50000,
    });

    price = close;
  }

  return result;
}