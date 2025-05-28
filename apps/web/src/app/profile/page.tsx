"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import emailjs from "emailjs-com";

// Initialize EmailJS with your public key (USER_ID)
emailjs.init("IPT2DE1xzTyfcGVTw");

export default function ProfilePage() {
  // Referral state
  const [referralCode, setReferralCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [referredUsers, setReferredUsers] = useState<
    Array<{
      id: string;
      supabaseId: string;
      email: string;
      referralCode: string;
    }>
  >([]);

  // Email-to-friend states
  const [friendEmail, setFriendEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const referralLink = referralCode
    ? `${origin}/login?ref=${referralCode}`
    : "";

  // Fetch existing referral code
  useEffect(() => {
    async function loadReferral() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      try {
        const res = await fetch(
          `https://chat-application-production-d315.up.railway.app/users/user`,
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        );
        if (res.ok) {
          const data = await res.json();
          setReferralCode(data.referralCode || "");
        }
      } catch (err) {
        console.error("Failed to fetch referral code:", err);
      }
    }

    loadReferral();
  }, []);

  // Fetch users who used your code
  useEffect(() => {
    async function loadReferredUsers() {
      if (!referralCode) return;
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      try {
        const res = await fetch(
          `https://chat-application-production-d315.up.railway.app/users/referrals?code=${encodeURIComponent(
            referralCode
          )}`,
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        );
        if (res.ok) {
          setReferredUsers(await res.json());
        }
      } catch (err) {
        console.error("Error fetching referred users:", err);
      }
    }

    loadReferredUsers();
  }, [referralCode]);

  // Copy referral link
  async function handleCopyLink() {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  // Send referral email via EmailJS
  async function handleSendEmail() {
    if (!friendEmail || !referralCode) return;
    setSendingEmail(true);
    setEmailSuccess(false);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    try {
      await emailjs.send(
        "service_flivwth",
        "template_yb7dmo7",
        { email: friendEmail, referralCode, hostEmail: session?.user.email },
        "IPT2DE1xzTyfcGVTw"
      );
      setEmailSuccess(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      alert("Failed to send email.");
    } finally {
      setSendingEmail(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Referral Code Section */}
      <section className="mb-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Your Referral Code</h2>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold tracking-wide">
            {referralCode || "No referral code available"}
          </span>
          {referralCode && (
            <button
              onClick={handleCopyLink}
              className="py-1 px-3 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition"
            >
              {copySuccess ? "Copied!" : "Copy Link"}
            </button>
          )}
        </div>

        {/* Send to Friend */}
        {referralCode && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Send to a Friend</h3>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                placeholder="friend@example.com"
                value={friendEmail}
                onChange={(e) => setFriendEmail(e.target.value)}
                className="w-full sm:w-auto flex-grow border border-gray-300 rounded-lg py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSendEmail}
                disabled={sendingEmail}
                className="py-2 px-4 bg-black text-white rounded-lg uppercase text-sm hover:bg-gray-800 transition disabled:opacity-50"
              >
                {sendingEmail ? "Sending..." : "Send Email"}
              </button>
            </div>
            {emailSuccess && (
              <p className="text-green-600 mt-2">
                Referral email sent to {friendEmail}!
              </p>
            )}
          </div>
        )}
      </section>

      {/* Referred Users Section */}
      <section className="mb-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Users You Referred</h2>
        {referredUsers.length === 0 ? (
          <p className="text-gray-500">No referrals yet.</p>
        ) : (
          <ul className="space-y-2">
            {referredUsers.map((user) => (
              <li key={user.id} className="text-gray-700">
                {user.email}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
