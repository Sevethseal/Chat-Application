"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import google from "../../../public/google.png";
import { supabase } from "../supabaseClient";

export default function LoginPage() {
  // On mount, grab ?ref=ID and store in cookie for 7 days
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds
      document.cookie = `referrer=${encodeURIComponent(ref)}; max-age=${maxAge}; path=/; SameSite=Lax`;
    }
  }, []);

  async function handleGoogleSignin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/products` },
    });
    if (error) {
      alert("Google sign-in error: " + error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-sm w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-black mb-4">
          Welcome to Trendies
        </h1>
        <p className="text-gray-600 mb-6">
          Sign in with your Google account to continue
        </p>
        <button
          onClick={handleGoogleSignin}
          className="flex items-center justify-center w-full py-3 bg-red-600 text-white uppercase font-semibold rounded-full tracking-wide hover:bg-red-700 transition cursor-pointer"
        >
          <Image
            src={google}
            alt="Google logo"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
