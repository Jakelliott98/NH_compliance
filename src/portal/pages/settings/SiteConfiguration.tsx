import SiteSearch from "@/form/pages/site-search/SiteSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHandshakeSlash } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import type { SiteDatabaseType } from "@/types/site";
import { useState } from "react";
import type { AfinionDatabaseType } from "@/types/afinion";
import fetchAfinions from "@/services/afinions/fetchAfinions";
import { useNavigate } from "react-router";
import moment from "moment";
import useAllSites from "@/services/sites/useAllSites";

export default function SiteConfiguration () {
    
    const [activeSite, setActiveSite] = useState()

    const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useAllSites()

    if (isAllSitesError) throw allSitesError;
    if (isAllSitesLoading) return (<p>Loading...</p>)
    if (allSites === undefined || allSites === null) throw allSitesError

    return (
            <div className="py-4">
                <div className="flex-1 border-b border-gray-200 pb-2">
                    <p className="font-semibold">Site Configuration</p>
                    <p className="sm-hidden-block text-sm text-gray-400">Select an individual site to manage its Afinion machines. Edit machine details, update records, or remove machines that are no longer in use.</p>
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
                    activeSite && (<EditAfinionsSection activeSite={activeSite}/>)
                }
            </div>
    )
}

interface EditAfinionsSectionProps {
    activeSite: SiteDatabaseType,
}

function EditAfinionsSection ({activeSite}: EditAfinionsSectionProps) {

    const navigate = useNavigate();
    const { data: afinions, isError: isAfinionsError, isLoading: isAfinionsLoading, error: afinionsError } = useQuery<AfinionDatabaseType[]>({
        queryKey:['siteAfinion', activeSite],
        queryFn: () => fetchAfinions(activeSite.site_id),
    })

    if (isAfinionsError) throw afinionsError
    if ( isAfinionsLoading) return (<p>Loading...</p>)
    if (afinions === undefined || afinions === null) throw afinionsError

    const sortedAfinions = afinions.sort((a, b) => a.afinion_number - b.afinion_number)

    if (afinions.length > 0) {
    return (
        <div className="py-2 border-b border-gray-200">
            <div>
                <h2 className="font-semibold text-sm">Edit Afinion</h2>
                <p className="text-sm text-gray-400">Edit the sites afinions</p>
            </div>
            <div className="pt-2">
                <div className="grid grid-cols-4 text-sm text-gray-600 bg-gray-200 p-2 text-center">
                    <p>Afinion Number</p>
                    <p className="sm-hidden-block">NH Number</p>
                    <p>Last Clean</p>
                    <></>
                </div>
                {
                    sortedAfinions.map((afinion: AfinionDatabaseType) => {
                        return (
                            <div className="grid grid-cols-4 p-2 text-center border-b borger-gray-100 text-sm md:text-base" key={afinion.afinion_id}>
                                <p>{afinion.afinion_number}</p>
                                <p className="sm-hidden-block">{afinion.nh_number}</p>
                                <p className={afinion.last_clean ? '' : 'text-red-500/80 italic'} >{afinion.last_clean ? moment(afinion.last_clean).format('Do MMM') : 'No Cleans'}</p>
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
                <h2 className="font-semibold text-xl text-gray-700">Oops! No afinions can be found...</h2>
                <p className="text sm text-gray-500">There is nothing here to view right now, please add afinions to your site to see data.</p>
                <button onClick={() => {navigate(`../../../SiteForm/Sites/${activeSite.slug}`)}} className="bg-gray-700 text-white py-2 px-5 font-semibold rounded-md cursor-pointer mt-2 hover:bg-gray-800 ">Add Afinion</button>
            </div>
        )
    }
}