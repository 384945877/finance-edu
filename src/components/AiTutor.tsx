"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { generateAnswer, getSuggestedQuestions, getTypingDelay, type TutorMessage } from "@/lib/ai-tutor";

interface Props {
  slug: string;
  moduleTitle: string;
}

/** AI助教对话面板 — 悬浮按钮触发的抽屉式聊天 */
export default function AiTutor({ slug, moduleTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<TutorMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggested = getSuggestedQuestions(slug);

  // 自动滚动到底部
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  // 聚焦输入框
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const handleSend = useCallback((text: string) => {
    if (!text.trim() || typing) return;

    const userMsg: TutorMessage = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // 模拟思考延迟
    const answer = generateAnswer(slug, text.trim());
    const delay = getTypingDelay(answer.content);

    setTimeout(() => {
      setMessages(prev => [...prev, answer]);
      setTyping(false);
    }, delay);
  }, [slug, typing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          background: open ? "#ef4444" : "linear-gradient(135deg, #18E299, #0fa76e)",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        }}
        title={open ? "关闭助教" : "问问AI助教"}
      >
        <span className="text-2xl">{open ? "\u00D7" : "\uD83E\uDD16"}</span>
      </button>

      {/* 聊天面板 */}
      <div
        className="fixed bottom-24 right-6 z-50 flex flex-col transition-all duration-300 rounded-2xl overflow-hidden"
        style={{
          width: open ? "380px" : "0px",
          height: open ? "520px" : "0px",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          background: "var(--color-bg)",
          border: "1px solid var(--border-medium)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center gap-2 border-b" style={{ borderColor: "var(--border-subtle)", background: "var(--color-gray-50)" }}>
          <span className="text-lg">{"\uD83E\uDD16"}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">AI 助教</div>
            <div className="text-[10px] truncate" style={{ color: "var(--color-text-muted)" }}>
              正在学：{moduleTitle}
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {/* 欢迎消息 */}
          {messages.length === 0 && !typing && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className="text-sm mt-0.5">{"\uD83E\uDD16"}</span>
                <div className="text-sm rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]" style={{ background: "var(--color-gray-100)", color: "var(--color-text)" }}>
                  你好！关于<strong>「{moduleTitle}」</strong>这节课，有什么不懂的都可以问我。
                </div>
              </div>
              {/* 快捷问题 */}
              <div className="pl-6 space-y-1.5">
                {suggested.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="block text-left text-xs px-3 py-1.5 rounded-lg transition-colors hover:opacity-80 w-full"
                    style={{ background: "var(--color-brand-light)", color: "var(--color-brand-deep)" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 对话消息列表 */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <span className="text-sm mt-0.5 shrink-0">{msg.role === "ai" ? "\uD83E\uDD16" : "\uD83D\uDE00"}</span>
              <div
                className={`text-sm rounded-2xl px-3 py-2 max-w-[85%] whitespace-pre-wrap leading-relaxed ${
                  msg.role === "user" ? "rounded-tr-sm" : "rounded-tl-sm"
                }`}
                style={{
                  background: msg.role === "user" ? "var(--color-brand)" : "var(--color-gray-100)",
                  color: msg.role === "user" ? "#fff" : "var(--color-text)",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-2">
              <span className="text-sm mt-0.5">{"\uD83E\uDD16"}</span>
              <div className="text-sm rounded-2xl rounded-tl-sm px-3 py-2" style={{ background: "var(--color-gray-100)" }}>
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          )}

          {/* 对话后再次显示快捷问题 */}
          {messages.length > 0 && !typing && (
            <div className="pl-6 pt-1 space-y-1">
              {suggested.filter(q => !messages.some(m => m.role === "user" && m.content === q)).slice(0, 2).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="block text-left text-[11px] px-2.5 py-1 rounded-md transition-colors hover:opacity-80"
                  style={{ background: "var(--color-brand-light)", color: "var(--color-brand-deep)" }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-2 border-t flex gap-2" style={{ borderColor: "var(--border-subtle)" }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入问题..."
            disabled={typing}
            className="flex-1 text-sm px-3 py-2 rounded-xl border-none outline-none"
            style={{ background: "var(--color-gray-100)", color: "var(--color-text)" }}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={typing || !input.trim()}
            className="px-3 py-2 rounded-xl text-sm font-medium text-white transition-opacity"
            style={{
              background: "var(--color-brand)",
              opacity: typing || !input.trim() ? 0.4 : 1,
            }}
          >
            发送
          </button>
        </div>
      </div>
    </>
  );
}