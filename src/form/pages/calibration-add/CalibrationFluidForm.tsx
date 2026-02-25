import { useState } from "react"
import { FormProvider, useForm, Controller } from "react-hook-form";
import CalendarPopup from "@/form/components/CalendarPopup";
import { useParams } from "react-router";
import ControlsSelect from "./ControlsSelect";
import InputTable from "./InputTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useSiteBySlug } from '@/services/sites'
import { useControls } from "@/services/controls/queries";
import { useUpdateControl, useCreateControl, type ControlType } from "@/services/controls";

const lipidsTable = [{title: 'Total Cholesterol', type: 'total'}, {title: 'HDL Cholesterol', type: 'hdl'}, {title: 'Triglycerides', type: 'triglycerides'}]
const hba1cTable = [{ title: 'HBA1c', type: 'hba1c' }]

interface CalibrationFormProps {
    closeDialog: () => void,
}

export default function CalibrationForm ({ closeDialog }: CalibrationFormProps) {

    const [selectedControl, setSelectedControl] = useState<'hba1c' | 'lipids'>('hba1c');
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
    selectedControl: 'hba1c' | 'lipids',
    closeDialog: () => void,
}

export function CalibrationFormInput ({ selectedControl, closeDialog }: CalibrationFormInputProps) {

    const methods = useForm<ControlType>();
    const { register, handleSubmit } = methods

    const siteSlug: string | undefined = useParams().Site;
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useSiteBySlug(siteSlug)
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useControls(activeSite)

    const { mutate: addControl } = useCreateControl()

    const { mutate: updateControl } = useUpdateControl()


    if ( siteError || controlsError) throw new Error('Could not fetch Active Site, Controls or Afinions')
    if ( siteLoading || controlsLoading ) return (<p>Loading...</p>)
    if (!activeSite || !controls) return (<p>Something went wrong fetching sites</p>)
    
    const hba1cControlPresent = controls?.some(control => control.control_type === 'hba1c')
    const lipidsControlPresent = controls?.some(control => control.control_type === 'lipids')


    const onSubmit = handleSubmit((data) => {

        console.log(data)

        if (selectedControl === 'hba1c') {
            if (!data.hba1c) return;
            if (hba1cControlPresent) {
                updateControl({control: data, testType: 'hba1c', ranges: data.hba1c})
                closeDialog()
            } else {
                addControl({control: data, testType: 'hba1c', ranges: data.hba1c})
                closeDialog()
            }
        } else if (selectedControl === 'lipids') {
            if(!data.hdl || !data.triglycerides || !data.total) return
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
                        <Controller
                            control={methods.control}
                            name='expiryDate'
                            render={({field}) => (
                                <CalendarPopup onSelect={field.onChange} date={field.value}/>
                            )}
                        />
                    </div>
                </div>
                <InputTable test={ selectedControl === 'hba1c' ? hba1cTable : lipidsTable}/>
                <input type="hidden" {...register('siteID', {valueAsNumber: true})} value={activeSite.site_id}/>
                <input type="hidden" {...register('controlType')} value={selectedControl}/>
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