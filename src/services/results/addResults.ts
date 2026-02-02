
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
    afinionID: number,
    clinician: string,
    attempts: number,
    hdl: TestResultType,
    triglycerides: TestResultType,
    hba1c: TestResultType,
    total: TestResultType,
}

const addCalibrationResults = async (result: ResultType, supabase) => {

    const { error } = await supabase
    .from('results')
    .insert([{
        site_id: result.siteID,
        afinion_id: result.afinionID,
        clinician: result.clinician,
        calibration_date: new Date(),
        attempts: result.attempts,
        hdl_result: result.hdl,
        hba1c_result: result.hba1c,
        total_result: result.total,
        triglycerides_result: result.triglycerides,
    }])
    if (error) throw error;
}

export default addCalibrationResults;