import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = () => {
  const supabaseUrl = window.ENV.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = window.ENV.REACT_APP_SUPABASE_ANON_KEY;

  if (supabase !== null) return supabase;

  supabase = createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
};
