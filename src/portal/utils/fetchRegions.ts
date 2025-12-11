import supabase from "@/utils/supabase"

const fetchRegions = async () => {
    const { data, erorr } = await supabase
    .from('regions')
    .select('*')
    if ( erorr ) throw new Error('Error fetching the regions')
    return data;
}

export default fetchRegions;