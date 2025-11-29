import { useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import type { CalibrationType } from "@/types/calibration";
import type { FetchState } from "@/hooks/useFetchData";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlaskVial } from "@fortawesome/free-solid-svg-icons";

export default function CalibrationForm () {

    const [selectedFluid, setSelectedFluid] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            {
                !isFormOpen ? <CalibrationSection setSelectedFluid={setSelectedFluid} setIsFormOpen={setIsFormOpen}/> : <CalibrationFormInput selectedFluid={selectedFluid}/>
            }
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

interface ReturnControlSectionProps {
    controlType: string,
    controlsData: FetchState<CalibrationType>,
    title: string,
}

export function ReturnControlSection ({controlType, controlsData, title}: ReturnControlSectionProps) {
    
    const control = controlsData.data.find((item: CalibrationType) => { return item.test_type === controlType})

    if (controlsData.loading) {
        return (
            <Loading />
        )
    } else if (control === undefined) {
        return (
            <p className="text-red-700 text-sm">No {title} control</p>
        )
    } else {
        return (
            <div className="bg-white rounded p-2 flex flex-col justify-center items-center">
                <FontAwesomeIcon className="text-3xl pb-2 text-red-900" icon={faFlaskVial} />
                <p className="font-semibold text-center">{title}</p>
                <p className="text-center">LOT{control.lot_number}</p>
                <p className="text-center">Expires: {moment(control.expiry_date).format('Do MMMM')} </p>
            </div>
        )
    }

} 




interface CalibrationSectionProps {
    setSelectedFluid: React.Dispatch<React.SetStateAction<string>>,
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function CalibrationSection ({ setSelectedFluid, setIsFormOpen }: CalibrationSectionProps) {
    return (
        <div>
            <p>Which calibration are you updating?</p>
            <div className="flex gap-5">
                <div className="p-4 bg-red-200 rounded flex-1 cursor-pointer" 
                    onClick={() => {
                        setSelectedFluid('hba1c')
                        setIsFormOpen(true)
                    }}
                >
                    <p className="text-center font-bold text-red-900">HBA1C</p>
                </div>
                <div className="p-4 bg-yellow-200 rounded flex-1 cursor-pointer"
                    onClick={() => {
                        setSelectedFluid('lipids')
                        setIsFormOpen(true)
                    }}
                >
                    <p className="text-center font-bold text-yellow-900">Lipids</p>
                </div>
            </div>
        </div>
    )
}

interface CalibrationFormInputProps {
    selectedFluid: string,
}

function CalibrationFormInput ({ selectedFluid }: CalibrationFormInputProps) {

    const methods = useForm();
    const { register, handleSubmit } = methods

    const onSubmit = handleSubmit((data) => { console.log(data) })

    return (
        <FormProvider {...methods}>
            <form className="bg-white p-4 rounded flex flex-col gap-2" onSubmit={onSubmit}>
                <div className="flex flex-col gap-1">
                    <label>Lot Number</label>
                    <input className="outline rounded" {...register("lot_number")}/>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Expiry Date</label>
                    <input className="outline rounded" {...register("expiry_date")}/>
                </div>
                { selectedFluid === 'hba1c' ? <HBA1cForm /> : <LipidsForm /> }
                <button className="rounded p-2 bg-green-300 w-full" type="submit">Submit</button>
            </form>
        </FormProvider>
    )
}

function HBA1cForm () {

    const {register} = useFormContext();

    return (
        <div className="flex flex-col">
            <p className="font-bold">HBA1c</p>
            <div className="flex gap-2 justify-center items-center">
                <p className="font-bold">C1</p>
                <div className="flex flex-col">
                    <label>Lower</label>
                    <input className="outline rounded" {...register("hba1c_c1_low")}/>
                </div>
                <div className="flex flex-col">
                    <label>Upper</label>
                    <input className="outline rounded" {...register("hba1c_c1_high")}/>
                </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <p className="font-bold">C2</p>
                <div className="flex flex-col">
                    <label>Lower</label>
                    <input className="outline rounded" {...register("hba1c_c2_low")}/>
                </div>
                <div className="flex flex-col">
                    <label>Upper</label>
                    <input className="outline rounded" {...register("hba1c_c2_high")}/>
                </div>
            </div>
        </div>
    )
}

function LipidsForm () {

    const { register } = useFormContext();

    return (
        <div className="flex flex-col">
            <p className="font-bold">Lipids</p>
            <div>
                <p className="font-bold">C1</p>
                <div className="flex items-center gap-1">
                    <p>Total Cholesterol</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded" {...register("lipids_c1_tc_low")}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded" {...register("lipids_c1_tc_high")}/>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <p>HDL Cholesterol</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded" {...register("lipids_c1_hdl_low")}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded" {...register("lipids_c1_hdl_high")}/>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <p>Triglycerides</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded" {...register("lipids_c1_trig_low")}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded" {...register("lipids_c1_trig_high")}/>
                    </div>
                </div>
                <div>
                    <p className="font-bold">C2</p>
                </div>
            </div>
        </div>   
    )
}