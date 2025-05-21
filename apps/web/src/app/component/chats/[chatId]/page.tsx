"use client";
import ChatWindow from "../../../component/ChatWindow";

interface Params {
  params: { chatId: string };
}
export default function ChatDetail({ params }: Params) {
  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chat</h2>
      </header>
      <ChatWindow chatId={params.chatId} />
    </div>
  );
}
