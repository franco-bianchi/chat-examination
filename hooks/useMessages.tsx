import { Message } from "@/common/interfaces";
import { classifyMessagesByDate } from "@/utils/functions";
import { useEffect, useState } from "react";

export const useMessages = () => {
    const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const getMessages = async () => {
        try {
          const res = await fetch("/api/messages");
          if (res.ok) {
            const { data } = await res.json();
            setMessages(classifyMessagesByDate(data));
          } else {
            setError("An unexpected error occurred");
          }
        } catch (err) {
          setError(`An unexpected error occurred: ${err}`);
        } finally {
          setLoading(false);
        }
      };
  
      getMessages();
    }, []);
  
    const addMessage = (newMessage: Message) => {
      setMessages((prev) => ({
        ...prev,
        today: prev.today ? [...prev.today, newMessage] : [newMessage],
      }));
    };

    return { messages, error, loading, addMessage };
  };