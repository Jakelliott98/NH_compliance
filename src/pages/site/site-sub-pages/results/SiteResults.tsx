import CalibrationCard from "../../../../components/calibration-card/CalibrationCard"
import { useState, useEffect } from "react"
import supabase from "../../../../utility/supabase"
import { useOutletContext } from "react-router"
import type { AffinionCardType } from "../../../../types/affinion"

export default function SiteResults () {

    const [results, setResults] = useState({
        data: [],
        loading: true,
        error: false,
    })

    const {siteID, affinions}: {siteID: number, affinions: Array<AffinionCardType>} = useOutletContext()

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

    console.log(affinions)

    return (
            <div className="flex flex-col w-full gap-2 my-2">
                {
                    !results.loading && results.data.map(((result) => {
                        const affinion: AffinionCardType | undefined = affinions.find((item: AffinionCardType) => item.affinion_id === result.affinion_id)
                        return (
                            <CalibrationCard key={result.id} result={result} affinion={affinion}/>
                        )
                    }))
                }

            </div>
    )
}