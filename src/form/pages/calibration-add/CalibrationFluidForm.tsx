import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form";
import CalendarPopup from "@/form/components/CalendarPopup";
import { useParams } from "react-router";
import ControlsSelect from "./ControlsSelect";
import InputTable from "./InputTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useSiteBySlug } from '@/services/sites'
import { useControls } from "@/services/controls/queries";
import { useUpdateControl, useCreateControl } from "@/services/controls";

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

export function CalibrationFormInput ({ selectedControl, closeDialog }: CalibrationFormInputProps) {

    const methods = useForm();
    const { register, handleSubmit, setValue } = methods
    const [date, setDate] = useState<Date | undefined>()

    useEffect(() => {
        setValue("expiryDate", date?.toISOString())
        setValue("controlType", selectedControl)
    }, [date, setValue, selectedControl])

    const siteSlug: string | undefined = useParams().Site;
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useSiteBySlug(siteSlug)
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useControls(activeSite)

    const { mutate: addControl } = useCreateControl()

    const { mutate: updateControl } = useUpdateControl()


    if ( siteError || controlsError) throw new Error('Could not fetch Active Site, Controls or Afinions')
    if ( siteLoading || controlsLoading ) return (<p>Loading...</p>)
    if (!activeSite || !controls) return (<p>Something went wrong fetching sites</p>)
    
    setValue("siteID", activeSite.site_id)
    const hba1cControlPresent = controls?.some(control => control.control_type === 'hba1c')
    const lipidsControlPresent = controls?.some(control => control.control_type === 'lipids')


    const onSubmit = handleSubmit((data) => {

        if (selectedControl === 'hba1c') {
            if (hba1cControlPresent) {
                updateControl({control: data, testType: 'hba1c', ranges: data.hba1c})
                closeDialog()
            } else {
                addControl({control: data, testType: 'hba1c', ranges: data.hba1c})
                closeDialog()
            }
        } else if (selectedControl === 'lipids') {
            if (lipidsControlPresent) {
                updateControl({control: data, testType:'hdl', ranges: data.hdl})
                updateControl({control: data, testType: 'triglycerides', ranges: data.triglycerides})
                updateControl({control: data, testType: 'total', ranges: data.total})
                closeDialog()
            } else {
                addControl({control: data, testType:'hdl', ranges: data.hdl})
                addControl({control: data, testType: 'triglycerides', ranges: data.triglycerides})
                addControl({control: data, testType: 'total', ranges: data.total})
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
                    className="w-full py-2 tracking-wide shadow-md hover:shadow-lg cursor-pointer rounded btn"
                >
                    Add Control
                </button>
            </form>
        </FormProvider>
    )
}