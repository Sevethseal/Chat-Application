// app/layout.tsx
"use client";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";

// Dynamically import AuthGuard to prevent server-side execution issues
const AuthGuard = dynamic(() => import("../app/component/AuthGuard"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-700">Loading...</p>
    </div>
  ),
});

const Navbar = dynamic(() => import("../app/component/NavBar"), {
  ssr: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <AuthGuard>
          <Navbar />
          <main className="pt-4">{children}</main>
        </AuthGuard>
      </body>
    </html>
  );
}