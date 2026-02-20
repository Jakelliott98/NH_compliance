import CalibrationCard from "@/portal/components/CalibrationCard"
import type { AfinionDatabaseType } from "@/types/afinion"
import { useParams } from "react-router"
import { useResults } from "@/services/results"
import { useSiteBySlug } from '@/services/sites'
import { useAfinions } from "@/services/afinions"

export default function SiteResults () {

    const siteSlug = useParams().Site
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useSiteBySlug(siteSlug)
    const { data: afinions, isError: afinionError, isLoading: afinionsLoading } = useAfinions(activeSite)
    const { data: results, isError: resultError, isLoading: resultLoading } = useResults(activeSite)
    
    if (!activeSite) return <p>No site found</p>;
    if (siteError) return <p>Error loading site</p>;
    if (siteLoading || afinionsLoading || resultLoading) return <p>Loading...</p>;
    if (afinionError) return (<p>Something went wrong...</p>)
    if (!afinions) return (<p>No afinions found</p>)
    if (resultError) return (<p>Something went wrong...</p>)
    if (!results) return (<p>No afinions found</p>)

    const sortedResults = results.sort((a, b) => new Date(b.calibration_date).getTime() - new Date(a.calibration_date).getTime())

    if (sortedResults.length === 0) {
        return (
            <div className="h-full flex flex-col justify-center items-center flex-1">
                <p className="text-sm text-warning text-center italics">Currently no calibrations for this site</p>
            </div>
        )
    }

    return (
            <div className="flex flex-col w-full gap-2 my-2">
                {
                    sortedResults.map(((result) => {
                        const afinion: AfinionDatabaseType | undefined = afinions.find((item: AfinionDatabaseType) => item.afinion_id === result.afinion_id)
                        if (!afinion) return;
                        return (
                            <CalibrationCard key={result.id} result={result} afinion={afinion}/>
                        )
                    }))
                }

            </div>
    )
}