import moment from "moment";
import type { CalibrationType } from "../../../../../../types/calibration";

interface CalibrationCardProps{
    calibration: CalibrationType,
}

export default function CalibrationCard ({calibration}: CalibrationCardProps) {

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
                    { isLipids ? <LipidsDisplay calibrationRanges={calibration.calibration_ranges}/> : <Hba1cDisplay calibrationRanges={calibration.calibration_ranges}/> }
                </div>
            </div>
            <p className='text-red-900 self-center text-sm p-1'>Expires {moment(calibration.expiry_date).format('dddd Do MMMM')}</p>
        </div>
    )
}

function Hba1cDisplay ({ calibrationRanges }) {
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

function LipidsDisplay ({ calibrationRanges }) {

    return (
        <div className='grow-2'>
            <div className=''>
                <p className="font-medium">C1</p>
                <div className='flex justify-between'>
                    <p className='text-sm'>Total Cholesterol</p>
                    <p className='text-sm'> {calibrationRanges.c1.total.low} - {calibrationRanges.c1.total.high}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>HDL Cholesterol</p>
                    <p className='text-sm'> {calibrationRanges.c1.hdl.low} - {calibrationRanges.c1.hdl.high}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>Triglycerides</p>
                    <p className='text-sm'> {calibrationRanges.c1.triglycerides.low} - {calibrationRanges.c1.triglycerides.high}</p>
                </div>
            </div>
            <div className=''>
                <p className="font-medium">C2</p>
                <div className='flex justify-between'>
                    <p className='text-sm'>Total Cholesterol</p>
                    <p className='text-sm'> {calibrationRanges.c2.total.low} - {calibrationRanges.c2.total.high}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>HDL Cholesterol</p>
                    <p className='text-sm'> {calibrationRanges.c2.hdl.low} - {calibrationRanges.c2.hdl.high}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>Triglycerides</p>
                    <p className='text-sm'> {calibrationRanges.c2.triglycerides.low} - {calibrationRanges.c2.triglycerides.high}</p>
                </div>
            </div>
        </div>
    )

}