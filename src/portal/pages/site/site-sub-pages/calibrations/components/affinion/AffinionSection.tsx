import AffinionCard from "./AffinionCard"
import { useParams } from "react-router"
import fetchSiteBySlug from "@/hooks/fetchSiteBySlug"
import fetchAffinions from "@/utils/fetchAffinions"
import { useQuery } from "@tanstack/react-query"

export default function AffinionSection () {

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

    if (siteError) return <p>Error loading site</p>;
    if (!activeSite) return <p>No site found</p>;
    if (siteLoading || affinionsLoading ) return <p>Loading...</p>;
    if (affinionError) return (<p>Something went wrong...</p>)
    if (!affinions) return (<p>No affinions found</p>)

    return (
        <div className='flex-1 flex flex-col gap-3 p-3'>
            <div className="flex gap-8">
                {
                    affinions.map((affinion) => {
                        return (
                            <AffinionCard key={affinion.affinion_id} affinion={affinion}/>
                        )
                    })
                }
            </div>
        </div>
    )
}