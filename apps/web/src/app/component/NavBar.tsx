/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { supabase } from "../supabaseClient";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname() || "";

  // Hide logout on public routes
  const publicPaths = ["/login", "/auth/callback"];
  const isPublic = publicPaths.includes(pathname);

  // Local state for greeting and user name
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // Fetch session & extract name
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata as any;
        const fullName = meta.name || meta.full_name || session.user.email!;
        setName(fullName);
      }
    });

    // Compute greeting based on local time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  return (
    <nav className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold">Trendies</div>
        {!isPublic && name && (
          <div className="flex items-center space-x-2 text-gray-700">
            <span>{`${greeting}, ${name}`}</span>
          </div>
        )}
      </div>
      {!isPublic && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer focus:outline-none"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
