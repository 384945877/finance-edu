"use client";

import { use } from "react";
import { getModuleBySlug } from "@/lib/course-data";
import { useProgress } from "@/lib/progress-store";
import ModuleShell from "@/components/ModuleShell";
import { notFound } from "next/navigation";

/* Part 1: 认识钱 */
import Module1 from "@/modules/what-is-money";
import Module2 from "@/modules/where-money-goes";
import Module3 from "@/modules/tracking-money";
import Module4 from "@/modules/budgeting";
import Module5 from "@/modules/spending-psychology";

/* Part 2: 守住钱 */
import Module6 from "@/modules/saving";
import Module7 from "@/modules/emergency-fund";
import Module8 from "@/modules/debt-management";
import Module9 from "@/modules/credit-score";

/* Part 3: 理解钱的规律 */
import Module10 from "@/modules/inflation";
import Module11 from "@/modules/compound-interest";
import Module12 from "@/modules/time-value";
import Module13 from "@/modules/rule-of-72";
import Module14 from "@/modules/risk-and-return";

/* Part 4: 认识投资工具 */
import Module15 from "@/modules/bank-deposit";
import Module16 from "@/modules/money-market-fund";
import Module17 from "@/modules/bonds";
import Module18 from "@/modules/fund-basics";
import Module19 from "@/modules/index-fund";
import Module20 from "@/modules/stock-basics";
import Module21 from "@/modules/insurance";
import Module22 from "@/modules/gold-and-others";

/* Part 5: 建立投资系统 */
import Module23 from "@/modules/investor-profile";
import Module24 from "@/modules/asset-allocation";
import Module25 from "@/modules/dca-strategy";
import Module26 from "@/modules/rebalancing";
import Module27 from "@/modules/account-system";

/* Part 6: 心态与避坑 */
import Module28 from "@/modules/chasing-markets";
import Module29 from "@/modules/info-overload";
import Module30 from "@/modules/scams";
import Module31 from "@/modules/long-term";

/* Part 7: 人生理财地图 */
import Module32 from "@/modules/first-salary";
import Module33 from "@/modules/travel-fund";
import Module34 from "@/modules/rent-vs-buy";
import Module35 from "@/modules/retirement";

const moduleComponents: Record<string, React.ComponentType> = {
  "what-is-money": Module1,
  "where-money-goes": Module2,
  "tracking-money": Module3,
  "budgeting": Module4,
  "spending-psychology": Module5,
  "saving": Module6,
  "emergency-fund": Module7,
  "debt-management": Module8,
  "credit-score": Module9,
  "inflation": Module10,
  "compound-interest": Module11,
  "time-value": Module12,
  "rule-of-72": Module13,
  "risk-and-return": Module14,
  "bank-deposit": Module15,
  "money-market-fund": Module16,
  "bonds": Module17,
  "fund-basics": Module18,
  "index-fund": Module19,
  "stock-basics": Module20,
  "insurance": Module21,
  "gold-and-others": Module22,
  "investor-profile": Module23,
  "asset-allocation": Module24,
  "dca-strategy": Module25,
  "rebalancing": Module26,
  "account-system": Module27,
  "chasing-markets": Module28,
  "info-overload": Module29,
  "scams": Module30,
  "long-term": Module31,
  "first-salary": Module32,
  "travel-fund": Module33,
  "rent-vs-buy": Module34,
  "retirement": Module35,
};

export default function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const mod = getModuleBySlug(slug);
  if (!mod) return notFound();

  const { isUnlocked } = useProgress();
  if (!isUnlocked(mod.id)) return notFound();

  const Content = moduleComponents[slug];
  if (!Content) return notFound();

  return (
    <ModuleShell module={mod}>
      <Content />
    </ModuleShell>
  );
}