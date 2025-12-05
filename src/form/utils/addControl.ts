import supabase from "@/utils/supabase";

export interface RangesType {
    c1_low: number,
    c2_low: number,
    c1_high: number,
    c2_high: number,
}

export interface ControlType {
    siteID: number,
    lotNumber: number,
    expiryDate: Date,
    hba1c?: RangesType,
    hdl?: RangesType,
    total?: RangesType,
    triglycerides: RangesType,
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

const addControl = async (control: ControlType, testType: string, ranges: RangesType) => {

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
    if (error) console.log(error)

}

export default addControl;