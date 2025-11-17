import { useOutletContext } from "react-router"
import { useState, useEffect } from "react"
import supabase from "../../../../../utility/supabase"
import AffinionCard from "./AffinionCard"

export default function AffinionSection () {

    const siteID = useOutletContext()
    const [affinions, setAffinions] = useState({
        data: [],
        loading: true,
        error: false,
    })

    useEffect(() => {

        const getAffinions = async () => {
            const { data } = await supabase
            .from('affinions')
            .select('*')
            .eq('site_id', siteID)
            setAffinions({
                data: data, 
                loading: false,
                error: false,
                })
        }
        getAffinions()
    }, [siteID])

    return (
        <div className='flex-1 flex flex-col gap-3 p-3'>
            <p className='font-medium text-lg'>Affinions</p>
            <div className="flex gap-8">
                {
                    affinions.data.map((item) => {
                        return (
                            <AffinionCard key={item.id} affinion={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}