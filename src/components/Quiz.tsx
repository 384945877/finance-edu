"use client";

import { useState } from "react";

export interface QuizOption {
  label: string;
  feedback: string;
  correct?: boolean;
}

interface QuizProps {
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export default function Quiz({ question, options, explanation }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = answered && options[selected].correct;

  return (
    <div className="my-8 rounded-2xl border p-6"
      style={{ borderColor: "var(--border-subtle)", background: "var(--color-gray-50)" }}>
      <p className="label-upper mb-1" style={{ color: "var(--color-brand-deep)" }}>
        情景选择
      </p>
      <p className="text-lg font-semibold mb-4" style={{ letterSpacing: "-0.2px" }}>
        {question}
      </p>

      <div className="flex flex-col gap-3">
        {options.map((opt, i) => {
          const chosen = selected === i;
          let borderColor = "var(--border-medium)";
          let bg = "var(--color-bg)";
          if (answered && chosen) {
            borderColor = opt.correct ? "#0fa76e" : "#d45656";
            bg = opt.correct ? "#d4fae820" : "#d4565610";
          } else if (answered && opt.correct) {
            borderColor = "#0fa76e";
            bg = "#d4fae820";
          }

          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setSelected(i)}
              className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                border: `2px solid ${borderColor}`,
                background: bg,
                opacity: answered && !chosen && !opt.correct ? 0.5 : 1,
                cursor: answered ? "default" : "pointer",
              }}
            >
              <span className="mr-2 inline-block w-6 h-6 rounded-full text-center text-xs leading-6"
                style={{ background: "var(--border-subtle)" }}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-4 rounded-xl p-4 text-sm"
          style={{
            background: isCorrect ? "#d4fae830" : "#d4565615",
            color: "var(--color-text)",
          }}>
          <p className="font-semibold mb-1">{isCorrect ? "回答正确！" : "不太对哦"}</p>
          <p style={{ color: "var(--color-gray-700)" }}>
            {options[selected].feedback}
          </p>
          {explanation && (
            <p className="mt-2" style={{ color: "var(--color-text-secondary)" }}>{explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}