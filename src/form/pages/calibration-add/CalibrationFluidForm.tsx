import { useContext, useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form";
import CalendarPopup from "@/form/components/CalendarPopup";
import { useMutation, useQuery } from "@tanstack/react-query";
import fetchSiteBySlug from "@/utils/fetchSiteBySlug";
import { useParams } from "react-router";
import fetchCalibrations from "@/utils/fetchControls";
import ControlsSelect from "./ControlsSelect";
import addControl from "@/form/utils/addControl";
import type { ControlType } from "@/form/utils/addControl";
import type { RangesType } from "@/form/utils/addControl";
import { useQueryClient } from "@tanstack/react-query";
import updateControl from "@/form/utils/updateControl";
import InputTable from "./InputTable";
import type { CalibrationDatabaseType } from "@/types/calibration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "@/components/SubmitButton";
import supabaseContext from "@/utils/supabaseContext";

const lipidsTable = [{title: 'Total Cholesterol', type: 'total'}, {title: 'HDL Cholesterol', type: 'hdl'}, {title: 'Triglycerides', type: 'triglycerides'}]
const hba1cTable = [{ title: 'HBA1c', type: 'hba1c' }]

interface CalibrationFormProps {
    closeDialog: () => void,
}

export default function CalibrationForm ({ closeDialog }: CalibrationFormProps) {

    const [selectedControl, setSelectedControl] = useState<string>('');
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            {
                !isFormOpen ? <ControlsSelect onSelect={setSelectedControl} setIsFormOpen={setIsFormOpen}/> : <CalibrationFormInput selectedControl={selectedControl} closeDialog={closeDialog} />
            }
        </div>
    )
}

interface CalibrationFormInputProps {
    selectedControl: string,
    closeDialog: () => void,
}

interface NewControlParameters {
    control: ControlType,
    testType: string,
    ranges: RangesType,
}

export function CalibrationFormInput ({ selectedControl, closeDialog }: CalibrationFormInputProps) {

    const supabase = useContext(supabaseContext)
    const queryClient = useQueryClient()
    const methods = useForm();
    const { register, handleSubmit, setValue } = methods
    const [date, setDate] = useState<Date | undefined>()

    useEffect(() => {
        setValue("expiryDate", date?.toISOString())
        setValue("controlType", selectedControl)
    }, [date, setValue, selectedControl])

    const siteSlug: string | undefined = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({
        queryKey: ['activeSite', siteSlug], 
        queryFn: () => {
            if (!siteSlug) throw new Error('Cannot find the site')
            return fetchSiteBySlug(siteSlug)
        },
        enabled: !!siteSlug,
    })
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useQuery<CalibrationDatabaseType[]>({
        queryKey: ['controls', activeSite],
        queryFn: () => {
            if (!activeSite) throw new Error('Active site has not been fetched')
            return fetchCalibrations(activeSite.site_id)
        },
        enabled: !!activeSite,
    }) // ONLY ACCESSED FOR THE CHECK ON SUBMIT MAY FIND EASIER WAY
    const addNewControl = useMutation({
        mutationFn: ({control, testType, ranges}: NewControlParameters) => addControl(control, testType, ranges, supabase),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['controls']})
        }
    })
    const updateNewControl = useMutation({
        mutationFn: ({control, testType, ranges}: NewControlParameters) => updateControl(control, testType, ranges, supabase),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['controls']})
    })


    if ( siteError || controlsError) throw new Error('Could not fetch Active Site, Controls or Affinions')
    if ( siteLoading || controlsLoading ) return (<p>Loading...</p>)
    if (!activeSite || !controls) return (<p>Something went wrong fetching sites</p>)
    
    setValue("siteID", activeSite.site_id)
    const hba1cControlPresent = controls?.some(control => control.control_type === 'hba1c')
    const lipidsControlPresent = controls?.some(control => control.control_type === 'lipids')


    const onSubmit = handleSubmit((data) => {

        if (selectedControl === 'hba1c') {
            if (hba1cControlPresent) {
                updateNewControl.mutate({control: data, testType: 'hba1c', ranges: data.hba1c})
                closeDialog()
            } else {
                addNewControl.mutate({control: data, testType: 'hba1c', ranges: data.hba1c})
                closeDialog()
            }
        } else if (selectedControl === 'lipids') {
            if (lipidsControlPresent) {
                updateNewControl.mutate({control: data, testType:'hdl', ranges: data.hdl})
                updateNewControl.mutate({control: data, testType: 'triglycerides', ranges: data.triglycerides})
                updateNewControl.mutate({control: data, testType: 'total', ranges: data.total})
                closeDialog()
            } else {
                addNewControl.mutate({control: data, testType:'hdl', ranges: data.hdl})
                addNewControl.mutate({control: data, testType: 'triglycerides', ranges: data.triglycerides})
                addNewControl.mutate({control: data, testType: 'total', ranges: data.total})
                closeDialog()
            }
        }
    })

    return (
        <FormProvider {...methods}>
            <form className="bg-white p-2 lg:p-4 rounded flex flex-col gap-2" onSubmit={onSubmit}>
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm">Lot Number</label>
                        <input className="outline rounded px-2 py-0.5 text-sm" {...register("lotNumber", {required: "Please provide a Lot Number", valueAsNumber: true})}/>
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm">Expiry Date <FontAwesomeIcon icon={faCircleInfo} /> </label>
                        <CalendarPopup onSelect={setDate} date={date}/>
                    </div>
                </div>
                <InputTable test={ selectedControl === 'hba1c' ? hba1cTable : lipidsTable}/>
                <button 
                    type="submit"
                    className="w-full py-2 tracking-wide shadow-md hover:shadow-lg cursor-pointer rounded bg-gray-100 text-gray-900"
                >
                    Add Control
                </button>
            </form>
        </FormProvider>
    )
}