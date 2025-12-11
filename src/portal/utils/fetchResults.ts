import supabase from "@/utils/supabase"


const fetchResults = async (siteID: number) => {

    const { data } = await supabase
    .from('results')
    .select('*')
    .eq('site_id', siteID)
    return data
}

export default fetchResults