
interface RangeLimitType {
    low: number,
    high: number,
}

export interface TestRangeType {
    c1: RangeLimitType,
    c2: RangeLimitType
}

export interface CalibrationDatabaseType {
    id: number,
    created_at: Date,
    site_id: number,
    lot_number: number,
    expiry_date: Date,
    calibration_ranges: TestRangeType,
    control_type: "hba1c" | "lipids", 
    test_type: 'hdl' | 'total' | 'hba1c' | 'triglycerides',
    display_name: 'Triglycerides' | 'HBA1c' | 'Total Cholesterol' | 'HDL Cholesterol',
}
