import type { AffinionDatabaseType } from "@/types/affinion"
import supabase from "@/utils/supabase"


const fetchAffinions = async (siteID: number): Promise<AffinionDatabaseType[]> => {

    const { data, error } = await supabase
    .from('affinions')
    .select('*')
    .eq('site_id', siteID)

    if (error) throw error;
    return data

}

export default fetchAffinions