import { Slider } from "@/components/ui/slider"

export default function ComplianceRules () {

    return (
        <div className="py-4">
            <div className="flex-1 border-b border-gray-200 pb-2">
                <h2 className="font-semibold">Compliance Rules</h2>
                <p className="text-sm text-gray-400">Define the timeframes used to determine compliance, including calibration validity, cleaning frequency, and fluid expiry periods. These rules control how site status is calculated.</p>
            </div>
            <div className="pt-2">
                <div>
                    <h2 className="font-semibold text-sm">Compliance Ranges</h2>
                    <p className="text-sm text-gray-400">Control the compliance ranges for the cleaning and calibrations</p>
                </div>
                <div className="flex-3 flex justify-around pt-4">
                    <div className="flex flex-col justify-center gap-4">
                        <h2 className="font-medium ">Compliance for Cleaning Duration: <span className="font-bold">30 Days</span></h2>
                        <Slider 
                            defaultValue={[30]}
                            max={60}
                            step={1}
                        />
                        <p className="text-sm text-gray-500 italic">Adjust the period for cleaning calibrations.</p>
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                        <h2 className="font-medium ">Compliance for Affinion Calibration Duration: <span className="font-bold">7 Days</span></h2>
                        <Slider
                            defaultValue={[7]}
                            max={28}
                            step={7}
                        />
                        <p className="text-sm text-gray-500 italic">Adjust the period for how often the affinions should be calibrated</p>
                    </div>
                </div>
            </div>
        </div>
    )
}