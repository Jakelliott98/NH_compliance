import { useNavigate } from "react-router"
import { useState } from "react"
import SiteSearch from "./SiteSearch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import { useAllSites } from "@/services/sites"

export default function SiteSearchContainer () {

    const [activeSite, setActiveSite] = useState()
    const navigate = useNavigate();

    const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useAllSites()
    
    if (isAllSitesError) throw allSitesError;
    if (isAllSitesLoading) return (<p>Loading...</p>)
    if (allSites === undefined || allSites === null) throw allSitesError

    const onSubmit = () => {
        navigate(`Sites/${activeSite.slug}`)
    }

    return (
        <div className="w-2/3 lg:w-1/4 flex justify-center items-center flex-col gap-5 h-3/12">
            <div className="w-full">
                <SiteSearch sites={allSites} setActiveSite={setActiveSite}/>
            </div>
            {
                activeSite !== '' && (
                    <button onClick={() => {onSubmit()}} className=" py-2 px-3 bg-gray-200 rounded-lg cursor-pointer w-full">
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

