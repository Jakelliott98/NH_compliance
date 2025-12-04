
// Be more specific with calibration_ranges

interface RangeLimitType {
    low: number,
    high: number,
}

export interface Hba1cRangeType {
    c1: RangeLimitType,
    c2: RangeLimitType
}

export interface TestRangeType {
    c1: RangeLimitType,
    c2: RangeLimitType
}

export interface LipidsRangeType {
    hdl: TestRangeType,
    total: TestRangeType,
    triglycerides: TestRangeType
}

export interface CalibrationType{
    calibration_ranges: LipidsRangeType | Hba1cRangeType,
    created_at: Date,
    expiry_date: Date,
    id: number,
    lot_number: string,
    site_id: number,
    control_type: "hba1c" | "lipids",
}