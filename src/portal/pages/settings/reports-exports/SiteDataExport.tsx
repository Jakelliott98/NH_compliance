import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import fetchAffinions from "@/utils/fetchAffinions"
import { useQuery } from "@tanstack/react-query"


interface SiteDataExportProps {
    siteID: number,
}

function SiteDataExport ({ siteID }: SiteDataExportProps) {

    const { data: siteAffinions, isError: isSiteAffinionError, isLoading: isSiteAffinionLoading, error: siteAffinionError} = useQuery({
        queryKey: ['siteAffinion', siteID],
        queryFn: () => fetchAffinions(siteID),
    })

    if (isSiteAffinionLoading) return (<p>Loading...</p>)
    if (isSiteAffinionError) throw siteAffinionError
    if (siteAffinions === undefined || siteAffinions === null) throw siteAffinionError

    return (
            <div className="p-4 border-b border-gray-200 flex-1">
                <div>
                    <h2 className="font-semibold text-sm">Export Site Data</h2>
                </div>
                <div className="py-2 flex flex-col gap-2">
                    <div>
                        <p className="text-sm font-semibold">Affinion</p>
                        <p className="text-sm text-gray-400 font-light">Affinions to extract data from.</p>
                    </div>
                    <div className="flex gap-2">
                            <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-200 rounded border-gray-500 border-1 cursor-pointer">All Affinions</button>
                            {
                                siteAffinions
                                .sort((a, b) => a.affinion_number - b.affinion_number)
                                .map((affinion) => {
                                    return (
                                        <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100 rounded border-gray-200 border-1 cursor-pointer">Affinion {affinion.affinion_number}</button>
                                        
                                    )
                                })
                            }
                    </div>
                    <div className="py-2 flex flex-col gap-2">
                        <div>
                            <p className="text-sm font-semibold">Export Date Range</p>
                            <p className="text-sm text-gray-400 font-light">All data within the selected date range.</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-200  rounded border-gray-500 border-1 cursor-pointer">Last Month</button>
                            <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100  rounded border-gray-200 border-1 cursor-pointer">3 Months</button>
                            <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100  rounded border-gray-200 border-1 cursor-pointer">6 Months</button>
                            <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100 rounded border-gray-200 border-1 cursor-pointer">12 Month</button>
                            <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100 rounded border-gray-200 border-1 cursor-pointer">All Time</button>
                        </div>
                    </div>
                    <button className="w-full text-sm py-2 px-4 flex gap-1 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                        <FontAwesomeIcon icon={faDownload} />
                        <p>Export</p>
                    </button>
                </div>
            </div>

    )

}

export default SiteDataExport