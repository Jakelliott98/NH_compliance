import { useNavigate } from "react-router"
import { useState } from "react"
import fetchAllSites from "@/utils/fetchAllSites"
import SiteSearch from "./SiteSearch"
import { useQuery } from "@tanstack/react-query"
import type { SiteDatabaseType } from "@/types/site"

export default function SiteSearchContainer () {

    const [activeSite, setActiveSite] = useState('')
    const navigate = useNavigate();

    const { data, isError, isLoading, error, isSuccess } = useQuery<SiteDatabaseType[]>({
        queryKey: ['allSites'], 
        queryFn: fetchAllSites
    })
    
    if (isError) throw error;
    if (isLoading) return (<p>Loading...</p>)

    const onSubmit = () => {
        navigate(`Sites/${activeSite}`)
    }

    if (isSuccess) {

    return (
        <div className="bg-gray-300 rounded p-4 flex justify-center items-center flex-col w-fit gap-2">
            <p>What site would you like to visit?</p>
            <div className="flex justify-center items-center w-full gap-2">
                <SiteSearch sites={data} setActiveSite={setActiveSite}/>
                <button onClick={() => {onSubmit()}} className="py-1 px-3 bg-gray-300 rounded-lg cursor-pointer">Go</button>
            </div>
         </div>
    )
    
    }
}

