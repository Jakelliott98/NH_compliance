import { useContext } from "react";
import { useForm } from "react-hook-form";
import FormContext from "../FormContext";

export default function ResultsForm () {

        return (
        
        <div className="bg-gray-100 w-fit p-5 rounded">
            <FormHeader />
            <FormSection />
        </div>
    )
}

function FormHeader () {

    const { site } = useContext(FormContext)

    return (
        <div className="flex flex-col gap-3 py-2">
            <p className="text-center">{site.site_name}</p>
            <div className="flex gap-5 justify-between">
                <p>{site.team_leader}</p>
                <p>3 Affinions</p>
            </div>
            <div className="flex gap-5 justify-between">
                <p>HBA1c: LOT123456</p>
                <p>Lipids: LOT23456</p>
            </div>
            <p className="text-red-400 text-sm">This Affinion needs to be calibrated: Affinion 1</p>
        </div>
    )
}

function FormSection () {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={(handleSubmit(onSubmit))}>
            <input type="text" placeholder="location" {...register("location")}/>
            <button type="submit">Submit</button>
        </form>
    )
}

