// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// These env vars need to be set in .env.local (and in Vercel Dashboard)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
