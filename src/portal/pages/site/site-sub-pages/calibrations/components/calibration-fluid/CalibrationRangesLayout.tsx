import type { CalibrationDatabaseType } from "@/types/calibration"

interface CalibrationRangesLayoutProps {
    control: CalibrationDatabaseType,
}

function CalibrationRangesLayout ({ control }: CalibrationRangesLayoutProps) {
    return (
        <div className='py-2 text-sm'>
            <div className='flex justify-between'>
                <p className="font-light">C1</p>
                <p className="font-light">{control.calibration_ranges.c1.low} - {control.calibration_ranges.c1.high}</p>
            </div>
            <div className='flex justify-between'>
                <p className="font-light">C2</p>
                <p className="font-light">{control.calibration_ranges.c2.low} - {control.calibration_ranges.c2.high}</p>
            </div>
        </div>
    )
}

export default CalibrationRangesLayout;