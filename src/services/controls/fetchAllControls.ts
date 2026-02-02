import supabase from "@/utils/supabase"

const fetchAllControls = async () => {

    const { data, error } = await supabase
    .from('controls')
    .select('*')
    if (error) throw error
    return data

}

export default fetchAllControls;