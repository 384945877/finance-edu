/**
 * 模拟行情引擎
 * 虚拟标的 + 基于布朗运动的实时价格波动
 */

export type StockCategory = "A股" | "港美股" | "基金指数" | "固收与另类";

export interface Stock {
  symbol: string;       // 代码
  name: string;         // 名称
  category: StockCategory; // 板块分类
  basePrice: number;    // 基准价
  volatility: number;   // 日波动率（0-1）
  /** 投资特征标注，连接课程知识 */
  traits: {
    roe?: string;
    pe?: string;
    style?: string;
    risk?: string;
    tip?: string;
  };
}

export interface Tick {
  price: number;
  change: number;
  changePercent: number;
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

/** 标的分类定义 */
export const CATEGORIES: { key: StockCategory; label: string }[] = [
  { key: "A股", label: "A股" },
  { key: "港美股", label: "港美股" },
  { key: "基金指数", label: "基金指数" },
  { key: "固收与另类", label: "固收与另类" },
];

/** 全部虚拟标的 */
export const STOCKS: Stock[] = [
  // —— A股 ——
  {
    symbol: "600519", name: "贵州茅台", category: "A股",
    basePrice: 1680.0, volatility: 0.015,
    traits: { roe: "30%", pe: "28x", style: "护城河", risk: "低", tip: "品牌护城河+高ROE+强定价权，巴菲特式的长期持有标的" },
  },
  {
    symbol: "000858", name: "五粮液", category: "A股",
    basePrice: 148.0, volatility: 0.018,
    traits: { roe: "22%", pe: "20x", style: "价值白马", risk: "低", tip: "白酒行业第二龙头，估值合理、分红稳定" },
  },
  {
    symbol: "300750", name: "宁德时代", category: "A股",
    basePrice: 210.0, volatility: 0.032,
    traits: { roe: "18%", pe: "25x", style: "成长赛道", risk: "中高", tip: "全球动力电池龙头，成长确定性强但估值波动大" },
  },
  {
    symbol: "601318", name: "中国平安", category: "A股",
    basePrice: 48.5, volatility: 0.020,
    traits: { roe: "15%", pe: "9x", style: "价值低估", risk: "中", tip: "保险+金融综合龙头，低PE但市场对其增长有分歧" },
  },

  // —— 港美股 ——
  {
    symbol: "AAPL", name: "苹果公司", category: "港美股",
    basePrice: 188.5, volatility: 0.022,
    traits: { roe: "160%", pe: "32x", style: "现金牛", risk: "中", tip: "全球现金流最强的公司之一，自由现金流常年为正" },
  },
  {
    symbol: "NVDA", name: "英伟达", category: "港美股",
    basePrice: 480.0, volatility: 0.035,
    traits: { roe: "85%", pe: "55x", style: "成长股", risk: "高", tip: "AI算力龙头，ROE极高但估值也高——典型PEG选股标的" },
  },
  {
    symbol: "9988.HK", name: "阿里巴巴", category: "港美股",
    basePrice: 85.2, volatility: 0.028,
    traits: { roe: "12%", pe: "10x", style: "价值股", risk: "中", tip: "低PE互联网龙头，可能被低估也可能有折价原因" },
  },
  {
    symbol: "PDD", name: "拼多多", category: "港美股",
    basePrice: 128.0, volatility: 0.032,
    traits: { roe: "35%", pe: "12x", style: "价值成长", risk: "中高", tip: "高ROE+低PE的罕见组合，但有政策和竞争风险" },
  },

  // —— 基金指数 ——
  {
    symbol: "000300", name: "沪深300指数", category: "基金指数",
    basePrice: 3580.0, volatility: 0.012,
    traits: { roe: "12%", pe: "12x", style: "宽基指数", risk: "中", tip: "A股最具代表性的300家公司，定投首选" },
  },
  {
    symbol: "SPX", name: "标普500指数", category: "基金指数",
    basePrice: 5200.0, volatility: 0.012,
    traits: { roe: "18%", pe: "22x", style: "宽基指数", risk: "中", tip: "分散持有500家美国公司——巴菲特推荐给普通人的选择" },
  },
  {
    symbol: "CSI500", name: "中证500指数", category: "基金指数",
    basePrice: 5050.0, volatility: 0.016,
    traits: { roe: "9%", pe: "22x", style: "中盘成长", risk: "中高", tip: "中等市值成长型指数，弹性比沪深300更大" },
  },

  // —— 固收与另类 ——
  {
    symbol: "BOND", name: "国债ETF", category: "固收与另类",
    basePrice: 100.0, volatility: 0.003,
    traits: { style: "防御资产", risk: "极低", tip: "零风险资产，收益低但在股市暴跌时是安全垫" },
  },
  {
    symbol: "AU9999", name: "黄金AU", category: "固收与另类",
    basePrice: 580.0, volatility: 0.008,
    traits: { style: "避险", risk: "低", tip: "抗通胀+避险——组合配5-10%起到保险作用" },
  },
  {
    symbol: "BTC", name: "比特币", category: "固收与另类",
    basePrice: 65000.0, volatility: 0.045,
    traits: { style: "另类资产", risk: "极高", tip: "总量2100万枚，波动极大——不超过总资产5%配置" },
  },
];

/** 按分类分组 */
export function getStocksByCategory(): Record<StockCategory, Stock[]> {
  const result = {} as Record<StockCategory, Stock[]>;
  for (const cat of CATEGORIES) result[cat.key] = [];
  for (const s of STOCKS) result[s.category].push(s);
  return result;
}

/** 高斯随机数（Box-Muller） */
function gaussRandom(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/** 生成一条新 Tick：基于上一个价格做随机游走 */
export function nextTick(stock: Stock, prev: Tick): Tick {
  const dt = 1 / 390;
  const drift = 0.0001;
  const shock = stock.volatility * gaussRandom() * Math.sqrt(dt);
  const returnRate = drift * dt + shock;
  const newPrice = Math.max(prev.price * (1 + returnRate), 0.01);
  const price = Math.round(newPrice * 100) / 100;
  const change = price - prev.open;
  const changePercent = prev.open === 0 ? 0 : Math.round((change / prev.open) * 10000) / 100;
  return {
    price, change: Math.round(change * 100) / 100, changePercent,
    high: Math.max(prev.high, price), low: Math.min(prev.low, price),
    open: prev.open, volume: prev.volume + Math.floor(Math.random() * 5000),
    timestamp: Date.now(),
  };
}

/** 根据 basePrice 创建初始 Tick */
export function initTick(stock: Stock): Tick {
  const openOffset = 1 + (Math.random() - 0.5) * 0.06;
  const open = Math.round(stock.basePrice * openOffset * 100) / 100;
  return {
    price: open, change: 0, changePercent: 0,
    high: open, low: open, open,
    volume: Math.floor(Math.random() * 100000), timestamp: Date.now(),
  };
}

/** 生成 N 根历史 K 线 */
export function generateKLines(stock: Stock, bars: number = 60): KLineBar[] {
  const result: KLineBar[] = [];
  let price = stock.basePrice;
  const now = Date.now();
  const interval = 5 * 60 * 1000;
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
      open: Math.round(open * 100) / 100, high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100, close: Math.round(close * 100) / 100,
      volume: Math.floor(Math.random() * 200000) + 50000,
    });
    price = close;
  }
  return result;
}