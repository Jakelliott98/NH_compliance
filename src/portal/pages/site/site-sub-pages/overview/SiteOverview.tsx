import AffinionSection from "../calibrations/components/affinion/AffinionSection"
import CalibrationSection from "../calibrations/components/calibration-fluid/CalibrationSection"
import SiteResults from "../results/SiteResults"

export default function SiteOverview () {


    return (
        <div className="flex">
            <div className='flex-2 flex flex-col gap-20 p-2'>
                <div className="flex-1">
                    <p className="text-center pb-2">AFFINIONS</p>
                    <AffinionSection />
                </div>
                <div className="flex-1">
                    <p className="text-center">CONTROLS</p>
                    <CalibrationSection />
                </div>
            </div>
            <div className="flex-3">
                <p className="text-center">RESULTS</p>
                <SiteResults />
            </div>
        </div>

    )
}