import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form";
import CalendarPopup from "@/form/components/CalendarPopup";
import { useMutation, useQuery } from "@tanstack/react-query";
import fetchSiteBySlug from "@/form/utils/fetchSiteBySlug";
import { useParams } from "react-router";
import fetchCalibrations from "@/form/utils/fetchControls";
import LipidsForm from "./LipidsForm";
import HBA1cForm from "./Hba1cForm";
import ControlsSelect from "./ControlsSelect";
import addControl from "@/form/utils/addControl";
import type { ControlType } from "@/form/utils/addControl";
import type { RangesType } from "@/form/utils/addControl";
import { useQueryClient } from "@tanstack/react-query";

export default function CalibrationForm () {

    const [selectedControl, setSelectedControl] = useState<string>('');
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            {
                !isFormOpen ? <ControlsSelect onSelect={setSelectedControl} setIsFormOpen={setIsFormOpen}/> : <CalibrationFormInput selectedControl={selectedControl} />
            }
        </div>
    )
}

interface CalibrationFormInputProps {
    selectedControl: string,
}

interface addNewControlParameters {
    control: ControlType,
    testType: string,
    ranges: RangesType,
}

export function CalibrationFormInput ({ selectedControl }: CalibrationFormInputProps) {

    const queryClient = useQueryClient()
    const methods = useForm();
    const { register, handleSubmit, setValue } = methods
    const [date, setDate] = useState<Date | undefined>()

    useEffect(() => {
        setValue("expiryDate", date?.toISOString())
        setValue("controlType", selectedControl)
    }, [date, setValue, selectedControl])

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
        const { data: controls, isError: controlsError, isLoading: controlsLoading } = useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => fetchCalibrations(activeSite.site_id),
        enabled: !!activeSite,
    }) // ONLY ACCESSED FOR THE CHECK ON SUBMIT MAY FIND EASIER WAY
    const addNewControl = useMutation({
        mutationFn: ({control, testType, ranges}: addNewControlParameters) => addControl(control, testType, ranges),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['controls']})
        }
    })


    if ( siteError || controlsError) throw new Error('Could not fetch Active Site, Controls or Affinions')
    if ( siteLoading || controlsLoading ) return (<p>Loading...</p>)
    
    setValue("siteID", activeSite.site_id)
    const hba1cControlPresent = controls?.some(control => control.control_type === 'hba1c')
    const lipidsControlPresent = controls?.some(control => control.control_type === 'lipids')


    const onSubmit = handleSubmit((data) => {


        if (selectedControl === 'hba1c') {
            if (hba1cControlPresent) {
                // Modify
            } else {
                addNewControl.mutate({control: data, testType: 'hba1c', ranges: data.hba1c})
            }
        } else if (selectedControl === 'lipids') {
            if (lipidsControlPresent) {
                // Update
            } else {
                addNewControl.mutate({control: data, testType:'hdl', ranges: data.hdl})
                addNewControl.mutate({control: data, testType: 'triglycerides', ranges: data.triglycerides})
                addNewControl.mutate({control: data, testType: 'total', ranges: data.total})
            }
        }
    })

    return (
        <FormProvider {...methods}>
            <form className="bg-white p-4 rounded flex flex-col gap-2" onSubmit={onSubmit}>
                <div className="flex flex-col gap-1">
                    <label>Lot Number</label>
                    <input className="outline rounded px-2 py-0.5" {...register("lotNumber", {required: "Please provide a Lot Number"})}/>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Expiry Date</label>
                    <CalendarPopup onSelect={setDate} date={date}/>
                </div>
                { selectedControl === 'hba1c' ? <HBA1cForm /> : <LipidsForm /> }
                <button className="rounded p-2 bg-green-300 w-full" type="submit">Submit</button>
            </form>
        </FormProvider>
    )
}