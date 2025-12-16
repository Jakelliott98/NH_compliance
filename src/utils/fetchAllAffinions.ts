import supabase from "./supabase"

const fetchAllAffinions = async () => {

    const { data, error } = await supabase
    .from('affinions')
    .select('*')
    if (error) throw Error
    return data;

}

export default fetchAllAffinions;