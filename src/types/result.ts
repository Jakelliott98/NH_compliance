
interface CalibrationType {
    low: number,
    high: number, 
    result: number,
}

interface Hba1cType {
    c1: CalibrationType,
    c2: CalibrationType,
}

interface LipidType {
    c1: {
        total: CalibrationType,
        hdl: CalibrationType, 
        trigs: CalibrationType,
    },
    c2: {
        total: CalibrationType,
        hdl: CalibrationType, 
        trigs: CalibrationType,
    }
}

export interface ResultsData {
    hba1c: Hba1cType,
    lipids: LipidType,
}

export interface ResultsType {
    id: number,
    results_data: ResultsData,
    passed: boolean,
    clinician: string,
    calibration_date: Date,
    attempts: number,
}