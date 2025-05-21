"use client";
import { useRouter } from "next/navigation";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const handleChat = () => {
    router.push(`/products/${product.id}`); // Product detail/chat route
  };

  return (
    <div className="border rounded p-4 shadow-sm flex flex-col">
      <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
      <button
        onClick={handleChat}
        className="mt-auto inline-flex items-center gap-1 py-1 px-3 bg-blue-500 text-white rounded"
      >
        <ChatBubbleOvalLeftIcon className="h-5 w-5" /> Chat
      </button>
    </div>
  );
}
