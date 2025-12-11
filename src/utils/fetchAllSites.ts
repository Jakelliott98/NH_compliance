import supabase from "@/utils/supabase";

const fetchAllSites = async () => {

    const { data } = await supabase
        .from('sites')
        .select('*')
    return data

}

export default fetchAllSites;