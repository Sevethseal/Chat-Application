"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../supabaseClient";

interface UserMetadata {
  name?: string;
  full_name?: string;
  [key: string]: unknown; // Allow additional properties safely
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname() || "";

  const publicPaths = ["/login", "/auth/callback"];
  const isPublic = publicPaths.includes(pathname);

  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata as UserMetadata;
        const fullName = meta.name || meta.full_name || session.user.email!;
        setName(fullName);
      }
    });

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const goToProfile = () => {
    router.push("/profile");
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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/products")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors focus:outline-none cursor-pointer"
          >
            Products
          </button>
          {/* Profile Button */}
          <button
            onClick={goToProfile}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none cursor-pointer"
          >
            Profile
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors focus:outline-none cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
