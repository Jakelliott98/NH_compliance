import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@tanstack/react-query"
import fetchAllSites from "@/utils/fetchAllSites"
import type { SiteDatabaseType } from "@/types/site"
import moment from "moment"
import EditSiteContainer from "./EditSite"
import DeleteSiteContainer from "./DeleteSite"

export default function OrganiseSites () {

    const { data: allSites, isLoading: isAllSitesLoading, isError: isAllSitesError, error: allSitesError } = useQuery<SiteDatabaseType[]>({
        queryKey:['allSites'], 
        queryFn: () => fetchAllSites()
    })
    if (isAllSitesLoading) (<p>Loading...</p>)
    if (isAllSitesError) throw allSitesError
    if (allSites === null || allSites === undefined) return (<p>'All Sites could not be fetched'</p>)

    const sevenDaysAgo = moment().subtract(7, 'days');

    return (
        <div className="py-4 border-b-2 border-solid border-gray-200 flex gap-4">
            <div className="flex-1 ">
                <p className="font-semibold">Organisation & Sites</p>
                <p className="text-sm text-gray-600">Manage all sites within the organisation, including adding or removing sites and assigning site managers. Changes made here affect how data is grouped and reported across the system.</p>
            </div>
            <table className="flex-3">
                <thead>
                    <tr className="[&>*]:pb-1">
                        <th className="text-start">Site</th>
                        <th className="text-start">Team Leader</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className="">
                    {
                        allSites.map((site) => {
                            const isOutOfCalibration = moment(site.last_calibrated).isBefore(sevenDaysAgo)
                            return (
                                <tr key={site.site_id} className="[&>*]:pb-1">
                                    <td className="text-gray-600">{site.site_name}</td>
                                    <td className="text-gray-600">{site.team_leader}</td>
                                    <td className="text-center"><FontAwesomeIcon icon={faCircle} className={`${isOutOfCalibration ? 'text-red-700' : 'text-green-700'}`}/></td>
                                    <td className="text-sm text-gray-500 text-center"><EditSiteContainer site={site}/></td>
                                    <td className="text-sm text-gray-500 text-center"><DeleteSiteContainer site={site}/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr className="">
                        <td colSpan={5} className="pt-2">
                            <button className="w-full text-white bg-neutral-500 rounded py-1 cursor-pointer">Add New Site +</button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}