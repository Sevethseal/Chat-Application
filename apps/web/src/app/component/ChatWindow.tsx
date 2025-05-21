"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

let socket: ReturnType<typeof io>;

export default function ChatWindow({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_WS_URL!);
    socket.emit("joinThread", chatId);
    socket.on("newMessage", (msg: any) => {
      setMessages((prev) => [...prev, msg]);
    });

    // fetch history
    fetch(`/api/chats/${chatId}/messages`)
      .then((r) => r.json())
      .then((data) => setMessages(data));

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!input) return;
    socket.emit("sendMessage", { chatId, content: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded ${
              m.senderId === "CURRENT_USER_ID"
                ? "bg-blue-100 self-end"
                : "bg-gray-100"
            }`}
          >
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
}
