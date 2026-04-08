"use client";

import { useState, useEffect } from "react";

/**
 * 返回 true 表示客户端已挂载，persist store 数据已恢复。
 * SSR 和首次渲染时返回 false，避免 hydration mismatch。
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}