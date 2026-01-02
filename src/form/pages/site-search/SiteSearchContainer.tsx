import { useNavigate } from "react-router"
import { useState } from "react"
import fetchAllSites from "@/utils/fetchAllSites"
import SiteSearch from "./SiteSearch"
import { useQuery } from "@tanstack/react-query"
import type { SiteDatabaseType } from "@/types/site"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"

export default function SiteSearchContainer () {

    const [activeSite, setActiveSite] = useState('')
    const navigate = useNavigate();

    const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useQuery<SiteDatabaseType[]>({
        queryKey: ['allSites'], 
        queryFn: () => fetchAllSites(),
    })
    
    if (isAllSitesError) throw allSitesError;
    if (isAllSitesLoading) return (<p>Loading...</p>)
    if (allSites === undefined || allSites === null) throw allSitesError

    const onSubmit = () => {
        navigate(`Sites/${activeSite}`)
    }

    return (
        <div className="rounded p-4 flex justify-center items-center flex-col w-3/12 h-3/12 gap-2">
            <div className="w-full">
            <SiteSearch sites={allSites} setActiveSite={setActiveSite}/>
            </div>
            {
                activeSite !== '' && (
                    <button onClick={() => {onSubmit()}} className=" py-1 px-3 bg-gray-200 rounded-lg cursor-pointer w-full">
                        <span className="uppercase font-semibold pr-2">Go</span>
                        <FontAwesomeIcon icon={faArrowRightLong} className="font-bold"/>
                    </button>
                ) 
            }
            
         </div>
    )

}

/*
<button onClick={() => {onSubmit()}} className="py-1 px-3 bg-gray-300 rounded-lg cursor-pointer">Go</button>
*/

