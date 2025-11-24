import { useContext } from "react"
import FormContext from "@/form/FormContext"

export default function FormHeader () {

    const { site } = useContext(FormContext)

    return (
        <div className="flex flex-col gap-3 py-2 w-fit">
            <p className="text-center font-bold">{site.site_name}</p>
            <div className="flex gap-5 justify-between">
                <p>{site.team_leader}</p>
                <p>3 Affinions</p>
            </div>
            <div className="flex gap-5 justify-between">
                <p>HBA1c: LOT123456</p>
                <p>Lipids: LOT23456</p>
            </div>
            <p className="text-red-400 text-sm text-center">This Affinion needs to be calibrated: Affinion 1</p>
        </div>
    )
}