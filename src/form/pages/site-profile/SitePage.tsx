import AffinionSection from "./components/AffinionSection"
import ControlsSection from "./components/ControlsSection"
import AddResults from "./components/AddResults"
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import fetchSiteBySlug from "../../utils/fetchSiteBySlug"
import fetchAffinions from "../../utils/fetchAffinions"
import fetchCalibrations from "../../utils/fetchControls"


export function SitePage () {

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
    const { data: affinions, isError: affinionsError, isLoading: affinionsLoading} = useQuery({
        queryKey: ['affinions', activeSite], 
        queryFn: () => fetchAffinions(activeSite.site_id),
        enabled: !!activeSite,
    })
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => fetchCalibrations(activeSite.site_id),
        enabled: !!activeSite,
    })

    if ( siteError || affinionsError || controlsError) throw new Error('Could not fetch Active Site, Controls or Affinions')
    if ( siteLoading || affinionsLoading || controlsLoading ) return (<p>Loading...</p>)

    return (
        <div className="flex flex-col gap-5 h-full">
            <p className="text-center font-bold text-3xl">{activeSite.site_name}</p>
            <div className="flex flex-col flex-1 gap-3 ">
                    <AffinionSection affinions={affinions} />
                    <ControlsSection controls={controls} />
                    <AddResults />
            </div>
        </div>
    )

}
