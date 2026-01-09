import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export default function ComplianceRules () {

    const [cleaningValue, setCleaningValue] = useState([4])
    const [calibrationValue, setCalibrationValue] = useState([7])

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
                        <h2 className="font-medium ">Affinion machines need to be calibrated every: <span className="font-bold">{cleaningValue[0]} Weeks</span></h2>
                        <Slider 
                            defaultValue={[4]}
                            max={12}
                            step={1}
                            value={cleaningValue}
                            onValueChange={value => setCleaningValue(value)}
                        />
                        <p className="text-sm text-gray-500 italic">Adjust the period for cleaning calibrations.</p>
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                        <h2 className="font-medium ">Affinions machines need to be cleaned every: <span className="font-bold">{calibrationValue[0]} Days</span></h2>
                        <Slider
                            className="cursor-pointer"
                            defaultValue={[1]}
                            max={30}
                            step={7}
                            value={calibrationValue}
                            onValueChange={(value) => {return setCalibrationValue(value)}}
                        />
                        <p className="text-sm text-gray-500 italic">Adjust the period for how often the affinions should be calibrated</p>
                    </div>
                </div>
            </div>
        </div>
    )
}