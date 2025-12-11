import { Outlet } from "react-router"
import { useParams } from "react-router"
import { NavLink } from "react-router"
import moment from "moment"
import { useQuery } from "@tanstack/react-query"
import fetchSiteBySlug from "../../../utils/fetchSiteBySlug"
import fetchAffinions from "../../../utils/fetchAffinions"

export default function SitePage () {

    const siteSlug = useParams().Site
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useQuery({
        queryKey: ['portalActiveSite', siteSlug],
        queryFn: () => fetchSiteBySlug(siteSlug),
            enabled: !!siteSlug,
    })
    const { data: affinions, isError: affinionError, isLoading: affinionsLoading } = useQuery({
        queryKey: ['portalAffinions', activeSite],
        queryFn: () => fetchAffinions(activeSite.site_id),
        enabled: !!activeSite,
    })

    if (siteError) return <p>Error loading site</p>;
    if (!activeSite) return <p>No site found</p>;
    if (siteLoading || affinionsLoading) return <p>Loading...</p>;
    if (affinionError) return (<p>Something went wrong...</p>)
    if (!affinions) return (<p>No affinions found</p>)

    return (
        <div className="flex flex-col bg-white p-5 rounded-xl my-2">
            <div className="flex flex-col gap-4 border-b-1 border-solid border-gray-300 pb-2">
                <h1 className="font-bold text-xl">{activeSite.site_name}</h1>
                <div className="flex flex-row gap-10">
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">Team Leader</p>
                        <p className="text-sm">{activeSite.team_leader}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">Last Calibrated</p>
                        <p className="text-sm">{moment(activeSite.last_calibrated).format('dddd Do MMM')}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">Affinions</p>
                        <p className="text-sm">{affinions.length}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <NavLink to="Overview" className={({isActive}) => {return isActive ? 'text-blue-500' : 'text-gray-500'}}><p className="text-sm">Overview</p></NavLink>
                    <NavLink to="Results" className={({isActive}) => {return isActive ? 'text-blue-500' : 'text-gray-500'}}><p className="text-sm">Results</p></NavLink>
                    <NavLink to="Calibration" className={({isActive}) => {return isActive ? 'text-blue-500' : 'text-gray-500'}}><p className="text-sm">Calibrations</p></NavLink>
                </div>
            </div>
            <Outlet context={{siteID: activeSite.site_id, affinions: affinions}} />
        </div>
    )
}