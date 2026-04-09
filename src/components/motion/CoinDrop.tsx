"use client";

import { useEffect, useState } from "react";

interface Coin {
  id: number;
  x: number;       // 0-100 %
  delay: number;    // s
  size: number;     // px
  emoji: string;
}

interface CoinDropProps {
  trigger: boolean;         // true时触发一波掉落
  count?: number;
  type?: "gain" | "loss";   // 绿金币 or 红裂币
  onComplete?: () => void;
}

let coinId = 0;

/** 金币/碎币掉落动画 */
export default function CoinDrop({ trigger, count = 8, type = "gain", onComplete }: CoinDropProps) {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    if (!trigger) return;
    const newCoins: Coin[] = Array.from({ length: count }, () => ({
      id: ++coinId,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 0.3,
      size: 16 + Math.random() * 12,
      emoji: type === "gain" ? "🪙" : "💸",
    }));
    setCoins(newCoins);
    const timer = setTimeout(() => {
      setCoins([]);
      onComplete?.();
    }, 1200);
    return () => clearTimeout(timer);
  }, [trigger, count, type, onComplete]);

  if (coins.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 50 }}>
      {coins.map(c => (
        <span key={c.id}
          className="absolute animate-coin-drop"
          style={{
            left: `${c.x}%`,
            top: -30,
            fontSize: c.size,
            animationDelay: `${c.delay}s`,
          }}>
          {c.emoji}
        </span>
      ))}
      <style>{`
        @keyframes coin-drop {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(300px) rotate(360deg); opacity: 0; }
        }
        .animate-coin-drop {
          animation: coin-drop 1s ease-in forwards;
        }
      `}</style>
    </div>
  );
}