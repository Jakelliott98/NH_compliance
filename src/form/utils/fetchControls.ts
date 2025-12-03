import supabase from "@/utils/supabase"


const fetchCalibrations = async (siteID: number) => {

    const { data } = await supabase
    .from('calibrations')
    .select('*')
    .eq('site_id', siteID)

    return data

}

export default fetchCalibrations