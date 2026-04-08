"use client";

import { use } from "react";
import { getCourse, getModuleBySlug } from "@/lib/course-data";
import { useProgress } from "@/lib/progress-store";
import ModuleShell from "@/components/ModuleShell";
import { notFound } from "next/navigation";
import Link from "next/link";

/* ===== Beginner modules (Lv.1) ===== */
import Module1 from "@/modules/what-is-money";
import Module2 from "@/modules/where-money-goes";
import Module3 from "@/modules/tracking-money";
import Module4 from "@/modules/budgeting";
import Module5 from "@/modules/spending-psychology";
import Module6 from "@/modules/saving";
import Module7 from "@/modules/emergency-fund";
import Module8 from "@/modules/debt-management";
import Module9 from "@/modules/credit-score";
import Module10 from "@/modules/inflation";
import Module11 from "@/modules/compound-interest";
import Module12 from "@/modules/time-value";
import Module13 from "@/modules/rule-of-72";
import Module14 from "@/modules/risk-and-return";
import Module15 from "@/modules/bank-deposit";
import Module16 from "@/modules/money-market-fund";
import Module17 from "@/modules/bonds";
import Module18 from "@/modules/fund-basics";
import Module19 from "@/modules/index-fund";
import Module20 from "@/modules/stock-basics";
import Module21 from "@/modules/insurance";
import Module22 from "@/modules/gold-and-others";
import Module23 from "@/modules/investor-profile";
import Module24 from "@/modules/asset-allocation";
import Module25 from "@/modules/dca-strategy";
import Module26 from "@/modules/rebalancing";
import Module27 from "@/modules/account-system";
import Module28 from "@/modules/chasing-markets";
import Module29 from "@/modules/info-overload";
import Module30 from "@/modules/scams";
import Module31 from "@/modules/long-term";
import Module32 from "@/modules/first-salary";
import Module33 from "@/modules/travel-fund";
import Module34 from "@/modules/rent-vs-buy";
import Module35 from "@/modules/retirement";

/* Module component registries per course */
const beginnerModules: Record<string, React.ComponentType> = {
  "what-is-money": Module1, "where-money-goes": Module2, "tracking-money": Module3,
  "budgeting": Module4, "spending-psychology": Module5, "saving": Module6,
  "emergency-fund": Module7, "debt-management": Module8, "credit-score": Module9,
  "inflation": Module10, "compound-interest": Module11, "time-value": Module12,
  "rule-of-72": Module13, "risk-and-return": Module14, "bank-deposit": Module15,
  "money-market-fund": Module16, "bonds": Module17, "fund-basics": Module18,
  "index-fund": Module19, "stock-basics": Module20, "insurance": Module21,
  "gold-and-others": Module22, "investor-profile": Module23, "asset-allocation": Module24,
  "dca-strategy": Module25, "rebalancing": Module26, "account-system": Module27,
  "chasing-markets": Module28, "info-overload": Module29, "scams": Module30,
  "long-term": Module31, "first-salary": Module32, "travel-fund": Module33,
  "rent-vs-buy": Module34, "retirement": Module35,
};

/* Intermediate & Advanced modules will be added as they are created */
const intermediateModules: Record<string, React.ComponentType> = {};
const advancedModules: Record<string, React.ComponentType> = {};

const courseModules: Record<string, Record<string, React.ComponentType>> = {
  beginner: beginnerModules,
  intermediate: intermediateModules,
  advanced: advancedModules,
};

export default function CourseModulePage({
  params,
}: {
  params: Promise<{ courseId: string; slug: string }>;
}) {
  const { courseId, slug } = use(params);

  const course = getCourse(courseId);
  if (!course) return notFound();

  const mod = getModuleBySlug(courseId, slug);
  if (!mod) return notFound();

  const { isUnlocked } = useProgress();

  /* Not unlocked → friendly message */
  if (!isUnlocked(courseId, mod.id)) {
    return (
      <div className="mx-auto max-w-xl py-24 text-center px-6">
        <div className="text-5xl mb-6">&#x1F512;</div>
        <h1 className="heading-card mb-3">这一关还没解锁</h1>
        <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
          请先完成前面的模块，按顺序闯关才能解锁。
        </p>
        <Link href={`/course/${courseId}`} className="btn-primary inline-block px-6 py-3">
          回到课程地图
        </Link>
      </div>
    );
  }

  const registry = courseModules[courseId] || {};
  const Content = registry[slug];

  /* Content not yet built */
  if (!Content) {
    return (
      <ModuleShell courseId={courseId} module={mod}>
        <div className="card-featured text-center py-12">
          <p className="text-3xl mb-4">&#x1F6A7;</p>
          <p className="heading-card">内容建设中</p>
          <p className="text-sm mt-2" style={{ color: "var(--color-text-secondary)" }}>
            这个模块还在写，马上就来！
          </p>
        </div>
      </ModuleShell>
    );
  }

  return (
    <ModuleShell courseId={courseId} module={mod}>
      <Content />
    </ModuleShell>
  );
}