import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import supabase from "../../../utils/supabase"
import SiteSearch from "./SiteSearch"

export default function SiteForm () {

    const [allSites, setAllSites] = useState([])
    const [activeSite, setActiveSite] = useState('')
    const navigate = useNavigate();
    
    useEffect(() => {
        
        const fetchSites = async () => {
            const { data } = await supabase
            .from('sites')
            .select('*')
            setAllSites(data)
        }

        fetchSites()

    }, [])

    const onSubmit = () => {
        navigate(`Sites/${activeSite}`)
    }

    return (
        <div className="bg-gray-300 rounded p-4 flex justify-center items-center flex-col w-fit gap-2">
            <p>What site would you like to visit?</p>
            <div className="flex justify-center items-center w-full gap-2">
                <SiteSearch sites={allSites} setActiveSite={setActiveSite}/>
                <button onClick={() => {onSubmit()}} className="py-1 px-3 bg-gray-300 rounded-lg cursor-pointer">Go</button>
            </div>
         </div>
    )
}