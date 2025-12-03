import { useContext } from "react"
import SiteFormContext from "../context/SiteFormContext"
import AffinionSection from "../pages/site-page/AffinionSection"
import ControlsSection from "../pages/site-page/ControlsSection"
import AddResults from "../pages/site-page/AddResults"
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import fetchSiteBySlug from "../utils/fetchSiteBySlug"

export function SitePage ({ onSubmit }) {

    const siteSlug = useParams().Site;

    const siteFormContext = useContext(SiteFormContext)

    const { data, isError, isLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
    
    if ( isError ) throw new Error('Could not fetch active site')
    if ( isLoading ) return (<p>Loading...</p>)


    if (siteFormContext === null) throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')

    const { affinions, controls } = siteFormContext

    return (
        <div className="flex flex-col gap-5 h-full">
            <p className="text-center font-bold text-3xl">{data.site_name}</p>
            <div className="flex flex-col flex-1 gap-3 ">
                    <AffinionSection affinions={affinions} onSubmit={onSubmit} />
                    <ControlsSection controls={controls} onSubmit={onSubmit}/>
                    <AddResults onSubmit={onSubmit}/>
            </div>
        </div>
    )

}
