"use client";

import { useState, useRef, useEffect } from "react";
import { SITE, STARTER_QUESTIONS } from "@/lib/config";

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingShown, setBookingShown] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const autoResize = (el) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const newMessages = [...messages, { role: "user", content }];
    setMessages(newMessages);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();

      let reply = data.reply || "Something went wrong. Please try again.";
      const hasCTA = reply.includes("[BOOK_CTA]");
      reply = reply.replace("[BOOK_CTA]", "").trim();

      setMessages([...newMessages, { role: "assistant", content: reply }]);

      if (hasCTA && !bookingShown) {
        setBookingShown(true);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col w-full max-w-[680px] mx-auto min-h-[580px]">
      {/* Header */}
      <div className="py-6 border-b border-gray-100 text-center">
        <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
          {SITE.name}
        </h1>
        <p className="text-[13px] text-gray-500 mt-1">{SITE.tagline}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 py-6 flex flex-col gap-4 min-h-[380px] max-h-[380px] overflow-y-auto">
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-5 py-10 text-center">
            <div className="text-3xl mb-1">💼</div>
            <h2 className="text-[17px] font-medium text-gray-900">
              How can I help your business?
            </h2>
            <p className="text-[14px] text-gray-500 max-w-[320px] leading-relaxed">
              Ask me anything about strategy, growth, operations, or finance.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="bg-gray-50 border border-gray-100 rounded-full px-3.5 py-2 text-[13px] text-gray-500 hover:text-gray-900 hover:border-gray-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                m.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[82%] px-[15px] py-[11px] rounded-[18px] text-[15px] leading-normal whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-brand-blue text-white rounded-br-[4px]"
                    : "bg-gray-50 text-gray-900 rounded-bl-[4px]"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-start">
            <div className="flex items-center gap-1.5 px-4 py-[13px] bg-gray-50 rounded-[18px] rounded-bl-[4px]">
              <span className="w-[7px] h-[7px] rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-[7px] h-[7px] rounded-full bg-gray-400 animate-bounce [animation-delay:200ms]" />
              <span className="w-[7px] h-[7px] rounded-full bg-gray-400 animate-bounce [animation-delay:400ms]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Booking CTA */}
      {bookingShown && (
        <div className="p-4 bg-[#F5F5F7] rounded-2xl border border-gray-100 flex items-center justify-between gap-3">
          <p className="text-[14px] text-gray-500 leading-snug">
            <strong className="block text-gray-900 font-medium mb-0.5">
              Let's map your business together.
            </strong>
            A free 30-min call to understand where you are and where you want to go.
          </p>
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-blue hover:bg-brand-bluehover text-white rounded-full px-[18px] py-[9px] text-[14px] font-medium whitespace-nowrap flex-shrink-0 transition-colors"
          >
            Book free call →
          </a>
        </div>
      )}

      {/* Input */}
      <div className="pt-4 pb-1 border-t border-gray-100 flex gap-2.5 items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            autoResize(e.target);
          }}
          onKeyDown={handleKey}
          placeholder="Ask a business question…"
          rows={1}
          className="flex-1 border border-gray-200 rounded-[22px] px-4 py-2.5 text-[15px] resize-none outline-none focus:border-brand-blue text-gray-900 min-h-[44px] max-h-[120px] leading-snug"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          className="w-11 h-11 rounded-full bg-brand-blue hover:bg-brand-bluehover disabled:bg-gray-100 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <svg
            className="w-[18px] h-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke={input.trim() && !loading ? "#fff" : "#999"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
