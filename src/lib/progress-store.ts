"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getTotalModules } from "./course-data";

interface CourseProgress {
  completed: number[];
  unlocked: number;
}

interface ProgressState {
  /** Progress per course id */
  courses: Record<string, CourseProgress>;

  completeModule: (courseId: string, id: number) => void;
  isCompleted: (courseId: string, id: number) => boolean;
  isUnlocked: (courseId: string, id: number) => boolean;
  getProgress: (courseId: string) => number; // 0-100
  getCourseProgress: (courseId: string) => CourseProgress;
  reset: (courseId: string) => void;
}

const defaultProgress = (): CourseProgress => ({ completed: [], unlocked: 1 });

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      courses: {},

      getCourseProgress: (courseId: string) => {
        return get().courses[courseId] || defaultProgress();
      },

      completeModule: (courseId: string, id: number) => {
        const state = get();
        const cp = state.courses[courseId] || defaultProgress();
        if (cp.completed.includes(id)) return;
        const total = getTotalModules(courseId);
        const newCompleted = [...cp.completed, id];
        const newUnlocked = Math.min(Math.max(cp.unlocked, id + 1), total);
        set({
          courses: { ...state.courses, [courseId]: { completed: newCompleted, unlocked: newUnlocked } },
        });
      },

      isCompleted: (courseId: string, id: number) =>
        (get().courses[courseId]?.completed || []).includes(id),

      isUnlocked: (courseId: string, id: number) =>
        id <= (get().courses[courseId]?.unlocked || 1),

      getProgress: (courseId: string) => {
        const total = getTotalModules(courseId);
        if (total === 0) return 0;
        const completed = get().courses[courseId]?.completed.length || 0;
        return Math.round((completed / total) * 100);
      },

      reset: (courseId: string) => {
        const state = get();
        set({ courses: { ...state.courses, [courseId]: defaultProgress() } });
      },
    }),
    { name: "finance-edu-progress-v2" }
  )
);