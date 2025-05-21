"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChatHistory() {
  const router = useRouter();
  const [chats, setChats] = useState<unknown[]>([]);

  useEffect(() => {
    async function fetchChats() {
      const res = await fetch("/api/chats");
      setChats(await res.json());
    }
    fetchChats();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Chat History</h1>
      <ul className="space-y-2">
        {chats.map((c) => (
          <li key={c.id}>
            <button
              className="w-full text-left p-3 border rounded hover:bg-gray-50"
              onClick={() => router.push(`/chats/${c.id}`)}
            >
              Chat with {c.otherUser.username} (Updated at{" "}
              {new Date(c.updatedAt).toLocaleString()})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
