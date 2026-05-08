import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Send,
  Sparkles,
  Plus,
  Phone,
  Loader2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "I'm feeling overwhelmed today",
  "Help me process some anxiety",
  "I need someone to talk to",
  "Guide me through a tough day",
];

const Chat = () => {
  const [messages, setMessages] =
    useState<Message[]>(() => {
      const saved =
        localStorage.getItem(
          "chat_messages"
        );

      return saved
        ? JSON.parse(saved)
        : [
            {
              id: "1",
              role: "assistant",
              content:
                "Hey there, I'm Aasha — your emotional wellness companion. How are you feeling right now?",
            },
          ];
    });

  const [input, setInput] =
    useState("");

  const [typing, setTyping] =
    useState(false);

  const scrollRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(
      "chat_messages",
      JSON.stringify(messages)
    );

    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const sendMessage = async (
    text: string
  ) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [
      ...prev,
      userMsg,
    ]);

    setInput("");
    setTyping(true);

    try {

      const response = await fetch(
        "http://107.21.23.105:8000/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            user_id: "user123",
            message: text,
          }),
        }
      );

      const data =
        await response.json();

      console.log(data);

      const reply: Message = {
        id: (
          Date.now() + 1
        ).toString(),

        role: "assistant",

        content:
          data.response ||
          data.reply ||
          data.message ||
          data.ai_response ||
          data.output ||
          "No response received.",
      };

      setMessages((prev) => [
        ...prev,
        reply,
      ]);

    } catch (error) {

      console.error(error);

      const errorMsg: Message = {
        id: (
          Date.now() + 1
        ).toString(),

        role: "assistant",

        content:
          "Unable to connect to AI server.",
      };

      setMessages((prev) => [
        ...prev,
        errorMsg,
      ]);
    }

    setTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)] animate-in fade-in duration-500">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Aasha
            </h2>

            <p className="text-xs text-gray-500 dark:text-gray-300">
              Your companion • Always here
            </p>
          </div>
        </div>

        <div className="flex gap-2">

          {/* NEW CHAT */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="New chat"
            className="rounded-full hover:bg-pink-100 dark:hover:bg-white/10"
            onClick={() =>
              setMessages([
                {
                  id: "1",
                  role: "assistant",
                  content:
                    "Hey there, I'm Aasha — your emotional wellness companion. How are you feeling right now?",
                },
              ])
            }
          >
            <Plus className="h-4 w-4" />
          </Button>

          {/* CRISIS */}
          <a href="tel:988">

            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 md:pr-2 rounded-3xl bg-white/50 dark:bg-[#111827]/60 backdrop-blur-xl p-4 shadow-xl">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-md transition-all duration-300 ${
                msg.role === "user"
                  ? "bg-pink-500 text-white rounded-br-sm"
                  : "bg-white dark:bg-[#1f2937] text-gray-700 dark:text-gray-200 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* LOADER */}
        {typing && (
          <div className="flex justify-start">

            <div className="bg-white dark:bg-[#1f2937] rounded-3xl rounded-bl-sm px-4 py-3 shadow-md flex items-center gap-2">

              <Loader2 className="h-4 w-4 animate-spin text-pink-500" />

              <span className="text-sm text-gray-500 dark:text-gray-300">
                Aasha is typing...
              </span>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* PROMPTS */}
      {messages.length <= 1 && (
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">

          {suggestedPrompts.map((p) => (
            <button
              key={p}
              onClick={() =>
                sendMessage(p)
              }
              className="shrink-0 text-xs bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300 px-4 py-2 rounded-full hover:scale-105 transition-all duration-300"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="flex gap-2 pt-4">

        <Input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            !e.shiftKey &&
            sendMessage(input)
          }
          placeholder="Type your message..."
          className="rounded-full h-12 bg-white dark:bg-[#1f2937]"
        />

        <Button
          onClick={() =>
            sendMessage(input)
          }
          disabled={
            !input.trim() || typing
          }
          size="icon"
          className="rounded-full h-12 w-12 bg-pink-500 hover:bg-pink-600 shrink-0"
        >
          {typing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Chat;