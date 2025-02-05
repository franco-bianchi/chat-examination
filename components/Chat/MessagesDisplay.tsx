"use client";

import { Message } from "@/common/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./Message";
import { FaArrowDown } from "react-icons/fa";
import { getMessageDate } from "@/utils/functions";

interface Props {
  messages: { [key: string]: Message[] };
}

export const MessagesDisplay = ({ messages }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [activeDate, setActiveDate] = useState<string>("");
  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checkIfAtBottom = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 200);
  };

  const getActiveMessage = () => {
    let closestMessage: number | null = 0;
    let minDistance = Infinity;
    const viewportCenter = window.innerHeight / 2;

    Object.entries(messageRefs.current).forEach(([id, element]) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestMessage = Number.parseInt(id, 10);
        }
      }
    });
    const date = getMessageDate(messages, closestMessage);
    setActiveDate(date);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkIfAtBottom);
    window.addEventListener("scroll", getActiveMessage);
    return () => {
      window.removeEventListener("scroll", checkIfAtBottom);
      window.removeEventListener("scroll", getActiveMessage);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative flex-1 p-4 overflow-y-auto dark:bg-gray-900">
      <h2 className="fixed left-[44%] text-lg font-bold mb-2 text-teal-600 dark:text-teal-400 capitalize text-center">
        {activeDate}
      </h2>
      <div className="flex flex-col">
        {Object.entries(messages).map(([timeframe, msgs]) => (
          <div key={timeframe} className="mb-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold mb-2 text-teal-600 dark:text-teal-400 capitalize text-center">
                {timeframe}
              </h2>
              {msgs.map((msg) => (
                <div
                  key={msg.id}
                  ref={(el) => {
                    if (el) messageRefs.current[msg.id] = el;
                  }}
                >
                  <ChatMessage {...msg} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div ref={bottomRef} />
      {!isAtBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed mb-[55px] bottom-[50px] right-[50%] bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition-all"
        >
          <FaArrowDown size={20} />
        </button>
      )}
    </div>
  );
};
