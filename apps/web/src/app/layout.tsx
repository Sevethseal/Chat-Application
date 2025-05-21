// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import AuthGuard from "../app/component/AuthGuard";
import Navbar from "../app/component/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trendies",
  description: "Your marketplace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* 1. Guard all pages behind auth */}
        <AuthGuard>
          {/* 2. Show a top nav with logout */}
          <Navbar />
          {/* 3. Your page content */}
          <main className="pt-4">{children}</main>
        </AuthGuard>
      </body>
    </html>
  );
}
