// import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"

export default function FormSection () {

    // Change type back to number

    return (
        <div className="flex flex-row w-full justify-around">
            <AffinionResultCard />
            <AffinionResultCard />
            <AffinionResultCard />
        </div>
    )
}

// <input type="text" placeholder="location" {...register("location")}/>
/* 

 const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    } 

    */

function AffinionResultCard () {

    return (
        <form className="bg-white p-4 rounded outline">
            <div>
                <div>
                    <p className="text-center">Affinion 1 | NH3456754</p>
                    <div className=" bg-blue-200 px-2 py-0.5 flex gap-2 justify-center items-center rounded">
                        <Checkbox 
                            className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                        />
                        <label className="text-blue-500 text-sm">Not in rotation this week</label>
                    </div>
                    <div>
                        <p className="text-center font-bold text-gray-600">HBA1c</p>
                        <InputRanges />
                    </div>
                    <div>
                        <p className="text-center font-bold text-gray-600">Lipids</p>
                        <div>
                            <p>Total Cholesterol</p>
                            <InputRanges />
                        </div>
                        <div>
                            <p>HDL Cholesterol</p>
                            <InputRanges />
                        </div>
                        <div>
                            <p>Triglycerides</p>
                            <InputRanges />
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

function InputRanges () {

    return (
    <div className="flex flex-row gap-2">
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <label className="font-bold">C1</label>
                <p className="text-gray-500">40 - 58</p>
            </div>
            <input type="text" className="outline rounded"/>
        </div>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <label className="font-bold">C2</label>
                <p className="text-gray-500">60 - 72</p>
            </div>
            <input type="text" className="outline rounded"/>
        </div>
    </div>
    )
}