import type { FetchState } from "@/hooks/useFetchData"
import type { CalibrationType } from "@/types/calibration"
import { useFormContext } from "react-hook-form"
import type { Hba1cRangeType } from "@/types/calibration"

interface Hba1cSectionProps {
    controlsData: FetchState<CalibrationType>
}

export default function Hba1cSection ({ controlsData }: Hba1cSectionProps) {

    const control = controlsData.find((item: CalibrationType) => { return item.test_type === 'hba1c' })

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

interface Hba1cInputRangesProps {
    ranges: Hba1cRangeType,
}

function Hba1cInputRanges ({ ranges }: Hba1cInputRangesProps) {

    const { register } = useFormContext()

    return (
    <div className="flex flex-row gap-2">
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <label className="font-bold">C1</label>
                <p className="text-gray-500">{ranges.c1.low} - {ranges.c1.high}</p>
            </div>
            <input type="text" className="outline rounded" {...register("hba1c_c1", { required: "pass a result"})}/>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <label className="font-bold">C2</label>
                <p className="text-gray-500">{ranges.c2.low} - {ranges.c2.high}</p>
            </div>
            <input type="text" className="outline rounded" {...register("hba1c_c2", { required: "pass a result"})}/>
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

