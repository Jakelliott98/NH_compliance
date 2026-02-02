
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

export interface ResultsDatabaseType {
    id: number,
    created_at: Date,
    site_id: number,
    afinion_id: number,
    clinician: string,
    calibration_date: Date,
    attempts: number,
    total_result: CalibrationType,
    triglycerides_result: CalibrationType,
    hba1c_result: CalibrationType,
    hdl_result: CalibrationType,
}