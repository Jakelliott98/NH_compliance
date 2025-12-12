import type { ResultsDatabaseType } from "@/types/result"
import supabase from "@/utils/supabase"


const fetchResults = async (siteID: number): Promise<ResultsDatabaseType[]> => {

    const { data, error } = await supabase
    .from('results')
    .select('*')
    .eq('site_id', siteID)

    if (error) throw error;
    return data
}

export default fetchResults