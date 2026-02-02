import type { SiteDatabaseType } from "@/types/site";
import supabase from "@/utils/supabase";

const fetchAllSites = async (): Promise<SiteDatabaseType[]> => {

    const { data, error } = await supabase
        .from('sites')
        .select('*')

    if (error) throw error;
    return data
    
}

export default fetchAllSites;