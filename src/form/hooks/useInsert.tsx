import supabase from "@/utils/supabase";

export const addControls = async (data, controlType, siteID) => {
    
    let dataStructure = ''

    if (controlType === 'hba1c') {
        dataStructure = {
                c1: {
                    low: data.hba1c_c1_low,
                    high: data.hba1c_c1_high
                },
                c2: {
                    low: data.hba1c_c2_low,
                    high: data.hba1c_c2_high,
                }
            }
    } else if (controlType === 'lipids') {
        dataStructure = {
                hdl: {
                    c1: {
                        low: data.lipids_c1_hdl_low,
                        high: data.lipids_c1_hdl_high
                    },
                    c2: {
                        low: data.lipids_c2_hdl_low,
                        high: data.lipids_c2_hdl_high,
                    }
                },
                total: {
                    c1: {
                        low: data.lipids_c1_tc_low,
                        high: data.lipids_c1_tc_high
                    },
                    c2: {
                        low: data.lipids_c2_tc_low,
                        high: data.lipids_c2_tc_high,
                    }
                },
                triglycerides: {
                    c1: {
                        low: data.lipids_c1_trig_low,
                        high: data.lipids_c1_trig_high
                    },
                    c2: {
                        low: data.lipids_c2_trig_low,
                        high: data.lipids_c2_trig_high,
                    }
                }
        }
    }

    const { error } = await supabase
    .from('calibrations')
    .insert({
        lot_number: data.lot_number, 
        expiry_date: data.expiry_date, 
        calibration_ranges: dataStructure,
        site_id: siteID,
        test_type: controlType,
    })

}

export const updateControl = async (data, controlType, siteID) => {

    let dataStructure = ''

    if (controlType === 'hba1c') {
        dataStructure = {
                c1: {
                    low: data.hba1c_c1_low,
                    high: data.hba1c_c1_high
                },
                c2: {
                    low: data.hba1c_c2_low,
                    high: data.hba1c_c2_high,
                }
            }
    } else if (controlType === 'lipids') {
        dataStructure = {
                hdl: {
                    c1: {
                        low: data.lipids_c1_hdl_low,
                        high: data.lipids_c1_hdl_high
                    },
                    c2: {
                        low: data.lipids_c2_hdl_low,
                        high: data.lipids_c2_hdl_high,
                    }
                },
                total: {
                    c1: {
                        low: data.lipids_c1_tc_low,
                        high: data.lipids_c1_tc_high
                    },
                    c2: {
                        low: data.lipids_c2_tc_low,
                        high: data.lipids_c2_tc_high,
                    }
                },
                triglycerides: {
                    c1: {
                        low: data.lipids_c1_trig_low,
                        high: data.lipids_c1_trig_high
                    },
                    c2: {
                        low: data.lipids_c2_trig_low,
                        high: data.lipids_c2_trig_high,
                    }
                }
        }
    }

    const { error } = await supabase
    .from('calibrations')
    .update({
        lot_number: data.lot_number, 
        expiry_date: data.expiry_date, 
        calibration_ranges: dataStructure,
    })
    .eq("site_id", siteID)
    .eq("test_type", controlType)

}