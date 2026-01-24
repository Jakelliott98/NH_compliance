import CalibrationCard from "@/portal/components/CalibrationCard"
import type { AffinionDatabaseType } from "@/types/affinion"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import fetchSiteBySlug from "@/hooks/fetchSiteBySlug"
import fetchAffinions from "@/utils/fetchAffinions"
import fetchResults from "@/portal/utils/fetchResults"

export default function SiteResults () {

    const siteSlug = useParams().Site
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useQuery({
        queryKey: ['portalActiveSite', siteSlug],
        queryFn: () => {
            if (!siteSlug) throw new Error('Cannot find this site')    
            return fetchSiteBySlug(siteSlug)
        },
            enabled: !!siteSlug,
    })
    const { data: affinions, isError: affinionError, isLoading: affinionsLoading } = useQuery({
        queryKey: ['portalAffinions', activeSite],
        queryFn: () => fetchAffinions(activeSite.site_id),
        enabled: !!activeSite,
    })
    const { data: results, isError: resultError, isLoading: resultLoading } = useQuery({
        queryKey: ['portalResults', activeSite],
        queryFn: () => fetchResults(activeSite.site_id),
        enabled: !!activeSite,
    })

    if (siteError) return <p>Error loading site</p>;
    if (!activeSite) return <p>No site found</p>;
    if (siteLoading || affinionsLoading || resultLoading) return <p>Loading...</p>;
    if (affinionError) return (<p>Something went wrong...</p>)
    if (!affinions) return (<p>No affinions found</p>)
    if (resultError) return (<p>Something went wrong...</p>)
    if (!results) return (<p>No affinions found</p>)

    const sortedResults = results.sort((a, b) => new Date(b.calibration_date).getTime() - new Date(a.calibration_date).getTime())

    if (sortedResults.length === 0) {
        return (
            <div className="h-full flex flex-col justify-center items-center flex-1">
                <p className="text-sm text-red-900 text-center italics">Currently no calibrations for this site</p>
            </div>
        )
    }

    return (
            <div className="flex flex-col w-full gap-2 my-2">
                {
                    sortedResults.map(((result) => {
                        const affinion: AffinionDatabaseType | undefined = affinions.find((item: AffinionDatabaseType) => item.affinion_id === result.affinion_id)
                        return (
                            <CalibrationCard key={result.id} result={result} affinion={affinion}/>
                        )
                    }))
                }

            </div>
    )
}