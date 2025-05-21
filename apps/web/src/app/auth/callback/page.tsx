// app/auth/callback/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSessionFromUrl().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Auth callback error:", error.message);
        // optionally redirect to /login or show an error
      } else {
        // session is persisted by supabase-js; now navigate on success
        router.replace("/products");
      }
    });
  }, [router]);

  return <p className="p-4 text-center">Signing you in…</p>;
}
