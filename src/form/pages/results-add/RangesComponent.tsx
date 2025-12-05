import { useFormContext } from "react-hook-form"

export default function RangesComponent ({ control }) {

    const { register } = useFormContext()

    return (
        <div>
            <p>{ control.display_name }</p>
            <div className="flex flex-row gap-2">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <label className="font-bold">C1</label>
                        <p className="text-gray-500">{control.calibration_ranges.c1.low} - {control.calibration_ranges.c1.high}</p>
                    </div>
                    <input type="text" className="outline rounded" {...register(`${control.test_type}.c1.result`, {required: 'Please fill in all input boxes',valueAsNumber: true})}/>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <label className="font-bold">C2</label>
                        <p className="text-gray-500">{control.calibration_ranges.c2.low} - {control.calibration_ranges.c2.high}</p>
                    </div>
                    <input type="text" className="outline rounded" {...register(`${control.test_type}.c2.result`, {required: 'Please fill in all input boxes', valueAsNumber: true})}/>
                </div>
            </div>
        </div>
    )

}