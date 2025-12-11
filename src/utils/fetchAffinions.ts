import supabase from "@/utils/supabase"


const fetchAffinions = async (siteID: number) => {

    const { data } = await supabase
    .from('affinions')
    .select('*')
    .eq('site_id', siteID)

    return data

}

export default fetchAffinions