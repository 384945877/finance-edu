"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TOTAL_MODULES } from "./course-data";

interface ProgressState {
  /** Set of completed module IDs */
  completed: number[];
  /** Highest unlocked module ID (1-based). Module 1 is always unlocked. */
  unlocked: number;

  completeModule: (id: number) => void;
  isCompleted: (id: number) => boolean;
  isUnlocked: (id: number) => boolean;
  getProgress: () => number; // 0-100
  reset: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completed: [],
      unlocked: 1,

      completeModule: (id: number) => {
        const state = get();
        if (state.completed.includes(id)) return;
        const newCompleted = [...state.completed, id];
        const newUnlocked = Math.max(state.unlocked, id + 1);
        set({ completed: newCompleted, unlocked: Math.min(newUnlocked, TOTAL_MODULES) });
      },

      isCompleted: (id: number) => get().completed.includes(id),

      isUnlocked: (id: number) => id <= get().unlocked,

      getProgress: () => {
        const pct = (get().completed.length / TOTAL_MODULES) * 100;
        return Math.round(pct);
      },

      reset: () => set({ completed: [], unlocked: 1 }),
    }),
    {
      name: "finance-edu-progress",
    }
  )
);