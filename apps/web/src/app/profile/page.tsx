"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../supabaseClient";
import emailjs from "emailjs-com";

// Initialize EmailJS with your public key (USER_ID)
emailjs.init("IPT2DE1xzTyfcGVTw");

export default function ProfilePage() {
  // Existing states
  const [referralCode, setReferralCode] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referredUsers, setReferredUsers] = useState<
    Array<{
      id: string;
      supabaseId: string;
      email: string;
      referralCode: string;
    }>
  >([]);

  // New states for email input & status
  const [friendEmail, setFriendEmail] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const referralLink = referralCode
    ? `${origin}/login?ref=${referralCode}`
    : "";

  // --- Fetch existing referral code ---
  useEffect(() => {
    async function loadReferral() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setReferralCode("");
        return;
      }
      try {
        const res = await fetch(
          `https://chat-application-production-d315.up.railway.app/users/user`,
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        );
        if (res.ok) {
          const data = await res.json();
          setReferralCode(data.referralCode || "");
        } else {
          setReferralCode("");
        }
      } catch (err) {
        console.error("Failed to fetch referral code:", err);
        setReferralCode("");
      }
    }
    loadReferral();
  }, []); // only on mount

  // --- Fetch referred users ---
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
          const users = await res.json();
          setReferredUsers(users);
        } else {
          console.error("Failed to fetch referred users");
        }
      } catch (err) {
        console.error("Error fetching referred users:", err);
      }
    }
    loadReferredUsers();
  }, [referralCode]);

  // --- Generate or regenerate referral code ---
  async function handleGenerateNewCode() {
    setLoading(true);
    try {
      const newCode = uuidv4();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `https://chat-application-production-d315.up.railway.app/users/me/referral-code`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ referralCode: newCode }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update referral code");
      }
      setReferralCode(newCode);
      setCopySuccess(false);
    } catch (err) {
      console.error(err);
      alert("Could not generate new code: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // --- Copy referral link to clipboard ---
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

  // --- Send referral email via EmailJS ---
  async function handleSendEmail() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!friendEmail || !referralCode) return;
    setSendingEmail(true);
    setEmailSuccess(false);
    try {
      await emailjs.send(
        "service_flivwth",
        "template_yb7dmo7",
        {
          email: friendEmail,
          referralCode: referralCode,
          hostEmail: session?.user.email,
        },
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-2xl font-bold tracking-wide">
            {referralCode || "No code generated yet"}
          </span>
          {!referralCode && (
            <button
              onClick={handleGenerateNewCode}
              disabled={loading}
              className="py-2 px-4 bg-black text-white rounded-lg uppercase text-sm hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate New Code"}
            </button>
          )}
        </div>

        {referralCode && (
          <>
            <div className="mt-4">
              <p className="text-gray-600 mb-2">
                Share this link to refer friends:
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={referralLink}
                  className="text-blue-600 underline break-all"
                >
                  {referralLink}
                </a>
                <button
                  onClick={handleCopyLink}
                  className="py-1 px-3 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition"
                >
                  {copySuccess ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Send to a Friend */}
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
                  disabled={!referralCode || sendingEmail}
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
          </>
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
