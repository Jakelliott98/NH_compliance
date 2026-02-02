import AfinionSection from "../calibrations/afinion/AfinionSection"
import CalibrationSection from "../calibrations/calibration-fluid/CalibrationSection"
import SiteResults from "../results/SiteResults"

export default function SiteOverview () {


    return (
        <div className="flex p-2 gap-5 h-full">
            <div className='flex-2 flex flex-col gap-5 max-h-fit'>
                <div className="flex-1 bg-gray-50 rounded-xl p-4">
                    <p className="text-center pb-2">AFINIONS</p>
                    <AfinionSection />
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-4">
                    <p className="text-center">CONTROLS</p>
                    <CalibrationSection />
                </div>
            </div>
            <div className="flex-3 min-h-full">
                <div className="bg-gray-50 rounded-xl p-4 min-h-full flex flex-col">
                    <p className="text-center">RESULTS</p>
                    <SiteResults />
                </div>
            </div>
        </div>

    )
}