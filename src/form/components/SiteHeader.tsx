import { useContext } from "react"
import FormContext from "../context/FormContext"
import SiteFormContext from "../context/SiteFormContext"
import AffinionSection from "../pages/site-page/AffinionSection"
import ControlsSection from "../pages/site-page/ControlsSection"
import AddResults from "../pages/site-page/AddResults"

export function SiteHeader ({ onSubmit }) {

    const formContext = useContext(FormContext)
    const siteFormContext = useContext(SiteFormContext)

    if (formContext === null) throw new Error('FormContext has to be used within <FormContext.Provider>')

    if (siteFormContext === null) throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')
    const { site } = formContext
    if (site === null) throw new Error('Component has been rendered without site being selected')

    const { affinions, controls } = siteFormContext

    return (
        <div className="flex flex-col gap-5 h-full">
            <p className="text-center font-bold text-3xl">{site.site_name}</p>
            <div className="flex flex-col flex-1 gap-3 ">
                    <AffinionSection affinions={affinions} onSubmit={onSubmit} />
                    <ControlsSection controls={controls} onSubmit={onSubmit}/>
                    <AddResults onSubmit={onSubmit}/>
            </div>
        </div>
    )

}
