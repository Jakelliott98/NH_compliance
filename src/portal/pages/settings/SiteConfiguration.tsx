import SiteSearch from "@/form/pages/site-search/SiteSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHandshakeSlash } from "@fortawesome/free-solid-svg-icons";
import fetchAllSites from "@/utils/fetchAllSites";
import { useQuery } from "@tanstack/react-query";
import type { SiteDatabaseType } from "@/types/site";
import { useState } from "react";
import type { AffinionDatabaseType } from "@/types/affinion";
import fetchAffinions from "@/utils/fetchAffinions";
import { useNavigate } from "react-router";

export default function SiteConfiguration () {
    
    const [activeSite, setActiveSite] = useState()

    const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useQuery<SiteDatabaseType[]>({
        queryKey: ['allSites'], 
        queryFn: () => fetchAllSites(),
    })

    if (isAllSitesError) throw allSitesError;
    if (isAllSitesLoading) return (<p>Loading...</p>)
    if (allSites === undefined || allSites === null) throw allSitesError

    return (
            <div className="py-4">
                <div className="flex-1 border-b border-gray-200 pb-2">
                    <p className="font-semibold">Site Configuration</p>
                    <p className="text-sm text-gray-400">Select an individual site to manage its Affinion machines. Edit machine details, update records, or remove machines that are no longer in use.</p>
                </div>
                <div className="py-2 border-b border-gray-200">
                    <div>
                        <h2 className="font-semibold text-sm">Find site</h2>
                        <p className="text-sm text-gray-400">Find the site you want to edit</p>
                    </div>
                    <div className="pt-2">
                        <SiteSearch sites={allSites} setActiveSite={setActiveSite}/>
                    </div>
                </div>
                {
                    activeSite && (<EditAffinionsSection activeSite={activeSite}/>)
                }
            </div>
    )
}

interface EditAffinionsSectionProps {
    activeSite: SiteDatabaseType,
}

function EditAffinionsSection ({activeSite}: EditAffinionsSectionProps) {

    const navigate = useNavigate();
    const { data: affinions, isError: isAffinionsError, isLoading: isAffinionsLoading, error: affinionsError } = useQuery<AffinionDatabaseType[]>({
        queryKey:['siteAffinion', activeSite],
        queryFn: () => fetchAffinions(activeSite.site_id),
    })

    if (isAffinionsError) throw affinionsError
    if ( isAffinionsLoading) return (<p>Loading...</p>)
    if (affinions === undefined || affinions === null) throw affinionsError

    const sortedAffinions = affinions.sort((a, b) => a.affinion_number - b.affinion_number)

    if (affinions.length > 0) {
    return (
        <div className="py-2 border-b border-gray-200">
            <div>
                <h2 className="font-semibold text-sm">Edit Affinion</h2>
                <p className="text-sm text-gray-400">Edit the sites affinions</p>
            </div>
            <div className="pt-2">
                <div className="grid grid-cols-4 text-sm text-gray-600 bg-gray-200 p-2 text-center">
                    <p>Affinion Number</p>
                    <p>NH Number</p>
                    <p>Last Clean</p>
                    <></>
                </div>
                {
                    sortedAffinions.map((affinion: AffinionDatabaseType) => {
                        return (
                            <div className="grid grid-cols-4 p-2 text-center border-b borger-gray-100" key={affinion.affinion_id}>
                                <p>{affinion.affinion_number}</p>
                                <p>{affinion.nh_number}</p>
                                <p>12-12-2026</p>
                                <p><FontAwesomeIcon icon={faTrashCan} className="text-gray-400"/></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )} else {
        
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-2">
                <FontAwesomeIcon icon={faHandshakeSlash} className="text-5xl text-gray-400"/>
                <h2 className="font-semibold text-xl text-gray-700">Oops! No affinions can be found...</h2>
                <p className="text sm text-gray-500">There is nothing here to view right now, please add affinions to your site to see data.</p>
                <button onClick={() => {navigate(`../../../SiteForm/Sites/${activeSite.slug}`)}} className="bg-gray-700 text-white py-2 px-5 font-semibold rounded-md cursor-pointer mt-2 hover:bg-gray-800 ">Add Affinion</button>
            </div>
        )
    }
}