"use client";

import Link from "next/link";
import { STOCKS } from "@/lib/market-engine";
import { useTrade } from "@/lib/trade-store";
import { useHydrated } from "@/lib/useHydrated";

export default function TradeHistoryPage() {
  const trade = useTrade();
  const hydrated = useHydrated();
  const records = hydrated ? [...trade.history].reverse() : [];

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Header */}
      <div className="border-b px-4 py-4" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="mx-auto max-w-[800px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/trade" className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: "var(--color-gray-50)", color: "var(--color-text-secondary)" }}>
              &larr; 返回交易
            </Link>
            <h1 className="text-lg font-semibold">交易记录</h1>
          </div>
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            共 {records.length} 笔
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="card-base text-center">
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>总交易笔数</p>
            <p className="text-xl font-bold mt-1">{records.length}</p>
          </div>
          <div className="card-base text-center">
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>买入笔数</p>
            <p className="text-xl font-bold mt-1 text-green-500">
              {records.filter((r) => r.side === "buy").length}
            </p>
          </div>
          <div className="card-base text-center">
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>卖出笔数</p>
            <p className="text-xl font-bold mt-1 text-red-500">
              {records.filter((r) => r.side === "sell").length}
            </p>
          </div>
        </div>

        {/* Record List */}
        {records.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📋</p>
            <p className="font-semibold">还没有交易记录</p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              去交易大厅完成第一笔交易吧
            </p>
            <Link href="/trade" className="btn-brand mt-4 inline-block">
              开始交易
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {records.map((record) => {
              const stock = STOCKS.find((s) => s.symbol === record.symbol);
              const isBuy = record.side === "buy";
              const date = new Date(record.timestamp);
              const timeStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

              return (
                <div key={record.id} className="rounded-xl p-4 flex items-center justify-between"
                  style={{ background: "var(--color-gray-50)", border: "1px solid var(--border-subtle)" }}>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isBuy ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                      {isBuy ? "买入" : "卖出"}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold">{stock?.name || record.symbol}</span>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                        {timeStr}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold tabular-nums">
                      &yen;{record.total.toLocaleString()}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {record.quantity}股 &times; &yen;{record.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}