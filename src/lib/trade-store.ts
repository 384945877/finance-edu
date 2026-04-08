"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Position {
  symbol: string;
  quantity: number;
  avgCost: number;      // 平均成本价
  totalCost: number;     // 总成本
}

export interface TradeRecord {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  price: number;
  quantity: number;
  total: number;
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  unlockedAt?: number;
}

/** 所有成就定义 */
export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-trade", title: "初出茅庐", emoji: "🐣", desc: "完成第一笔交易" },
  { id: "profit-10", title: "小有收获", emoji: "💰", desc: "单笔盈利超过 10%" },
  { id: "five-stocks", title: "分散投资", emoji: "🎯", desc: "同时持有 5 只以上标的" },
  { id: "ten-trades", title: "交易达人", emoji: "⚡", desc: "累计完成 10 笔交易" },
  { id: "portfolio-up", title: "账户翻红", emoji: "🚀", desc: "总资产突破 110,000" },
  { id: "survivor", title: "熊市幸存者", emoji: "🐻", desc: "亏损超过 10% 后回本" },
  { id: "diamond-hands", title: "钻石手", emoji: "💎", desc: "单只股票持仓超过 50 笔成交量" },
  { id: "all-in", title: "全仓梭哈", emoji: "🎰", desc: "把 90% 资金投入单只标的" },
];

interface TradeState {
  cash: number;
  initialCash: number;
  positions: Position[];
  history: TradeRecord[];
  achievements: string[];  // unlocked achievement ids
  completedMissions: string[];  // completed mission ids
  totalXp: number;

  buy: (symbol: string, price: number, quantity: number) => { success: boolean; msg: string };
  sell: (symbol: string, price: number, quantity: number) => { success: boolean; msg: string };
  getPosition: (symbol: string) => Position | undefined;
  getTotalAssets: (prices: Record<string, number>) => number;
  getTotalPnL: (prices: Record<string, number>) => number;
  unlockAchievement: (id: string) => void;
  completeMission: (missionId: string, xp: number) => void;
  isMissionCompleted: (missionId: string) => boolean;
  resetAccount: () => void;
}

const INITIAL_CASH = 100000;

export const useTrade = create<TradeState>()(
  persist(
    (set, get) => ({
      cash: INITIAL_CASH,
      initialCash: INITIAL_CASH,
      positions: [],
      history: [],
      achievements: [],
      completedMissions: [],
      totalXp: 0,

      buy: (symbol, price, quantity) => {
        const state = get();
        const total = Math.round(price * quantity * 100) / 100;

        if (total > state.cash) {
          return { success: false, msg: "余额不足" };
        }
        if (quantity <= 0) {
          return { success: false, msg: "数量必须大于 0" };
        }

        const newCash = Math.round((state.cash - total) * 100) / 100;
        const positions = [...state.positions];
        const idx = positions.findIndex((p) => p.symbol === symbol);

        if (idx >= 0) {
          const pos = { ...positions[idx] };
          pos.totalCost = Math.round((pos.totalCost + total) * 100) / 100;
          pos.quantity += quantity;
          pos.avgCost = Math.round((pos.totalCost / pos.quantity) * 100) / 100;
          positions[idx] = pos;
        } else {
          positions.push({ symbol, quantity, avgCost: price, totalCost: total });
        }

        const record: TradeRecord = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          symbol, side: "buy", price, quantity, total, timestamp: Date.now(),
        };

        set({ cash: newCash, positions, history: [...state.history, record] });
        return { success: true, msg: `买入 ${quantity} 股 ${symbol}` };
      },

      sell: (symbol, price, quantity) => {
        const state = get();
        const pos = state.positions.find((p) => p.symbol === symbol);

        if (!pos || pos.quantity < quantity) {
          return { success: false, msg: "持仓不足" };
        }
        if (quantity <= 0) {
          return { success: false, msg: "数量必须大于 0" };
        }

        const total = Math.round(price * quantity * 100) / 100;
        const newCash = Math.round((state.cash + total) * 100) / 100;
        const positions = state.positions
          .map((p) => {
            if (p.symbol !== symbol) return p;
            const newQty = p.quantity - quantity;
            const newTotalCost = Math.round((p.avgCost * newQty) * 100) / 100;
            return { ...p, quantity: newQty, totalCost: newTotalCost };
          })
          .filter((p) => p.quantity > 0);

        const record: TradeRecord = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          symbol, side: "sell", price, quantity, total, timestamp: Date.now(),
        };

        set({ cash: newCash, positions, history: [...state.history, record] });
        return { success: true, msg: `卖出 ${quantity} 股 ${symbol}` };
      },

      getPosition: (symbol) => get().positions.find((p) => p.symbol === symbol),

      getTotalAssets: (prices) => {
        const s = get();
        const holdingsValue = s.positions.reduce(
          (sum, p) => sum + (prices[p.symbol] || p.avgCost) * p.quantity, 0
        );
        return Math.round((s.cash + holdingsValue) * 100) / 100;
      },

      getTotalPnL: (prices) => {
        const s = get();
        const total = s.getTotalAssets(prices);
        return Math.round((total - s.initialCash) * 100) / 100;
      },

      unlockAchievement: (id) => {
        const s = get();
        if (s.achievements.includes(id)) return;
        set({ achievements: [...s.achievements, id] });
      },

      completeMission: (missionId, xp) => {
        const s = get();
        if (s.completedMissions.includes(missionId)) return;
        set({
          completedMissions: [...s.completedMissions, missionId],
          totalXp: s.totalXp + xp,
        });
      },

      isMissionCompleted: (missionId) =>
        get().completedMissions.includes(missionId),

      resetAccount: () => {
        set({ cash: INITIAL_CASH, positions: [], history: [], achievements: [], completedMissions: [], totalXp: 0 });
      },
    }),
    { name: "finance-edu-trade-v1" }
  )
);