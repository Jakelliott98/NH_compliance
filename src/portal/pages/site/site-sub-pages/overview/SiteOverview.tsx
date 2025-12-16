import AffinionSection from "../calibrations/components/affinion/AffinionSection"
import CalibrationSection from "../calibrations/components/calibration-fluid/CalibrationSection"
import SiteResults from "../results/SiteResults"

export default function SiteOverview () {


    return (
        <div>
            <div className='flex gap-20 p-2'>
                <div>
                    <p>AFFINIONS</p>
                    <AffinionSection />
                </div>
                <div>
                    <p>CONTROLS</p>
                    <CalibrationSection />
                </div>
            </div>
            <div>
                <p>RESULTS</p>
                <SiteResults />
            </div>
        </div>

    )
}