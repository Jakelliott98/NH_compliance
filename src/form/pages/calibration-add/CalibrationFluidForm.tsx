import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form";
import CalendarPopup from "@/form/components/CalendarPopup";
import { useQuery } from "@tanstack/react-query";
import fetchSiteBySlug from "@/form/utils/fetchSiteBySlug";
import { useParams } from "react-router";
import fetchCalibrations from "@/form/utils/fetchControls";
import LipidsForm from "./LipidsForm";
import HBA1cForm from "./Hba1cForm";
import ControlsSelect from "./ControlsSelect";

export default function CalibrationForm () {

    const [selectedFluid, setSelectedFluid] = useState<string>('');
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            {
                !isFormOpen ? <ControlsSelect setSelectedFluid={setSelectedFluid} setIsFormOpen={setIsFormOpen}/> : <CalibrationFormInput selectedFluid={selectedFluid} />
            }
        </div>
    )
}

interface CalibrationFormInputProps {
    selectedFluid: string,
}

export function CalibrationFormInput ({ selectedFluid }: CalibrationFormInputProps) {

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
    
    const hba1cControlPresent = controls?.some(control => control.control_type === 'hba1c')
    const lipidsControlPresent = controls?.some(control => control.control_type === 'lipids')


    const onSubmit = handleSubmit((data) => {

        console.log(data)

        if (selectedFluid === 'hba1c') {
            if (hba1cControlPresent) {
                // Modify
                console.log('Hb update')
            } else {
                // Insert
                console.log('Hb Insert')
            }
        } else if (selectedFluid === 'lipids') {
            if (lipidsControlPresent) {
                // Update
                console.log('lipids update')
            } else {
                // Insert
                console.log('Lipids Insert')
            }
        }
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