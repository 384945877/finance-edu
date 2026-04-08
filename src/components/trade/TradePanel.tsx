"use client";

import { useState } from "react";
import { type Stock, type Tick } from "@/lib/market-engine";
import { useTrade } from "@/lib/trade-store";
import { type TradeMission } from "@/lib/trade-missions";

interface Props {
  stock: Stock;
  tick: Tick | undefined;
  mission?: TradeMission | undefined;
  missionDone?: boolean;
}

export default function TradePanel({ stock, tick, mission, missionDone }: Props) {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const trade = useTrade();

  const price = tick?.price || 0;
  const qty = parseInt(quantity) || 0;
  const total = Math.round(price * qty * 100) / 100;
  const position = trade.getPosition(stock.symbol);

  const handleTrade = () => {
    if (!tick || qty <= 0) return;
    const res = side === "buy"
      ? trade.buy(stock.symbol, price, qty)
      : trade.sell(stock.symbol, price, qty);
    setResult({ ok: res.success, msg: res.msg });
    if (res.success) setQuantity("");
    setTimeout(() => setResult(null), 3000);
  };

  const presetPercents = [25, 50, 75, 100];

  const handlePreset = (pct: number) => {
    if (side === "buy") {
      if (price <= 0) return;
      const maxQty = Math.floor((trade.cash * pct / 100) / price);
      setQuantity(String(maxQty));
    } else {
      if (!position) return;
      const q = Math.floor(position.quantity * pct / 100);
      setQuantity(String(q));
    }
  };

  return (
    <div className="card-base">
      {/* Buy/Sell Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => { setSide("buy"); setResult(null); }}
          className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: side === "buy" ? "#22c55e" : "var(--color-gray-50)",
            color: side === "buy" ? "#fff" : "var(--color-text-muted)",
          }}
        >
          买入
        </button>
        <button
          onClick={() => { setSide("sell"); setResult(null); }}
          className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: side === "sell" ? "#ef4444" : "var(--color-gray-50)",
            color: side === "sell" ? "#fff" : "var(--color-text-muted)",
          }}
        >
          卖出
        </button>
      </div>

      {/* Info Row */}
      <div className="flex justify-between text-xs mb-3" style={{ color: "var(--color-text-muted)" }}>
        <span>可用: &yen;{trade.cash.toLocaleString()}</span>
        <span>持仓: {position ? `${position.quantity}股` : "0股"}</span>
      </div>

      {/* Price Display */}
      <div className="rounded-xl p-3 mb-3" style={{ background: "var(--color-gray-50)" }}>
        <label className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
          市价
        </label>
        <p className="text-xl font-bold tabular-nums">
          &yen;{price.toLocaleString()}
        </p>
      </div>

      {/* Quantity Input */}
      <div className="mb-3">
        <label className="text-xs font-medium mb-1 block" style={{ color: "var(--color-text-muted)" }}>
          数量（股）
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="输入买入数量"
          min="1"
          className="w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-colors"
          style={{
            background: "var(--color-gray-50)",
            border: "1px solid var(--border-medium)",
            color: "var(--color-text)",
          }}
        />
        {/* Preset Buttons */}
        <div className="flex gap-2 mt-2">
          {presetPercents.map((pct) => (
            <button
              key={pct}
              onClick={() => handlePreset(pct)}
              className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: "var(--color-gray-50)",
                border: "1px solid var(--border-subtle)",
                color: "var(--color-text-muted)",
              }}
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <span style={{ color: "var(--color-text-muted)" }}>预计金额</span>
        <span className="font-bold tabular-nums">&yen;{total.toLocaleString()}</span>
      </div>

      {/* Mission Hint */}
      {mission && !missionDone && (
        <div className="mb-3 rounded-xl p-3 text-xs leading-relaxed"
          style={{ background: "#f9731608", border: "1px solid #f9731620", color: "var(--color-text-secondary)" }}>
          <span className="font-semibold" style={{ color: "#f97316" }}>提示: </span>
          {mission.hint}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleTrade}
        disabled={qty <= 0 || !tick}
        className="w-full py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
        style={{
          background: side === "buy" ? "#22c55e" : "#ef4444",
          color: "#fff",
        }}
      >
        {side === "buy" ? `买入 ${stock.name}` : `卖出 ${stock.name}`}
      </button>

      {/* Result Toast */}
      {result && (
        <div className={`mt-3 text-center text-sm font-medium py-2 rounded-xl ${result.ok ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}>
          {result.msg}
        </div>
      )}
    </div>
  );
}