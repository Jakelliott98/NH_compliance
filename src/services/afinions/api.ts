import type { AfinionDatabaseType } from "@/types/afinion"
import supabase from "@/utils/supabase"

export interface AfinionData {
    siteID: number, 
    nhNumber: number, 
    number: string,
}

const createAfinion = async (afinionData: AfinionData, supabase) => {
    const { error } = await supabase
    .from('afinions')
    .insert({
        site_id: afinionData.siteID, 
        afinion_number: afinionData.number, 
        nh_number: afinionData.nhNumber, 
        last_calibrated: null, 
        last_clean: null,
    })
    if (error) throw error;
}

const fetchAfinions = async (siteID: number): Promise<AfinionDatabaseType[]> => {

    const { data, error } = await supabase
    .from('afinions')
    .select('*')
    .eq('site_id', siteID)

    if (error) throw error;
    return data

}

const fetchAllAfinions = async () => {

    const { data, error } = await supabase
    .from('afinions')
    .select('*')
    if (error) throw Error
    return data;

}

const updateLastCalibration = async (afinionID: number, supabase) => {

    const today = new Date()

    const { error } = await supabase
    .from('afinions')
    .update({last_calibrated: today})
    .eq("afinion_id", afinionID)
    
    if (error) throw error;

}

const updateLastCleaned = async (afinionID: number, supabase) => {

    const today = new Date()

    const { error } = await supabase
    .from('afinions')
    .update({last_clean: today})
    .eq("afinion_id", afinionID)
    
    if (error) throw error;

}

export { createAfinion, fetchAfinions, fetchAllAfinions, updateLastCalibration, updateLastCleaned };

