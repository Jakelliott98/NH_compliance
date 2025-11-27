// import { useForm } from "react-hook-form";
import SiteFormContext from "@/components/context/SiteFormContext"
import { Checkbox } from "@/components/ui/checkbox"
import { useContext } from "react"
import type { CalibrationType } from "@/types/calibration"
import type { AffinionCardType } from "@/types/affinion"
import type { TestRangeType } from "@/types/calibration"
import type { Hba1cRangeType } from "@/types/calibration"
import type { FetchState } from "@/components/custom-hooks/useFetchData"

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
    if (siteFormContext === null) throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')
    const { controls } = siteFormContext

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
                    <Hba1cSection controlsData={controls}/>
                    <LipidSection controlsData={controls}/>
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

function Loading () {
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

interface Hba1cSectionProps {
    title: string,
    testType: string,
    controlsData: FetchState<CalibrationType>
}

function Hba1cSection ({ controlsData }: Hba1cSectionProps) {

    const control = controlsData.data.find((item: CalibrationType) => { return item.test_type === 'hba1c' })


    if (controlsData.loading) {
        return (<Loading />)
    } else if (control === undefined) {
        return (
            <p>Error msg</p>
        )
    } else {
        return (
            <div>
                <p className="text-center font-bold text-gray-600">HBA1c</p>
                <Hba1cInputRanges ranges={control.calibration_ranges}/>
            </div>
        )
    }

}

interface LipidSectionProps {
    testType: string,
    controlsData: FetchState<CalibrationType>
}

function LipidSection ({ controlsData }: LipidSectionProps) {

    const control = controlsData.data.find((item: CalibrationType) => { return item.test_type === 'lipids' })

    if (controlsData.loading) {
        return (<Loading />)
    } else if (control == undefined) {
        return (
            <p>Error msg</p>
        )
    } else {
        return (
            <div>
                <p className="text-center font-bold text-gray-600">Lipids</p>
                <p>Total</p>
                <LipidsInputRanges ranges={control.calibration_ranges.total} />
                <p>HDL Cholesterol</p>
                <LipidsInputRanges ranges={control.calibration_ranges.hdl} />
                <p>Trigylcerides</p>
                <LipidsInputRanges ranges={control.calibration_ranges.triglycerides} />
            </div>
        )
    }
}

// New files


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