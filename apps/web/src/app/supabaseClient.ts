// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mobhgsgpovvqbrwteoiv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vYmhnc2dwb3Z2cWJyd3Rlb2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDgxMjUsImV4cCI6MjA2MzQyNDEyNX0.WNzWL4lcTL9coCVnNGBK7Xll_WUrJ5TlVbNSr88mCi8";

// Add validation with helpful error messages
if (!supabaseUrl) {
  throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseAnonKey) {
  throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
