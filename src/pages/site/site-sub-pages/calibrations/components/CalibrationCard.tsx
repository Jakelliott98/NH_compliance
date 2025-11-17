import moment from "moment";

export default function CalibrationCard ({ calibration }) {

    const isLipids = calibration.test_type === 'lipids';
    const title = isLipids ? 'Lipids' : 'HBA1c';
    
    const hba1cDisplay = (
        <>
            <div className='flex justify-between'>
                <p className="font-medium">C1</p>
            </div>
            <div className='flex justify-between'>
                <p className="font-medium">C2</p>
            </div>
        </>
    )

    const lipidDisplay = (
        <div className='grow-2'>
            <div className=''>
                <p className="font-medium">C1</p>
                <div className='flex justify-between'>
                    <p className='text-sm'>Total Cholesterol</p>
                    <p className='text-sm'> 4.5 - 7</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>HDL Cholesterol</p>
                    <p className='text-sm'> 4.5 - 7</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>Triglycerides</p>
                    <p className='text-sm'> 4.5 - 7</p>
                </div>
            </div>
            <div className=''>
                <p className="font-medium">C2</p>
                <div className='flex justify-between'>
                    <p className='text-sm'>Total Cholesterol</p>
                    <p className='text-sm'> 4.5 - 7</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>HDL Cholesterol</p>
                    <p className='text-sm'> 4.5 - 7</p>
                </div>
                <div className='flex justify-between'>
                    <p className='text-sm'>Triglycerides</p>
                    <p className='text-sm'> 4.5 - 7</p>
                </div>
            </div>
        </div>
    )

    return (
        <div className='p-1 bg-red-100 w-fit rounded-xl flex flex-col h-fit grow-1'>
            <div className='bg-white rounded-xl p-3'>
                <div className='border-b-2 border-solid border-gray-300 py-2'>
                    <p className='font-medium'>{title}</p>
                    <p className='text-gray-400 text-sm'>Lot Number: {calibration.lot_number}</p>
                </div>
                <div className='py-2'>
                    { isLipids ? lipidDisplay : hba1cDisplay }
                </div>
            </div>
            <p className='text-red-900 self-center text-sm p-1'>Expires {moment(calibration.expiry_date).format('dddd Do MMMM')}</p>
        </div>
    )
}