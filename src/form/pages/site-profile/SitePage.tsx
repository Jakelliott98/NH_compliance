import AfinionSection from "./components/AfinionSection"
import ControlsSection from "./components/ControlsSection"
import AddResults from "./components/AddResults"
import { useParams } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import useSiteBySlug from "@/services/sites/useSiteBySlug"
import { useControls } from "@/services/controls/queries"
import { useAfinions } from "@/services/afinions"

export function SitePage () {

    const siteSlug = useParams().Site;
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useSiteBySlug(siteSlug)
    const { data: afinions, isError: afinionsError, isLoading: afinionsLoading} = useAfinions(activeSite)
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useControls(activeSite)

    if ( siteError || afinionsError || controlsError) throw new Error('Could not fetch Active Site, Controls or Afinions')
    if ( siteLoading || afinionsLoading || controlsLoading ) return (<p>Loading...</p>)
    if (!activeSite || !afinions || !controls) return (<p>ERROR: Cannot find the current site or Controls / Afinions</p>)

    return (
        <div className="flex flex-col lg:gap-5 h-full">
            <h1 className="text-center font-semibold text-xl lg:text-2xl tracking-wide leading-relaxed">{activeSite.site_name}</h1>
            <div className="flex-1 flex flex-col gap-4 [&>*]:grow lg:grid lg:grid-rows-3 lg:gap-y-2">
                    <AfinionSection afinions={afinions} />
                    <ControlsSection controls={controls} />
                    {
                        controls.length === 0 || afinions.length === 0 ? <DisabledAddResults /> : <AddResults />
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