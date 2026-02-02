import SiteSearch from "@/form/pages/site-search/SiteSearch"
import fetchAllSites from "@/services/sites/fetchAllSites"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { SiteDatabaseType } from "@/types/site"
import SiteDataExport from "./SiteDataExport"
import SiteExport from "./SiteExport"

export default function ReportsExports () {

    const [activeSite, setActiveSite] = useState<SiteDatabaseType>()

    const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useQuery<SiteDatabaseType[]>({
        queryKey: ['allSites'], 
        queryFn: () => fetchAllSites(),
    })


    if (isAllSitesError) throw allSitesError;
    if (isAllSitesLoading) return (<p>Loading...</p>)
    if (allSites === undefined || allSites === null) throw allSitesError

    return (
        <div className="py-4">
            <div className="flex-1 border-b border-gray-200 pb-2">
                <p className="font-semibold">Reports & Exports</p>
                <p className="text-sm text-gray-400">Generate and export compliance reports for individual sites or across the organisation, including missed checks and overall compliance status.</p>
            </div>
            <div className="py-2 border-b border-gray-200">
                                <div>
                                    <h2 className="font-semibold text-sm">Find site</h2>
                                    <p className="text-sm text-gray-400">Find the site you want to edit</p>
                                </div>
                                <div className="pt-2">
                                    <SiteSearch sites={allSites} setActiveSite={setActiveSite}/>
                                </div>
            </div>
            <div className="flex w-full justify-between gap-20">
            {
                activeSite ? <SiteDataExport siteID={activeSite.site_id}/> : ''
            }
            {
                activeSite ? <SiteExport /> : ''
            }
            </div>
        </div>
    )
}
