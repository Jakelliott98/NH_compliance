import CalibrationCard from "../../../../components/calibration-card/CalibrationCard"
import { useState, useEffect } from "react"
import supabase from "../../../../utility/supabase"
import { useOutletContext } from "react-router"

export default function SiteResults () {

    const [results, setResults] = useState({
        data: [],
        loading: true,
        error: false,
    })
    const siteID = useOutletContext()

    useEffect(() => {
        const fetchResults = async () => {
            const { data } = await supabase
            .from('results')
            .select('*')
            .eq('site_id', siteID)
            setResults({
                data: data,
                loading: false,
                error: false,
            })
        }
        fetchResults()

    }, [siteID])

    return (
            <div className="flex flex-col w-full gap-2 my-2">
                {
                    !results.loading && results.data.map(((result) => {
                        return (
                            <CalibrationCard key={result.id} date={result.created_at} result={result}/>
                        )
                    }))
                }

            </div>
    )
}