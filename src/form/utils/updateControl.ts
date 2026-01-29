import type { ControlType } from "./addControl";
import type { RangesType } from "./addControl"; 

const updateControl = async (control: ControlType, testType: string, ranges: RangesType, supabase) => {

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

export default updateControl;