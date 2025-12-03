import { useEffect, useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { addControls, updateControl } from "@/form/hooks/useInsert";
import CalendarPopup from "@/form/components/CalendarPopup";
import { useQuery } from "@tanstack/react-query";
import fetchSiteBySlug from "@/form/utils/fetchSiteBySlug";
import { useParams } from "react-router";
import fetchCalibrations from "@/form/utils/fetchControls";

export default function CalibrationForm () {

    const [selectedFluid, setSelectedFluid] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false)


    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            {
                !isFormOpen ? <CalibrationSection setSelectedFluid={setSelectedFluid} setIsFormOpen={setIsFormOpen}/> : <CalibrationFormInput selectedFluid={selectedFluid} />
            }
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

export function CalibrationFormInput ({ selectedFluid }: CalibrationFormInputProps) {

//    const isUpdating = controls === undefined ? true : false; NEED TO FIND WAY TO UPDATE VS SUBMIT
    const methods = useForm();
    const { register, handleSubmit, setValue } = methods
    const [date, setDate] = useState<Date | undefined>()
    
    useEffect(() => {
        setValue("expiry_date", date?.toISOString())
    }, [date, setValue])

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
        const { data: controls, isError: controlsError, isLoading: controlsLoading } = useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => fetchCalibrations(activeSite.site_id),
        enabled: !!activeSite,
    }) // ONLY ACCESSED FOR THE CHECK ON SUBMIT MAY FIND EASIER WAY
    
    if ( siteError || controlsError) throw new Error('Could not fetch Active Site, Controls or Affinions')
    if ( siteLoading || controlsLoading ) return (<p>Loading...</p>)


    const onSubmit = handleSubmit((data) => {
        //if (isUpdating) {
            updateControl(data, selectedFluid, activeSite.site_id)
        //} else {
        //    addControls(data, selectedFluid, activeSite.site_id)
        //}
        //console.log(data)
    })

    return (
        <FormProvider {...methods}>
            <form className="bg-white p-4 rounded flex flex-col gap-2" onSubmit={onSubmit}>
                <div className="flex flex-col gap-1">
                    <label>Lot Number</label>
                    <input className="outline rounded px-2 py-0.5" {...register("lot_number", {required: "Please provide a Lot Number"})}/>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Expiry Date</label>
                    <CalendarPopup onSelect={setDate} date={date}/>
                </div>
                { selectedFluid === 'hba1c' ? <HBA1cForm /> : <LipidsForm /> }
                <button className="rounded p-2 bg-green-300 w-full" type="submit">Submit</button>
            </form>
        </FormProvider>
    )
}

function HBA1cForm () {

    const { register } = useFormContext();

    return (
        <div className="flex flex-col">
            <p className="font-bold">HBA1c</p>
            <div className="flex gap-2 justify-center items-center">
                <p className="font-bold">C1</p>
                <div className="flex flex-col">
                    <label>Lower</label>
                    <input className="outline rounded" {...register("hba1c_c1_low", {required: "Please provide controls range"})}/>
                </div>
                <div className="flex flex-col">
                    <label>Upper</label>
                    <input className="outline rounded" {...register("hba1c_c1_high", {required: "Please provide controls range"})}/>
                </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <p className="font-bold">C2</p>
                <div className="flex flex-col">
                    <label>Lower</label>
                    <input className="outline rounded" {...register("hba1c_c2_low", {required: "Please provide controls range"})}/>
                </div>
                <div className="flex flex-col">
                    <label>Upper</label>
                    <input className="outline rounded" {...register("hba1c_c2_high", {required: "Please provide controls range"})}/>
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
                        <input className="outline rounded" {...register("lipids_c1_tc_low", {required: "Please provide controls range"})}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded" {...register("lipids_c1_tc_high", {required: "Please provide controls range"})}/>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <p>HDL Cholesterol</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded" {...register("lipids_c1_hdl_low", {required: "Please provide controls range"})}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded" {...register("lipids_c1_hdl_high", {required: "Please provide controls range"})}/>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <p>Triglycerides</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded" {...register("lipids_c1_trig_low", {required: "Please provide controls range"})}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded" {...register("lipids_c1_trig_high", {required: "Please provide controls range"})}/>
                    </div>
                </div>
            </div>
            <div>
                <p className="font-bold">C2</p>
                <div className="flex items-center gap-1">
                    <p>Total Cholesterol</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded" {...register("lipids_c2_tc_low", {required: "Please provide controls range"})}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded" {...register("lipids_c2_tc_high", {required: "Please provide controls range"})}/>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <p>HDL Cholesterol</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded" {...register("lipids_c2_hdl_low", {required: "Please provide controls range"})}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded" {...register("lipids_c2_hdl_high", {required: "Please provide controls range"})}/>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <p>Triglycerides</p>
                    <div className="flex flex-col">
                        <label>Lower</label>
                        <input className="outline rounded" {...register("lipids_c2_trig_low", {required: "Please provide controls range"})}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Upper</label>
                        <input className="outline rounded" {...register("lipids_c2_trig_high", {required: "Please provide controls range"})}/>
                    </div>
                </div>
            </div>
        </div>   
    )
}