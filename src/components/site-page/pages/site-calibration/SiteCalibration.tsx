import CalibrationCard from './CalibrationCard'
import AffinionCard from './AffinionCard'

export default function SiteCalibration () {

    return (
        <div className='flex gap-20 p-2'>
            <div className='flex-1 flex flex-col gap-3 p-3'>
                <p className='font-medium text-lg'>Affinions</p>
                <div className="flex gap-8">
                    <AffinionCard />
                    <AffinionCard />
                    <AffinionCard />
                </div>
            </div>
            <div className='flex-1 flex flex-col gap-3 p-3'>
                <p className='font-medium text-lg'>Calibration Fluids</p>
                <div className='flex gap-8'>
                    <CalibrationCard lipid={true} title={'Lipids'}/>
                    <CalibrationCard lipid={false} title={'HBA1c'}/>
                </div>
            </div>
        </div>
    )
}
