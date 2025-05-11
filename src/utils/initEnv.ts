import dotenv from "dotenv";

// Node.js 環境の場合のみ dotenv を読み込む
if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
  dotenv.config();
}
