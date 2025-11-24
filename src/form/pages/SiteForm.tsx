import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import supabase from "../../utility/supabase"
import SiteSearch from "./SiteSearch"

export default function SiteForm () {

    const [allSites, setAllSites] = useState([])
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
        navigate("Options")
    }

    return (
        <>
            <p>What site would you like to visit?</p>
            <SiteSearch sites={allSites}/>
            <button onClick={() => {onSubmit()}} className="py-1 px-3 bg-gray-300 rounded-xl cursor-pointer">Go</button>
         </>
    )
}