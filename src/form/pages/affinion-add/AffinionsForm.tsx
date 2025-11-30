import FormContext from '@/form/context/FormContext'
import supabase from '@/utils/supabase'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

export default function AffinionsForm () {

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            <AffinionFormSection />
        </div>        
    )
}

const addAffinion = async (name: string, siteID: number, nhNumber: number) => {
    const { data, error } = await supabase
    .from('affinions')
    .insert([{
         site_id: siteID, name: name, nh_number: nhNumber, last_calibrated: null, last_clean: null,
    }]) // Add affinion ID
}

function AffinionFormSection () {

    const formContext = useContext(FormContext)
    if (formContext === null) throw new Error('FormContext has to be used within <FormContext.Provider>')
    const { site } = formContext;
    const siteID = site?.site_id;


    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = handleSubmit((data) => {
        addAffinion(data.affinion_name, siteID, data.nh_number)
    })

    return (
        <form className="p-4 bg-white flex flex-col gap-2 rounded" onSubmit={onSubmit}>
            <div className="flex flex-col">
                <label>Affinion Name</label>
                <input className="outline rounded" placeholder="Affinion 1" {...register("affinion_name", {required: "Each affinion requires a name"})}/>
                <p className='text-xs text-red-700'>{errors.affinion_name?.message}</p>
            </div>
            <div className="flex flex-col">
                <label>NH Number</label>
                <input 
                    className="outline rounded" 
                    placeholder="NH" 
                    type="number" 
                    {...register("nh_number", {
                        required: "A NH number is required",
                        valueAsNumber: true,
                    }
                )}/>
                <p className='text-xs text-red-700'>{errors.nh_number?.message}</p>
            </div>
            <button className="p-2 w-full bg-green-300 font-bold rounded cursor-pointer" type="submit">Add Affinion</button>
        </form>
    )
}