import { useContext } from "react"
import FormContext from "@/form/FormContext"
import SiteFormContext from "@/components/context/SiteFormContext"

export default function FormHeader () {

    const { site } = useContext(FormContext)
    const { affinions, controls } = useContext(SiteFormContext)

    const lipidControl = controls.loading ? '' : controls.data.find(item => item.test_type === 'lipids')
    const hba1cControl = controls.loading ? '' : controls.data.find(item => item.test_type === 'hba1c')

    return (
        <div className="flex flex-col gap-3 py-2 w-fit">
            <p className="text-center font-bold">{site.site_name}</p>
            <div className="flex gap-5 justify-between">
                <p>{site.team_leader}</p>
                <p>{affinions.data.length} Affinions</p>
            </div>
            <div className="flex gap-5 justify-between">
                <p>HBA1c: {hba1cControl.lot_number}</p>
                <p>Lipids: {lipidControl.lot_number}</p>
            </div>
            <p className="text-red-400 text-sm text-center">This Affinion needs to be calibrated: Affinion 1</p>
        </div>
    )
}