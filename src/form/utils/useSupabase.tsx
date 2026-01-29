import supabaseContext from "@/utils/supabaseContext";
import { useContext } from "react";


function useSupabase () {

    const supabase = useContext(supabaseContext)

    if (!supabase) throw new Error('useSupabase must be used inside the provider')

    return supabase

}

export default useSupabase;