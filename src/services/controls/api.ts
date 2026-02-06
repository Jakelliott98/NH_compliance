
import supabase from "@/utils/supabase"
import type { CalibrationDatabaseType } from "@/types/calibration"
import type { SupabaseClient } from "@supabase/supabase-js"

export interface RangesType {
    c1: {
        low: number,
        high: number,
    }
    c2: {
        low: number,
        high: number,
    }
}

export interface ControlType {
    siteID: number,
    lotNumber: number,
    expiryDate: Date,
    hba1c?: RangesType,
    hdl?: RangesType,
    total?: RangesType,
    triglycerides?: RangesType,
    controlType: 'hba1c' | 'lipids',
}

const setTitle: (type: string) => string = (type) => {
    if (type === 'hba1c') {
        return 'HBA1c'
    } else if (type === 'hdl') {
        return 'HDL Cholesterol'
    } else if (type === 'total') {
        return 'Total Cholesterol'
    } else if (type === 'triglycerides') {
        return 'Triglycerides'
    } else {
        throw new Error ('Error setting display title')
    }
}

const fetchAllControls = async () => {

    const { data, error } = await supabase
    .from('controls')
    .select('*')
    if (error) throw error
    return data

}

const addControl = async (control: ControlType, testType: string, ranges: RangesType, supabase: SupabaseClient) => {

    const { error } = await supabase
    .from('controls')
    .insert({
        site_id: control.siteID,
        lot_number: control.lotNumber,
        expiry_date: control.expiryDate,
        calibration_ranges: ranges,
        control_type: control.controlType,
        test_type: testType,
        display_name: setTitle(testType),
    })
    if (error) throw error;

}


const fetchCalibrations = async (siteID: number): Promise<CalibrationDatabaseType[]> => {

    const { data, error } = await supabase
    .from('controls')
    .select('*')
    .eq('site_id', siteID)

    if (error) throw error;
    return data

}

const updateControl = async (control: ControlType, testType: string, ranges: RangesType, supabase: SupabaseClient) => {

    const { error } = await supabase
    .from('controls')
    .update({
        lot_number: control.lotNumber,
        expiry_date: control.expiryDate,
        calibration_ranges: ranges,
    })
    .eq('site_id', control.siteID)
    .eq('test_type', testType)
    
    if (error) throw error;

}

export { addControl, fetchAllControls, fetchCalibrations, updateControl }