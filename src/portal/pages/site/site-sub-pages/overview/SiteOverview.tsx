import AffinionSection from "../calibrations/components/affinion/AffinionSection"
import CalibrationSection from "../calibrations/components/calibration-fluid/CalibrationSection"
import SiteResults from "../results/SiteResults"

export default function SiteOverview () {


    return (
        <div>
            <div className='flex gap-20 p-2'>
                <div className="flex-1">
                    <p className="text-center">AFFINIONS</p>
                    <AffinionSection />
                </div>
                <div className=" flex-1">
                    <p className="text-center">CONTROLS</p>
                    <CalibrationSection />
                </div>
            </div>
            <div>
                <p className="text-center">RESULTS</p>
                <SiteResults />
            </div>
        </div>

    )
}