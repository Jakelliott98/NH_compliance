import { useContext, useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import supabase from "@/utils/supabase";
import SiteFormContext from "@/form/context/SiteFormContext";
import FormContext from "@/form/context/FormContext";

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

const addControls = async (data, controlType, siteID) => {
    
    let dataStructure = ''

    if (controlType === 'hba1c') {
        dataStructure = {
                c1: {
                    low: data.hba1c_c1_low,
                    high: data.hba1c_c1_high
                },
                c2: {
                    low: data.hba1c_c2_low,
                    high: data.hba1c_c2_high,
                }
            }
    } else if (controlType === 'lipids') {
        dataStructure = {
                hdl: {
                    c1: {
                        low: data.lipids_c1_hdl_low,
                        high: data.lipids_c1_hdl_high
                    },
                    c2: {
                        low: data.lipids_c2_hdl_low,
                        high: data.lipids_c2_hdl_high,
                    }
                },
                total: {
                    c1: {
                        low: data.lipids_c1_tc_low,
                        high: data.lipids_c1_tc_high
                    },
                    c2: {
                        low: data.lipids_c2_tc_low,
                        high: data.lipids_c2_tc_high,
                    }
                },
                triglycerides: {
                    c1: {
                        low: data.lipids_c1_trig_low,
                        high: data.lipids_c1_trig_high
                    },
                    c2: {
                        low: data.lipids_c2_trig_low,
                        high: data.lipids_c2_trig_high,
                    }
                }
        }
    }

    const { error } = await supabase
    .from('calibrations')
    .insert({
        lot_number: data.lot_number, 
        expiry_date: data.expiry_date, 
        calibration_ranges: dataStructure,
        site_id: siteID,
        test_type: controlType,
    })

}

const updateControl = async (data, controlType, siteID) => {

    let dataStructure = ''

    if (controlType === 'hba1c') {
        dataStructure = {
                c1: {
                    low: data.hba1c_c1_low,
                    high: data.hba1c_c1_high
                },
                c2: {
                    low: data.hba1c_c2_low,
                    high: data.hba1c_c2_high,
                }
            }
    } else if (controlType === 'lipids') {
        dataStructure = {
                hdl: {
                    c1: {
                        low: data.lipids_c1_hdl_low,
                        high: data.lipids_c1_hdl_high
                    },
                    c2: {
                        low: data.lipids_c2_hdl_low,
                        high: data.lipids_c2_hdl_high,
                    }
                },
                total: {
                    c1: {
                        low: data.lipids_c1_tc_low,
                        high: data.lipids_c1_tc_high
                    },
                    c2: {
                        low: data.lipids_c2_tc_low,
                        high: data.lipids_c2_tc_high,
                    }
                },
                triglycerides: {
                    c1: {
                        low: data.lipids_c1_trig_low,
                        high: data.lipids_c1_trig_high
                    },
                    c2: {
                        low: data.lipids_c2_trig_low,
                        high: data.lipids_c2_trig_high,
                    }
                }
        }
    }

    const { error } = await supabase
    .from('calibrations')
    .update({
        lot_number: data.lot_number, 
        expiry_date: data.expiry_date, 
        calibration_ranges: dataStructure,
    })
    .eq("site_id", siteID)
    .eq("test_type", controlType)

}

export function CalibrationFormInput ({ selectedFluid }: CalibrationFormInputProps) {

    // Find out if controls exist
    const siteFormContext = useContext(SiteFormContext)
    if (siteFormContext === null) throw new Error('Error fetching the site')
    const { controls } = siteFormContext;
    const siteContext = useContext(FormContext)
    if (siteContext === null) throw new Error('Error fetching the site')
    const { site } = siteContext;
    const isUpdating = controls === undefined ? true : false;


    console.log(isUpdating) // If true add / update

    const methods = useForm();
    const { register, handleSubmit } = methods

    const onSubmit = handleSubmit((data) => {
        if (isUpdating) {
            updateControl(data, selectedFluid, site?.site_id)
        } else {
            addControls(data, selectedFluid, site?.site_id)
        }
        console.log(data)
    })

    return (
        <FormProvider {...methods}>
            <form className="bg-white p-4 rounded flex flex-col gap-2" onSubmit={onSubmit}>
                <div className="flex flex-col gap-1">
                    <label>Lot Number</label>
                    <input className="outline rounded" {...register("lot_number", {required: "Please provide a Lot Number"})}/>
                </div>
                <div className="flex flex-col gap-1">
                    <label>Expiry Date</label>
                    <input className="outline rounded" {...register("expiry_date", {required: "Please provide a expiry date"})}/>
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