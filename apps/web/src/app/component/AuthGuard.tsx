// components/AuthGuard.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../supabaseClient";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname() || "";

  // Public routes that do NOT require authentication
  const publicPaths = ["/login", "/register", "/auth/callback"];
  const isPublic = publicPaths.includes(pathname);

  // Show loading state only on protected routes
  const [checking, setChecking] = useState(!isPublic);

  useEffect(() => {
    if (isPublic) {
      // If we’re on a public route, skip auth check
      setChecking(false);
      return;
    }

    // 1) Check existing session
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
      } else {
        setChecking(false);
      }
    });

    // 2) Listen for auth state changes (sign-in / sign-out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [isPublic, router]);

  // While checking auth on protected routes, show a loader
  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700">Checking authentication…</p>
      </div>
    );
  }

  // Render children (public or protected)
  return <>{children}</>;
}
