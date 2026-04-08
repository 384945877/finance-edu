/**
 * 量化策略引擎
 * 6个经典策略 + 回测模拟 + 信号生成
 * 纯前端计算，基于模拟行情数据
 */

import { STOCKS, type Stock, generateKLines, type KLineBar } from "./market-engine";

// ===== 策略定义 =====

export type StrategyId = "dca" | "value-pe" | "momentum" | "mean-revert" | "golden-cross" | "risk-parity";

export interface Strategy {
  id: StrategyId;
  name: string;
  desc: string;
  logic: string;           // 一句话策略逻辑
  difficulty: "入门" | "进阶" | "高阶";
  riskLevel: "低" | "中" | "高";
  /** 策略适用的标的（symbol数组，空=全部） */
  symbols: string[];
  /** 策略关联的课程模块slug */
  relatedModule?: string;
  /** 参数说明 */
  params: { key: string; label: string; value: number; unit?: string }[];
}

export const STRATEGIES: Strategy[] = [
  {
    id: "dca",
    name: "定期定额",
    desc: "每个周期固定投入相同金额，不择时、不判断涨跌，用时间摊平成本",
    logic: "每期买入固定金额 → 价格低时多买、价格高时少买 → 长期摊平成本",
    difficulty: "入门",
    riskLevel: "低",
    symbols: ["000300", "SPX", "CSI500"],
    relatedModule: "dca-advanced",
    params: [
      { key: "amount", label: "每期投入", value: 2000, unit: "元" },
      { key: "period", label: "投入周期", value: 5, unit: "根K线" },
    ],
  },
  {
    id: "value-pe",
    name: "估值择时",
    desc: "PE低于阈值时加仓，PE高于阈值时减仓，用估值做买卖信号",
    logic: "PE < 低阈值 → 买入 | PE > 高阈值 → 卖出 | 区间内 → 持有",
    difficulty: "进阶",
    riskLevel: "中",
    symbols: ["000300", "CSI500", "600519", "9988.HK"],
    relatedModule: "pe-pb-valuation",
    params: [
      { key: "buyPE", label: "买入PE阈值", value: 12 },
      { key: "sellPE", label: "卖出PE阈值", value: 25 },
    ],
  },
  {
    id: "momentum",
    name: "动量突破",
    desc: "价格突破近N期最高点时买入，跌破近N期最低点时卖出",
    logic: "价格 > N期最高价 → 做多 | 价格 < N期最低价 → 清仓",
    difficulty: "进阶",
    riskLevel: "高",
    symbols: ["300750", "NVDA", "PDD"],
    relatedModule: "technical-analysis",
    params: [
      { key: "lookback", label: "回看周期", value: 20, unit: "根" },
    ],
  },
  {
    id: "mean-revert",
    name: "均值回归",
    desc: "价格偏离均线过多时反向操作，赌价格会回到均值",
    logic: "价格 < MA×(1-偏离度) → 买入 | 价格 > MA×(1+偏离度) → 卖出",
    difficulty: "高阶",
    riskLevel: "中",
    symbols: ["600519", "000858", "AAPL"],
    relatedModule: "technical-analysis",
    params: [
      { key: "maPeriod", label: "均线周期", value: 20, unit: "根" },
      { key: "deviation", label: "偏离阈值", value: 3, unit: "%" },
    ],
  },
  {
    id: "golden-cross",
    name: "均线金叉",
    desc: "短期均线上穿长期均线时买入，死叉时卖出，经典趋势跟踪策略",
    logic: "MA5 上穿 MA20 → 买入 | MA5 下穿 MA20 → 卖出",
    difficulty: "进阶",
    riskLevel: "中",
    symbols: ["000300", "SPX", "300750", "NVDA"],
    relatedModule: "technical-analysis",
    params: [
      { key: "shortMA", label: "短期均线", value: 5, unit: "根" },
      { key: "longMA", label: "长期均线", value: 20, unit: "根" },
    ],
  },
  {
    id: "risk-parity",
    name: "风险平价",
    desc: "按波动率倒数分配仓位，让每类资产对组合风险的贡献相等",
    logic: "仓位权重 = 1/波动率 → 低波动资产配更多、高波动资产配更少",
    difficulty: "高阶",
    riskLevel: "低",
    symbols: ["000300", "BOND", "AU9999", "BTC"],
    relatedModule: "build-portfolio",
    params: [
      { key: "rebalancePeriod", label: "再平衡周期", value: 20, unit: "根K线" },
    ],
  },
];

// ===== 回测引擎 =====

export interface BacktestResult {
  /** 每根K线对应的净值 */
  equity: number[];
  /** 基准（买入持有）净值 */
  benchmark: number[];
  /** 交易信号: 1=买, -1=卖, 0=持有 */
  signals: number[];
  /** 最终收益率 */
  totalReturn: number;
  /** 基准收益率 */
  benchmarkReturn: number;
  /** 最大回撤 */
  maxDrawdown: number;
  /** 交易次数 */
  tradeCount: number;
  /** 胜率 */
  winRate: number;
}

/** 计算简单移动平均 */
function sma(data: number[], period: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) { result.push(NaN); continue; }
    const slice = data.slice(i - period + 1, i + 1);
    result.push(slice.reduce((a, b) => a + b, 0) / period);
  }
  return result;
}

/** 运行回测 */
export function runBacktest(strategyId: StrategyId, symbol: string, bars = 200): BacktestResult {
  const stock = STOCKS.find(s => s.symbol === symbol) || STOCKS[0];
  const klines = generateKLines(stock, bars);
  const closes = klines.map(k => k.close);

  const strategy = STRATEGIES.find(s => s.id === strategyId)!;
  const signals: number[] = new Array(closes.length).fill(0);
  let position = 0; // 0=空仓, 1=满仓
  let cash = 100000;
  let shares = 0;
  const equity: number[] = [];
  const trades: { buyPrice: number; sellPrice: number }[] = [];
  let currentBuyPrice = 0;

  for (let i = 0; i < closes.length; i++) {
    const price = closes[i];
    let signal = 0;

    switch (strategyId) {
      case "dca": {
        const period = strategy.params.find(p => p.key === "period")!.value;
        if (i % period === 0 && i > 0) signal = 1;
        break;
      }
      case "value-pe": {
        const buyPE = strategy.params.find(p => p.key === "buyPE")!.value;
        const sellPE = strategy.params.find(p => p.key === "sellPE")!.value;
        // 模拟PE波动：用价格相对基准价的比值模拟
        const simulatedPE = (price / stock.basePrice) * 15;
        if (simulatedPE < buyPE && position === 0) signal = 1;
        else if (simulatedPE > sellPE && position === 1) signal = -1;
        break;
      }
      case "momentum": {
        const lb = strategy.params.find(p => p.key === "lookback")!.value;
        if (i >= lb) {
          const highN = Math.max(...closes.slice(i - lb, i));
          const lowN = Math.min(...closes.slice(i - lb, i));
          if (price > highN && position === 0) signal = 1;
          else if (price < lowN && position === 1) signal = -1;
        }
        break;
      }
      case "mean-revert": {
        const maPeriod = strategy.params.find(p => p.key === "maPeriod")!.value;
        const dev = strategy.params.find(p => p.key === "deviation")!.value / 100;
        const ma = sma(closes, maPeriod);
        if (!isNaN(ma[i])) {
          if (price < ma[i] * (1 - dev) && position === 0) signal = 1;
          else if (price > ma[i] * (1 + dev) && position === 1) signal = -1;
        }
        break;
      }
      case "golden-cross": {
        const s = strategy.params.find(p => p.key === "shortMA")!.value;
        const l = strategy.params.find(p => p.key === "longMA")!.value;
        const shortMA = sma(closes, s);
        const longMA = sma(closes, l);
        if (i > 0 && !isNaN(shortMA[i]) && !isNaN(longMA[i]) && !isNaN(shortMA[i-1]) && !isNaN(longMA[i-1])) {
          if (shortMA[i] > longMA[i] && shortMA[i-1] <= longMA[i-1] && position === 0) signal = 1;
          else if (shortMA[i] < longMA[i] && shortMA[i-1] >= longMA[i-1] && position === 1) signal = -1;
        }
        break;
      }
      case "risk-parity": {
        const rb = strategy.params.find(p => p.key === "rebalancePeriod")!.value;
        if (i % rb === 0 && i > 0) signal = position === 0 ? 1 : 0;
        break;
      }
    }

    // 执行交易
    if (signal === 1 && position === 0) {
      if (strategyId === "dca") {
        // 定投：每次买固定金额
        const amount = Math.min(strategy.params.find(p => p.key === "amount")!.value, cash);
        const buyShares = Math.floor(amount / price);
        if (buyShares > 0) {
          shares += buyShares;
          cash -= buyShares * price;
          currentBuyPrice = price;
          position = 1;
        }
      } else {
        shares = Math.floor(cash / price);
        cash -= shares * price;
        currentBuyPrice = price;
        position = 1;
      }
    } else if (signal === -1 && position === 1) {
      cash += shares * price;
      trades.push({ buyPrice: currentBuyPrice, sellPrice: price });
      shares = 0;
      position = 0;
    }

    signals[i] = signal;
    equity.push(Math.round((cash + shares * price) * 100) / 100);
  }

  // 基准：买入持有
  const benchmarkShares = Math.floor(100000 / closes[0]);
  const benchmarkCash = 100000 - benchmarkShares * closes[0];
  const benchmark = closes.map(p => Math.round((benchmarkCash + benchmarkShares * p) * 100) / 100);

  // 计算统计
  const finalEquity = equity[equity.length - 1];
  const totalReturn = Math.round(((finalEquity - 100000) / 100000) * 10000) / 100;
  const benchmarkReturn = Math.round(((benchmark[benchmark.length - 1] - 100000) / 100000) * 10000) / 100;

  let maxDD = 0, peak = equity[0];
  for (const e of equity) {
    if (e > peak) peak = e;
    const dd = (peak - e) / peak;
    if (dd > maxDD) maxDD = dd;
  }

  const wins = trades.filter(t => t.sellPrice > t.buyPrice).length;

  return {
    equity,
    benchmark,
    signals,
    totalReturn,
    benchmarkReturn,
    maxDrawdown: Math.round(maxDD * 10000) / 100,
    tradeCount: trades.length,
    winRate: trades.length === 0 ? 0 : Math.round((wins / trades.length) * 100),
  };
}

/** 获取策略推荐的标的 */
export function getStrategyStocks(strategy: Strategy): Stock[] {
  return strategy.symbols
    .map(sym => STOCKS.find(s => s.symbol === sym))
    .filter((s): s is Stock => !!s);
}

// ===== 实时信号引擎 =====

export type SignalAction = "buy" | "sell" | "hold";

export interface LiveSignal {
  action: SignalAction;
  reason: string;
  confidence: number; // 0-100
  strategyName: string;
  suggestedAmount?: number;
}

/**
 * 基于最近价格历史生成实时信号
 * priceHistory: 最近N根价格（至少20根）
 */
export function generateLiveSignal(
  strategyId: StrategyId,
  symbol: string,
  priceHistory: number[],
  cash: number,
): LiveSignal | null {
  const strategy = STRATEGIES.find(s => s.id === strategyId);
  if (!strategy) return null;
  if (!strategy.symbols.includes(symbol) && strategy.symbols.length > 0) return null;
  if (priceHistory.length < 5) return null;

  const stock = STOCKS.find(s => s.symbol === symbol);
  if (!stock) return null;

  const prices = priceHistory;
  const price = prices[prices.length - 1];
  const len = prices.length;

  switch (strategyId) {
    case "dca": {
      const period = strategy.params.find(p => p.key === "period")!.value;
      // 定投：简单按周期判断
      return {
        action: "buy",
        reason: `定投策略建议每${period}个周期定额买入`,
        confidence: 85,
        strategyName: strategy.name,
        suggestedAmount: strategy.params.find(p => p.key === "amount")!.value,
      };
    }
    case "value-pe": {
      const buyPE = strategy.params.find(p => p.key === "buyPE")!.value;
      const sellPE = strategy.params.find(p => p.key === "sellPE")!.value;
      const simulatedPE = (price / stock.basePrice) * 15;
      if (simulatedPE < buyPE) {
        return { action: "buy", reason: `当前模拟PE=${simulatedPE.toFixed(1)}，低于${buyPE}阈值，估值偏低`, confidence: 75, strategyName: strategy.name };
      } else if (simulatedPE > sellPE) {
        return { action: "sell", reason: `当前模拟PE=${simulatedPE.toFixed(1)}，高于${sellPE}阈值，估值偏高`, confidence: 70, strategyName: strategy.name };
      }
      return { action: "hold", reason: `当前模拟PE=${simulatedPE.toFixed(1)}，处于合理区间`, confidence: 60, strategyName: strategy.name };
    }
    case "momentum": {
      const lb = Math.min(strategy.params.find(p => p.key === "lookback")!.value, len - 1);
      if (lb < 3) return null;
      const recent = prices.slice(-lb);
      const highN = Math.max(...recent);
      const lowN = Math.min(...recent);
      if (price >= highN) {
        return { action: "buy", reason: `价格突破${lb}期最高点，动量向上`, confidence: 65, strategyName: strategy.name };
      } else if (price <= lowN) {
        return { action: "sell", reason: `价格跌破${lb}期最低点，动量向下`, confidence: 65, strategyName: strategy.name };
      }
      const pct = ((price - lowN) / (highN - lowN) * 100).toFixed(0);
      return { action: "hold", reason: `价格处于${lb}期区间${pct}%位置`, confidence: 50, strategyName: strategy.name };
    }
    case "mean-revert": {
      const maPeriod = Math.min(strategy.params.find(p => p.key === "maPeriod")!.value, len);
      const dev = strategy.params.find(p => p.key === "deviation")!.value / 100;
      if (maPeriod < 3) return null;
      const ma = prices.slice(-maPeriod).reduce((a, b) => a + b, 0) / maPeriod;
      if (price < ma * (1 - dev)) {
        return { action: "buy", reason: `价格低于MA${maPeriod}的${(dev*100).toFixed(0)}%，偏离均值，预期回归`, confidence: 70, strategyName: strategy.name };
      } else if (price > ma * (1 + dev)) {
        return { action: "sell", reason: `价格高于MA${maPeriod}的${(dev*100).toFixed(0)}%，偏离均值，预期回落`, confidence: 70, strategyName: strategy.name };
      }
      return { action: "hold", reason: `价格在MA${maPeriod}附近，无偏离信号`, confidence: 55, strategyName: strategy.name };
    }
    case "golden-cross": {
      const s = Math.min(strategy.params.find(p => p.key === "shortMA")!.value, len);
      const l = Math.min(strategy.params.find(p => p.key === "longMA")!.value, len);
      if (l < 3 || s < 2) return null;
      const shortNow = prices.slice(-s).reduce((a, b) => a + b, 0) / s;
      const longNow = prices.slice(-l).reduce((a, b) => a + b, 0) / l;
      const shortPrev = prices.slice(-s - 1, -1).reduce((a, b) => a + b, 0) / s;
      const longPrev = prices.slice(-l - 1, -1).reduce((a, b) => a + b, 0) / l;
      if (shortNow > longNow && shortPrev <= longPrev) {
        return { action: "buy", reason: `MA${s}上穿MA${l}，金叉信号`, confidence: 72, strategyName: strategy.name };
      } else if (shortNow < longNow && shortPrev >= longPrev) {
        return { action: "sell", reason: `MA${s}下穿MA${l}，死叉信号`, confidence: 72, strategyName: strategy.name };
      }
      return {
        action: "hold",
        reason: shortNow > longNow ? `MA${s}在MA${l}上方，趋势向上` : `MA${s}在MA${l}下方，趋势向下`,
        confidence: 50,
        strategyName: strategy.name,
      };
    }
    case "risk-parity": {
      return { action: "hold", reason: "风险平价策略需多标的组合，请在策略页查看详情", confidence: 40, strategyName: strategy.name };
    }
  }
}