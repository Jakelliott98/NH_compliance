import { useContext } from "react"
import FormContext from "@/form/FormContext"
import { useForm } from 'react-hook-form'

export default function AffinionsForm () {

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            <AffinionsHeader />
            <AffinionFormSection />
        </div>        
    )
}

function AffinionsHeader () {

    const context = useContext(FormContext)
    const { site } = useContext(FormContext)

    return (
        <div className="flex flex-col gap-3 py-2 w-fit">
            <p className="text-center font-bold">{site.site_name}</p>
            <div className="flex gap-5 justify-between">
                <p>{site.team_leader}</p>
                <p>3 Affinions</p>
            </div>
        </div> 
    )
}

function AffinionFormSection () {

    const { register, handleSubmit } = useForm()

    const onSubmit = handleSubmit((data) => {console.log(data)})

    return (
        <form className="p-4 bg-white flex flex-col gap-2 rounded" onSubmit={onSubmit}>
            <div className="flex flex-col">
                <label>Affinion Name</label>
                <input className="outline rounded" placeholder="Affinion 1" {...register("affinion_name")}/>
            </div>
            <div className="flex flex-col">
                <label>NH Number</label>
                <input className="outline rounded" placeholder="NH" {...register("nh_number")}/>
            </div>
            <button className="p-2 w-full bg-green-300 font-bold rounded cursor-pointer" type="submit">Add Affinion</button>
        </form>
    )
}