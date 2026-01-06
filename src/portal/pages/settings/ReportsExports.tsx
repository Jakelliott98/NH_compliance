import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines } from "@fortawesome/free-solid-svg-icons"
import SiteSearch from "@/form/pages/site-search/SiteSearch"
import fetchAllSites from "@/utils/fetchAllSites"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { SiteDatabaseType } from "@/types/site"

export default function ReportsExports () {

    const [activeSite, setActiveSite] = useState('')

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
            <div className="py-2 border-b border-gray-200">
                <div>
                    <h2 className="font-semibold text-sm">Export Site Data</h2>
                    <p className="text-sm text-gray-400">Find the site you want to edit</p>
                </div>
                <div className="py-2">
                    <p className="text-sm italic">Dropdown for Specific Affinion</p>
                    <p className="text-sm italic">Dropdown for duration. Single Results, Month, 6 Months, 12 Months, All Data</p>
                    <button className="text-sm py-1 px-2 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                        <FontAwesomeIcon icon={faFileLines} />
                        <p>Export</p>
                    </button>
                </div>
            </div>
            <div className="py-2 border-b border-gray-200">
                <div>
                    <h2 className="font-semibold text-sm">Export Site Report</h2>
                    <p className="text-sm text-gray-400">Find the site you want to edit</p>
                </div>
                <div className="py-2">
                    <p className="text-sm italic">Dropdown for Missed Calibrations, Missed Cleans, Overall Compliance</p>
                    <button className="text-sm py-1 px-2 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                        <FontAwesomeIcon icon={faFileLines} />
                        <p>Export</p>
                    </button>
                </div>
            </div>
        </div>
    )
}