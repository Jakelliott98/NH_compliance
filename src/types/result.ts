
interface CalibrationType {
    c1: {
        low: number,
        high: number, 
        result: number
    },
    c2: {
        low: number,
        high: number, 
        result: number
    }
}



export interface ResultsType {
    id: number,
    clinician: string,
    calibration_date: Date,
    attempts: number,
    site_id: number,
    affinion_id: number,
    total_result: CalibrationType,
    hdl_result: CalibrationType,
    hba1c_result: CalibrationType,
    triglycerides_result: CalibrationType,
}