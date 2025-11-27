import { useContext, useState } from "react"
import FormContext from "@/form/FormContext"
import SiteFormContext from "@/components/context/SiteFormContext";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import type { CalibrationType } from "@/types/calibration";

export default function CalibrationForm () {

    const [selectedFluid, setSelectedFluid] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            <CalibrationHeader />
            {
                !isFormOpen ? <CalibrationSection setSelectedFluid={setSelectedFluid} setIsFormOpen={setIsFormOpen}/> : <CalibrationFormInput selectedFluid={selectedFluid}/>
            }
        </div>
    )
}

function CalibrationHeader () {
    
    const formContext = useContext(FormContext)
    const siteFormContext = useContext(SiteFormContext)

    if (formContext === null) {
        throw new Error('FormContext has to be used within <FormContext.Provider>')
    }

    if (siteFormContext === null) {
        throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')
    }

    const { site } = formContext
    const { controls } = siteFormContext

    const lipidControl = controls.loading ? '' : controls.data.find((item: CalibrationType) => { return item.test_type === 'lipids' })
    const hba1cControl = controls.loading ? '' : controls.data.find((item: CalibrationType) => { return item.test_type === 'hba1c' })

    return (
        <div className="flex flex-col gap-3 py-2 w-fit">
            <p className="text-center font-bold">{site.site_name}</p>
            <div className="flex gap-5 justify-center">
                <p>{site.team_leader}</p>
            </div>
            <div className="flex gap-5 justify-between">
                <div>
                    <p>HBA1c</p>
                    <p>{lipidControl.lot_number}</p>
                    <p>Expires: {hba1cControl.expiry_date}</p>
                </div>
                <div>
                    <p>Lipids</p>
                    <p>{hba1cControl.lot_number}</p>
                    <p>Expires: {lipidControl.expiry_date}</p>
                </div>
            </div>
        </div>
    )
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