import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { useContext, useEffect, useState } from "react"
import supabase from "../../utility/supabase"
import FormContext from "../FormContext"

export default function SiteForm () {

    const { register, handleSubmit } = useForm()
    const {setSite} = useContext(FormContext)
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

    const onSubmit = (data) => {
        const newSite = allSites.find((site) => {return site.site_name === data.site_location})
        setSite(newSite)
        navigate("Options")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>What site are you looking for?</p>
            <input placeholder="What site are you looking for?" type="text" {...register("site_location")}/>
            <button type='submit'>Search</button>
        </form>
    )
}