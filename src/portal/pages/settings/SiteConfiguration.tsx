import SiteSearch from "@/form/pages/site-search/SiteSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import fetchAllSites from "@/utils/fetchAllSites";
import { useQuery } from "@tanstack/react-query";
import type { SiteDatabaseType } from "@/types/site";
import { useState } from "react";

export default function SiteConfiguration () {
    
    const [activeSite, setActiveSite] = useState('')

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
                        <div className="grid grid-cols-4 p-2 text-center">
                            <p>1</p>
                            <p>1234567</p>
                            <p>12-12-2026</p>
                            <p><FontAwesomeIcon icon={faTrashCan} className="text-gray-400"/></p>
                        </div>
                    </div>
                </div>
            </div>
    )
}
