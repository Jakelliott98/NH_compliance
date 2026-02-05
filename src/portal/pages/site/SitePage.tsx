import { useParams } from "react-router"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import fetchAfinions from "../../../services/afinions/fetchAfinions"
import SiteOverview from "./site-sub-pages/overview/SiteOverview"
import useSiteBySlug from "@/services/sites/useSiteBySlug"

export default function SitePage () {

    const siteSlug = useParams().Site
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useSiteBySlug(siteSlug)
    const { data: afinions, isError: afinionError, isLoading: afinionsLoading } = useQuery({
        queryKey: ['portalAfinions', activeSite],
        queryFn: () => {
            if (!activeSite) throw new Error('Cannot find this site')
            return fetchAfinions(activeSite.site_id)
        },
        enabled: !!activeSite,
    })

    if (siteError) return <p>Error loading site</p>;
    if (!activeSite) return <p>No site found</p>;
    if (siteLoading || afinionsLoading) return <p>Loading...</p>;
    if (afinionError) return (<p>Something went wrong...</p>)
    if (!afinions) return (<p>No afinions found</p>)

    return (
        <div className="flex flex-col bg-white p-2 md:p-5 rounded-xl my-2">
            <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4 border-b-1 border-solid border-gray-300 pb-2">
                <h1 className="text-center md:text-left font-bold md:text-xl">{activeSite.site_name}</h1>
                <div className="flex flex-row gap-10 items-center">
                    <div className="flex flex-col">
                        <p className="text-center md:text-left text-xs uppercase text-gray-500">Team Leader</p>
                        <p className="text-center text-xs md:text-sm text-center">{activeSite.team_leader}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-center md:text-left text-xs uppercase text-gray-500">Last Calibrated</p>
                        <p className="text-center text-xs md:text-sm text-center">{moment(activeSite.last_calibrated).format('Do MMM')}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-center md:text-left text-xs uppercase text-gray-500">Afinions</p>
                        <p className="text-center text-xs md:text-sm text-center">{afinions.length}</p>
                    </div>
                </div>
            </div>
            <SiteOverview />
        </div>
    )
}