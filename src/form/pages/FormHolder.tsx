import SiteFormContext from "@/components/context/SiteFormContext"
import { Outlet } from "react-router"
import useFetchData from "@/components/custom-hooks/useFetchData"
import { useContext } from "react"
import FormContext from "../FormContext"

export default function FormHolder () {

    const { site } = useContext(FormContext)
    const affinions = useFetchData(site.site_id, 'affinions')
    const controls = useFetchData(site.site_id, 'calibrations')

    return (
        <SiteFormContext.Provider value={{ affinions, controls }}>
                <Outlet />
        </SiteFormContext.Provider>
    )
}