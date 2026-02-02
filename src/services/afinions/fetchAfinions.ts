import type { AfinionDatabaseType } from "@/types/afinion"
import supabase from "@/utils/supabase"


const fetchAfinions = async (siteID: number): Promise<AfinionDatabaseType[]> => {

    const { data, error } = await supabase
    .from('afinions')
    .select('*')
    .eq('site_id', siteID)

    if (error) throw error;
    return data

}

export default fetchAfinions