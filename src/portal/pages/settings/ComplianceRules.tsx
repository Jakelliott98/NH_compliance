import { Slider } from "@/components/ui/slider"

export default function ComplianceRules () {

    return (
        <div className="py-4 border-b-2 border-solid border-gray-200 flex gap-4">
            <div className="flex-1">
                <p className="font-bold">Compliance Rules</p>
                <p className="text-sm text-gray-600">Define the timeframes used to determine compliance, including calibration validity, cleaning frequency, and fluid expiry periods. These rules control how site status is calculated.</p>
            </div>
            <div className="flex-3 flex justify-around">
                <div className="flex flex-col justify-center gap-4">
                    <h2 className="font-medium ">Compliance for Cleaning Duration: <span className="font-bold">30 Days</span></h2>
                    <Slider 
                        defaultValue={[30]}
                        max={60}
                        step={1}
                    />
                    <p className="text-sm text-gray-700">Explaining the toggle above</p>
                </div>
                <div className="flex flex-col justify-center gap-4">
                    <h2 className="font-medium ">Compliance for Affinion Calibration Duration: <span className="font-bold">7 Days</span></h2>
                    <Slider
                        defaultValue={[7]}
                        max={28}
                        step={7}
                    />
                    <p className="text-sm text-gray-700">Explaining the toggle for above</p>
                </div>
            </div>
        </div>
    )
}