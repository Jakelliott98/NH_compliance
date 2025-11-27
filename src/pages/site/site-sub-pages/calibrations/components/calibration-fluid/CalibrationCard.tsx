import moment from "moment";
import type { CalibrationType, LipidsRangeType, Hba1cRangeType } from "../../../../../../types/calibration";

interface CalibrationCardProps{
    calibration: CalibrationType,
}

export default function CalibrationCard({ calibration }: CalibrationCardProps) {

    const isLipids = calibration.test_type === 'lipids';
    const title = isLipids ? 'Lipids' : 'HBA1c';


    return (
        <div className='p-1 bg-red-100 w-fit rounded-xl flex flex-col h-fit grow-1'>
            <div className='bg-white rounded-xl p-3'>
                <div className='border-b-2 border-solid border-gray-300 py-2'>
                    <p className='font-medium'>{title}</p>
                    <p className='text-gray-400 text-sm'>Lot Number: {calibration.lot_number}</p>
                </div>
                <div className='py-2'>
                    { isLipids ? <LipidsDisplay calibrationRanges={calibration.calibration_ranges} /> : <Hba1cDisplay calibrationRanges={calibration.calibration_ranges}/> }
                </div>
            </div>
            <p className='text-red-900 self-center text-sm p-1'>Expires {moment(calibration.expiry_date).format('dddd Do MMMM')}</p>
        </div>
    )
}

interface Hba1cDisplayProps {
    calibrationRanges: Hba1cRangeType,
}

function Hba1cDisplay ({ calibrationRanges }: Hba1cDisplayProps) {

        return (
            <>
                <div className='flex justify-between'>
                    <p className="font-medium">C1</p>
                    <p>{calibrationRanges.c1.low} - {calibrationRanges.c1.high}</p>
                </div>
                <div className='flex justify-between'>
                    <p className="font-medium">C2</p>
                    <p>{calibrationRanges.c2.low} - {calibrationRanges.c2.high}</p>
                </div>
            </>
        )
}


interface LipidsDisplayProps {
    calibrationRanges: LipidsRangeType,
}

function LipidsDisplay ({ calibrationRanges }: LipidsDisplayProps) {

    return (
        <div className='grow-2'>
            <div className=''>
                <p className="font-medium">C1</p>
                <div className='flex justify-between'>
                    <p className='text-sm'>Total Cholesterol</p>
                    <p className='text-sm'> {calibrationRanges.total.c1.low} - {calibrationRanges.total.c1.high}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>HDL Cholesterol</p>
                    <p className='text-sm'> {calibrationRanges.hdl.c1.low} - {calibrationRanges.hdl.c2.high}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>Triglycerides</p>
                    <p className='text-sm'> {calibrationRanges.triglycerides.c1.low} - {calibrationRanges.triglycerides.c1.high}</p>
                </div>
            </div>
            <div className=''>
                <p className="font-medium">C2</p>
                <div className='flex justify-between'>
                    <p className='text-sm'>Total Cholesterol</p>
                    <p className='text-sm'> {calibrationRanges.total.c2.low} - {calibrationRanges.total.c2.high}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>HDL Cholesterol</p>
                    <p className='text-sm'> {calibrationRanges.hdl.c2.low} - {calibrationRanges.hdl.c2.high}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>Triglycerides</p>
                    <p className='text-sm'> {calibrationRanges.triglycerides.c2.low} - {calibrationRanges.triglycerides.c2.high}</p>
                </div>
            </div>
        </div>
    )
}