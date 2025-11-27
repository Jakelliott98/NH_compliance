// import { useForm } from "react-hook-form";
import SiteFormContext from "@/components/context/SiteFormContext"
import { Checkbox } from "@/components/ui/checkbox"
import { useContext } from "react"
import type { CalibrationType } from "@/types/calibration"
import type { AffinionCardType } from "@/types/affinion"
import type { TestRangeType } from "@/types/calibration"
import type { Hba1cRangeType } from "@/types/calibration"

export default function FormSection () {

    const siteFormContext = useContext(SiteFormContext)

    if (siteFormContext === null) {
        throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')
    }

    // Change type back to number
    const { affinions } = siteFormContext

    return (
        <div className="flex flex-row w-full justify-around">
            {
                affinions.data.map((affinion: AffinionCardType) => {
                    return (
                        <AffinionResultCard affinion={affinion} key={affinion.affinion_id}/>
                    )
                })
            }
        </div>
    )
}

interface AffinionResultCardProps {
    affinion: AffinionCardType,
}

function AffinionResultCard ({ affinion }: AffinionResultCardProps) {

    const siteFormContext = useContext(SiteFormContext)

    if (siteFormContext === null) {
        throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')
    }

    const { controls } = siteFormContext

    const lipidControl = controls.loading ? '' : controls.data.find((item: CalibrationType) => { return item.test_type === 'lipids' })
    const hba1cControl = controls.loading ? '' : controls.data.find((item: CalibrationType) => { return item.test_type === 'hba1c' })

    return (
        <form className="bg-white p-4 rounded outline">
            <div>
                <div>
                    <p className="text-center">{affinion.name} | {affinion.nh_number}</p>
                    <div className=" bg-blue-200 px-2 py-0.5 flex gap-2 justify-center items-center rounded">
                        <Checkbox 
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                        <label className="text-blue-500 text-sm">Not in rotation this week</label>
                    </div>
                    <div>
                        <p className="text-center font-bold text-gray-600">HBA1c</p>
                        <Hba1cInputRanges ranges={hba1cControl.calibration_ranges}/>
                    </div>
                    <div>
                        <p className="text-center font-bold text-gray-600">Lipids</p>
                        <div>
                            <p>Total Cholesterol</p>
                            <LipidsInputRanges ranges={lipidControl.calibration_ranges.total} />
                        </div>
                        <div>
                            <p>HDL Cholesterol</p>
                            <LipidsInputRanges ranges={lipidControl.calibration_ranges.hdl} />
                        </div>
                        <div>
                            <p>Triglycerides</p>
                            <LipidsInputRanges ranges={lipidControl.calibration_ranges.triglycerides} />
                        </div>
                    </div>
                    <div className=" bg-green-200 px-2 py-0.5 flex gap-2 justify-center items-center rounded">
                        <Checkbox 
                            className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                        />
                        <label className="text-green-500 text-sm">Affinion Cleaned</label>
                    </div>
                </div>
            </div>
            <button type="submit">Submit Results</button>
        </form>
    )
}

interface Hba1cInputRangesProps {
    ranges: Hba1cRangeType,
}

function Hba1cInputRanges ({ ranges }: Hba1cInputRangesProps) {

    return (
    <div className="flex flex-row gap-2">
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <label className="font-bold">C1</label>
                <p className="text-gray-500">{ranges.c1.low} - {ranges.c1.high}</p>
            </div>
            <input type="text" className="outline rounded"/>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <label className="font-bold">C2</label>
                <p className="text-gray-500">{ranges.c2.low} - {ranges.c2.high}</p>
            </div>
            <input type="text" className="outline rounded"/>
        </div>
    </div>
    )
}

interface LipidsInputRangesProps {
    ranges: TestRangeType,
}

function LipidsInputRanges ({ ranges }: LipidsInputRangesProps) {

    return (
        <div className="flex flex-row gap-2">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <label className="font-bold">C1</label>
                    <p className="text-gray-500">{ranges.c1.low} - {ranges.c1.high}</p>
                </div>
                <input type="text" className="outline rounded"/>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <label className="font-bold">C2</label>
                    <p className="text-gray-500">{ranges.c2.low} - {ranges.c2.high}</p>
                </div>
                <input type="text" className="outline rounded"/>
            </div>
        </div>
    )
}