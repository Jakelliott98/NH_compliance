import AfinionSection from "./components/AfinionSection"
import ControlsSection from "./components/ControlsSection"
import AddResults from "./components/AddResults"
import { useParams } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useSiteBySlug } from '@/services/sites'
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
        <div className="flex flex-col gap-3 lg:gap-6 h-full">
            <h1 className="text-center font-semibold text-2xl lg:text-3xl tracking-wide leading-snug drop-shadow-sm">
                {activeSite.site_name}
            </h1>
            <div 
                className="
                    flex-1 
                    flex flex-col gap-3 
                    lg:grid lg:grid-rows-3 lg:gap-y-2
                    [&>*]:grow
                    "
            >
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
        <div 
            className="
                w-full h-full p-6
                flexCenter flex-col gap-2
                rounded bg-surface/20 text-neutral-light
                text-lg font-medium tracking-wide
                border border-neutral-light/20 shadow-sm
                
            " 
        >        
            <FontAwesomeIcon className="text-3xl text-neutral-light opacity-40" icon={faPlus} />
            <h1 className="text-xl font-bold text-neutral-light opacity-40">Add Calibration</h1>
            <p className="text-center text-xs md:text-sm text-warning italic opacity-100"> Add Afinion & Controls to add calibration results </p>
        </div>
    )
}