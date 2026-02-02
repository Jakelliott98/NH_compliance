import supabase from "@/utils/supabase";

const fetchAllAfinions = async () => {

    const { data, error } = await supabase
    .from('afinions')
    .select('*')
    if (error) throw Error
    return data;

}

export default fetchAllAfinions;