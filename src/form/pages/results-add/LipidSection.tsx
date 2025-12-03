import type { FetchState } from "@/hooks/useFetchData"
import type { CalibrationType } from "@/types/calibration"
import { useFormContext } from "react-hook-form"
import type { TestRangeType } from "@/types/calibration"

interface LipidSectionProps {
    controlsData: FetchState<CalibrationType>
}

export default function LipidSection ({ controlsData }: LipidSectionProps) {

    const control = controlsData.find((item: CalibrationType) => { return item.test_type === 'lipids' })

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
                <LipidsInputRanges ranges={control.calibration_ranges.total} testType={'total'}/>
                <p>HDL Cholesterol</p>
                <LipidsInputRanges ranges={control.calibration_ranges.hdl} testType={'hdl'}/>
                <p>Trigylcerides</p>
                <LipidsInputRanges ranges={control.calibration_ranges.triglycerides} testType={'triglycerides'}/>
            </div>
        )
    }
}

interface LipidsInputRangesProps {
    ranges: TestRangeType,
    testType: string,
}

function LipidsInputRanges ({ ranges, testType }: LipidsInputRangesProps) {

    const { register } = useFormContext()

    return (
        <div className="flex flex-row gap-2">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <label className="font-bold">C1</label>
                    <p className="text-gray-500">{ranges.c1.low} - {ranges.c1.high}</p>
                </div>
                <input type="text" className="outline rounded" {...register(`${testType}_c1`)}/>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <label className="font-bold">C2</label>
                    <p className="text-gray-500">{ranges.c2.low} - {ranges.c2.high}</p>
                </div>
                <input type="text" className="outline rounded" {...register(`${testType}_c2`)}/>
            </div>
        </div>
    )
}

function Loading () {
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}