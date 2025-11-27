import { useContext } from "react"
import FormContext from "@/form/FormContext"
import SiteFormContext from "@/components/context/SiteFormContext"
import type { CalibrationType } from "@/types/calibration"
import type { FetchState } from "@/components/custom-hooks/useFetchData"

export default function FormHeader () {


    const formContext = useContext(FormContext)
    const siteFormContext = useContext(SiteFormContext)

    if (formContext === null) {
        throw new Error('FormContext has to be used within <FormContext.Provider>')
    }

    if (siteFormContext === null) {
        throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')
    }

    const { site } = formContext
    const { affinions, controls } = siteFormContext

    return (
        <div className="flex flex-col gap-3 py-2 w-fit">
            <p className="text-center font-bold">{site.site_name}</p>
            <div className="flex gap-5 justify-between">
                <p>{site.team_leader}</p>
                <p>{affinions.data.length} Affinions</p>
            </div>
            <div className="flex gap-5 justify-between items-center">
                <ReturnControlSection title='Lipids' controlsData={controls} controlType='lipids'/>
                <ReturnControlSection title='HBA1c' controlsData={controls} controlType='hba1c'/>
            </div>
            <p className="text-red-400 text-sm text-center">This Affinion needs to be calibrated: Affinion 1</p>
        </div>
    )
}

function Loading () {
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

interface ReturnControlSectionProps {
    controlType: string,
    controlsData: FetchState<CalibrationType>,
    title: string,
}

export function ReturnControlSection ({controlType, controlsData, title}: ReturnControlSectionProps) {
    
    const control = controlsData.data.find((item: CalibrationType) => { return item.test_type === controlType})
    
    if (controlsData.loading) {
        return (
            <Loading />
        )
    } else if (control === undefined) {
        return (
            <p className="text-red-700 text-sm">No {title} control</p>
        )
    } else {
        return (
            <p>{title}: LOT{control.lot_number}</p>
        )
    }

}