import { Message } from "@/common/interfaces";
import { formatMessageDate } from "@/utils/functions";
import Image from "next/image";
import React from "react";

export const ChatMessage = ({ sender_name, message_text, message_date }: Message) => {
  if (sender_name === "bot") {
    return (
      <div className="flex items-end space-x-2">
        <Image
          className="w-10 h-10 rounded-full"
          src="/bot.png"
          alt="User Avatar"
          width={40}
          height={40}
        />

        <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg max-w-xs flex flex-col">
          <p>{message_text}</p>
          <span className="text-xs text-gray-500 bottom-0 right-2 text-right">
            {formatMessageDate(message_date)}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-end space-x-2 justify-end">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs flex flex-col">
        <p>{message_text}</p>
        <span className="text-xs text-white/70 bottom-0 right-2 text-right">
          {formatMessageDate(message_date)}
        </span>
      </div>
    </div>
  );
};
