import SiteSearch from "@/form/pages/site-search/SiteSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import fetchAllSites from "@/utils/fetchAllSites";
import { useQuery } from "@tanstack/react-query";
import type { SiteDatabaseType } from "@/types/site";
import { useState } from "react";

export default function HandleSiteInformation () {
    
    const [activeSite, setActiveSite] = useState('')

    const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useQuery<SiteDatabaseType[]>({
        queryKey: ['allSites'], 
        queryFn: () => fetchAllSites(),
    })
    
    if (isAllSitesError) throw allSitesError;
    if (isAllSitesLoading) return (<p>Loading...</p>)
    if (allSites === undefined || allSites === null) throw allSitesError


    return (
            <div className="p-2 border-b-2 border-solid border-gray-200 w-full">
                <p className="font-bold">Handle Site Information</p>
                <div className="flex">
                    <div className="w-4/12">
                        <SiteSearch sites={allSites} setActiveSite={setActiveSite}/>
                    </div>
                    <div className="flex">
                        <button className="text-sm py-1 px-2 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <p>Edit Affinion</p>
                        </button>
                        <button className="text-sm py-1 px-2 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <p>Edit Control</p>
                        </button>
                    </div>
                </div>
            </div>
    )
}