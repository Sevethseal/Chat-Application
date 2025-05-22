"use client";

import Image from "next/image";
import google from "../../../public/google.png";

import { supabase } from "../supabaseClient";

export default function LoginPage() {
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
