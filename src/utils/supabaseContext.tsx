import type { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

const supabaseContext = createContext<SupabaseClient | null>(null)

export default supabaseContext;