import type { RegionsDatabaseType } from "@/types/region";
import supabase from "@/utils/supabase"

const fetchRegions = async (): Promise<RegionsDatabaseType[]> => {
    
    const { data, error } = await supabase
    .from('regions')
    .select('*')

    if (error) throw error;
    return data;
}

export default fetchRegions;