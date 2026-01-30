import AffinionSection from "./components/AffinionSection"
import ControlsSection from "./components/ControlsSection"
import AddResults from "./components/AddResults"
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import fetchSiteBySlug from "../../../utils/fetchSiteBySlug"
import fetchAffinions from "../../../utils/fetchAffinions"
import fetchCalibrations from "../../../utils/fetchControls"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"


export function SitePage () {

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({
        queryKey: ['activeSite', siteSlug], 
        queryFn: () => {
            if (!siteSlug) throw new Error('Cannot find this site')
            return fetchSiteBySlug(siteSlug)
        }
    })
    const { data: affinions, isError: affinionsError, isLoading: affinionsLoading} = useQuery({
        queryKey: ['affinions', activeSite], 
        queryFn: () => {
            if (!activeSite) throw new Error('Cannot find this site')
            return fetchAffinions(activeSite.site_id)
        },
        enabled: !!activeSite,
    })
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => {
            if (!activeSite) throw new Error('Cannot find this site')
            return fetchCalibrations(activeSite.site_id)
        },
        enabled: !!activeSite,
    })

    if ( siteError || affinionsError || controlsError) throw new Error('Could not fetch Active Site, Controls or Affinions')
    if ( siteLoading || affinionsLoading || controlsLoading ) return (<p>Loading...</p>)
    if (!activeSite || !affinions || !controls) return (<p>ERROR: Cannot find the current site or Controls / Affinions</p>)

    return (
        <div className="flex flex-col lg:gap-5 h-full">
            <h1 className="text-center font-semibold text-xl lg:text-2xl tracking-wide leading-relaxed">{activeSite.site_name}</h1>
            <div className="flex-1 flex flex-col gap-4 [&>*]:grow lg:grid lg:grid-rows-3 lg:gap-y-2">
                    <AffinionSection affinions={affinions} />
                    <ControlsSection controls={controls} />
                    {
                        controls.length === 0 || affinions.length === 0 ? <DisabledAddResults /> : <AddResults />
                    }
                    
            </div>
        </div>
    )

}

function DisabledAddResults () {

    return (
        <div className="bg-gray-200 rounded p-5 cursor-pointer flex flex-col justify-center items-center gap-1 shadow-md" >        
            <FontAwesomeIcon className="text-3xl text-gray-300" icon={faPlus} />
            <h1 className="text-xl font-bold text-gray-300">Add Results</h1>
            <p className="text-center text-xs md:text-sm text-red-500 italic"> Add an Afinion & Controls to add calibration results </p>
        </div>
    )
}