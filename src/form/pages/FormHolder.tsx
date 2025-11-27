import SiteFormContext from "@/components/context/SiteFormContext"
import { Outlet } from "react-router"
import useFetchData from "@/components/custom-hooks/useFetchData"
import { useContext } from "react"
import FormContext from "../../components/context/FormContext"
import type { AffinionCardType } from "@/types/affinion"
import type { CalibrationType } from "@/types/calibration"

export default function FormHolder () {

    const context = useContext(FormContext)

    if (context === null) throw new Error('Error fetching the site')
    const { site } = context;
    if (site === null) throw new Error('Component rendered without site being selected')

    const affinions = useFetchData<AffinionCardType>(site.site_id, 'affinions')
    const controls = useFetchData<CalibrationType>(site.site_id, 'calibrations')

    return (
        <SiteFormContext.Provider value={{ affinions, controls }}>
            <Outlet />
        </SiteFormContext.Provider>
    )
}