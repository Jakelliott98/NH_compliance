import { useContext } from "react";
import supabaseContext from "./supabaseContext";


function useSupabase () {

    const supabase = useContext(supabaseContext)

    if (!supabase) throw new Error('useSupabase must be used within the supabase context provider')
    
    return supabase;

}

export { useSupabase }