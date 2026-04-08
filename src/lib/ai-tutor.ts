/**
 * AI答疑引擎
 * 纯前端实现，基于知识库关键词匹配 + 模板生成
 * 无需后端API调用，离线可用
 */

import { searchFAQ, searchAllFAQ, getKnowledge, type FAQ } from "./course-knowledge";

export interface TutorMessage {
  role: "user" | "ai";
  content: string;
  /** AI回答关联的FAQ来源 */
  source?: { slug: string; question: string };
}

/** 生成当前模块的预设问题（用于快捷按钮） */
export function getSuggestedQuestions(slug: string): string[] {
  const knowledge = getKnowledge(slug);
  if (!knowledge || knowledge.faqs.length === 0) {
    return ["这节课的重点是什么", "有没有实际的例子", "这个知识点在实操中怎么用"];
  }
  // 取前3个FAQ的问题作为预设
  const faqQuestions = knowledge.faqs.slice(0, 3).map(f => f.q);
  // 补一个通用问题
  if (faqQuestions.length < 3) {
    faqQuestions.push("这节课的核心要点是什么");
  }
  return faqQuestions;
}

/** 生成模块概要回答 */
function buildConceptsAnswer(slug: string): string {
  const knowledge = getKnowledge(slug);
  if (!knowledge) return "";
  const points = knowledge.concepts.map((c, i) => `${i + 1}. ${c}`).join("\n");
  return `这节课的核心知识点：\n\n${points}\n\n有具体哪个点想深入了解吗？`;
}

/** 模糊匹配通用问题 */
function matchGenericQuestion(query: string, slug: string): string | undefined {
  const q = query.toLowerCase();
  const knowledge = getKnowledge(slug);

  // 问重点/要点/总结
  if (/重点|要点|总结|核心|关键|主要/.test(q)) {
    return buildConceptsAnswer(slug);
  }

  // 问例子/案例
  if (/例子|案例|举例|比如|实际/.test(q)) {
    if (knowledge && knowledge.faqs.length > 0) {
      const faq = knowledge.faqs[0];
      return `来看一个实际场景：\n\n「${faq.q}」\n\n${faq.a}\n\n这就是这节课知识点的实际应用。还有其他想问的吗？`;
    }
    return "这节课的内容和日常生活紧密相关。试着在上面的互动组件里动手操作一下，体会会更深。有具体问题随时问我！";
  }

  // 问怎么用/实操
  if (/怎么用|怎么做|实操|操作|实践|应用/.test(q)) {
    return "好问题！建议这样实操：\n\n1. 先在上面的互动组件里体验一遍\n2. 到模拟交易大厅用虚拟资金练练手\n3. 如果这个模块有关联的实战任务，完成它巩固知识\n\n动手操作是最好的学习方式。有具体操作上的疑问吗？";
  }

  // 打招呼
  if (/你好|hello|hi|嗨/.test(q)) {
    return "你好！我是你的AI助教。关于这节课的内容，有什么想问的吗？可以点击下面的快捷问题，也可以直接打字提问。";
  }

  // 感谢
  if (/谢谢|感谢|thanks|thx/.test(q)) {
    return "不客气！学习理财最重要的是坚持行动。如果还有其他疑问，随时来问。加油！";
  }

  return undefined;
}

/**
 * AI回答生成 — 核心函数
 * 匹配策略：
 * 1. 先在当前模块FAQ中匹配
 * 2. 再匹配通用问题模板
 * 3. 再在全局FAQ中搜索
 * 4. 最后给兜底回答
 */
export function generateAnswer(slug: string, query: string): TutorMessage {
  // 1. 当前模块FAQ匹配
  const localFaq = searchFAQ(slug, query);
  if (localFaq) {
    return {
      role: "ai",
      content: localFaq.a,
      source: { slug, question: localFaq.q },
    };
  }

  // 2. 通用问题匹配
  const genericAnswer = matchGenericQuestion(query, slug);
  if (genericAnswer) {
    return { role: "ai", content: genericAnswer };
  }

  // 3. 全局FAQ搜索（跨模块）
  const globalResult = searchAllFAQ(query);
  if (globalResult) {
    return {
      role: "ai",
      content: `这个问题在「${globalResult.slug}」模块有详细讲解：\n\n${globalResult.faq.a}\n\n想了解更多可以去看看那节课的内容。`,
      source: { slug: globalResult.slug, question: globalResult.faq.q },
    };
  }

  // 4. 兜底回答
  const knowledge = getKnowledge(slug);
  if (knowledge && knowledge.concepts.length > 0) {
    return {
      role: "ai",
      content: `这个问题超出了我的知识范围，但我可以帮你梳理一下这节课的核心要点：\n\n${knowledge.concepts.map((c, i) => `${i + 1}. ${c}`).join("\n")}\n\n试试换个方式提问，或者点击上面的快捷问题。`,
    };
  }

  return {
    role: "ai",
    content: "这个问题我暂时回答不了。可以试试问一些和当前课程相关的具体问题，比如某个概念怎么理解、某个操作怎么做。",
  };
}

/**
 * 模拟打字机效果的延迟（ms）
 * 根据回答长度计算
 */
export function getTypingDelay(content: string): number {
  const len = content.length;
  if (len < 50) return 600;
  if (len < 100) return 900;
  return 1200;
}