import type { CalibrationDatabaseType } from "@/types/calibration"
import supabase from "@/utils/supabase"


const fetchCalibrations = async (siteID: number): Promise<CalibrationDatabaseType[]> => {

    const { data, error } = await supabase
    .from('controls')
    .select('*')
    .eq('site_id', siteID)

    if (error) throw error;
    return data

}

export default fetchCalibrations