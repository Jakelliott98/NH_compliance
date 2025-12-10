import supabase from "@/utils/supabase"

interface TestResultType {
    c1: {
        low: number, 
        high: number,
        result: number,
    },
    c2: {
        low: number, 
        high: number,
        result: number,
    }
}

interface ResultType {
    siteID: number,
    affinionID: number,
    clinician: string,
    attempts: number,
    hdl: TestResultType,
    triglycerides: TestResultType,
    hba1c: TestResultType,
    total: TestResultType,
}

const addCalibrationResults = async (result: ResultType) => {

    console.log(result)

    const { error } = await supabase
    .from('results')
    .insert([{
        site_id: result.siteID,
        affinion_id: result.affinionID,
        clinician: result.clinician,
        calibration_date: new Date(),
        attempts: result.attempts,
        hdl_result: result.hdl,
        hba1c_result: result.hba1c,
        total_result: result.total,
        triglycerides_result: result.triglycerides,
    }])
    if (error) console.log(error)
}

export default addCalibrationResults;