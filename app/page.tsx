"use client";
import { Message } from "@/common/interfaces";
import { Input, MessagesDisplay, SearchBar } from "@/components/Chat";
import { ErrorMessage, LoadingSpinner } from "@/components/Ui";
import { useMessages } from "@/hooks/useMessages";

export default function Home() {
  const { messages, error, loading, addMessage } = useMessages();

  const handleSubmit = (text: string) => {
    const newMessage: Message = {
      bot_sender: 0,
      business_id: 84,
      id: Date.now(),
      message_date: new Date().toISOString(),
      message_text: text,
      platform: "whatsapp",
      received_number: 15550926585,
      reply_to_id: 1,
      sender_name: "user",
      sender_number: 584246018872,
    };
    addMessage(newMessage);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div>
      <SearchBar />
      <MessagesDisplay messages={messages} />
      <Input onMsgAddition={handleSubmit} />
    </div>
  );
}
