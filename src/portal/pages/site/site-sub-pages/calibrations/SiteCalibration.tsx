import AffinionSection from "./components/affinion/AffinionSection"
import CalibrationSection from "./components/calibration-fluid/CalibrationSection"

export default function SiteCalibration () {

    return (
        <div className='flex gap-20 p-2'>
            <AffinionSection />
            <CalibrationSection />
        </div>
    )
}



