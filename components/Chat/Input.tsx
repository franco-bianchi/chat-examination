import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

interface Props {
  onMsgAddition: (message: string) => void;
}

export const Input = ({ onMsgAddition }: Props) => {
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onMsgAddition(newMessage);
    setNewMessage("");
  };

  return (
    <footer className="bg-gradient-to-r from-green-500 to-teal-500 p-4 shadow-md sticky bottom-0">
      <form className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none text-black"
          onChange={handleChange}
          value={newMessage}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleSubmit}
        >
          <IoMdSend />
        </button>
      </form>
    </footer>
  );
};
