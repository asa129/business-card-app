import { createClient } from "@supabase/supabase-js";

// Node.js 環境の場合のみ dotenv を読み込む
if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
  const dotenv = await import("dotenv");
  dotenv.config();
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);
