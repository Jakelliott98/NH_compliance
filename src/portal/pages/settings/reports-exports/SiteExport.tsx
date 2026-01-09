import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";


function SiteExport () {

    return (
        <div className="p-4 border-b border-gray-200 flex-1">
            <div>
                <h2 className="font-semibold text-sm">Export Site Report</h2>
            </div>
            <div className="py-2 flex flex-col gap-2">
                <div>
                    <p className="text-sm font-semibold">Content</p>
                    <p className="text-sm text-gray-400 font-light">Type of data to export.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-200 rounded border-gray-500 border-1 cursor-pointer">Overall Compliance</button>
                    <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100 rounded border-gray-200 border-1 cursor-pointer">Missed Calibrations</button>
                    <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100 rounded border-gray-200 border-1 cursor-pointer">Missed Cleans</button>
                </div>
            </div>
            <div className="py-2 flex flex-col gap-2">
                <div>
                    <p className="text-sm font-semibold">Export Date Range</p>
                    <p className="text-sm text-gray-400 font-light">All data within the selected date range.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-200 rounded border-gray-500 border-1 cursor-pointer">Last Month</button>
                    <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100 rounded border-gray-200 border-1 cursor-pointer">3 Months</button>
                    <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100 rounded border-gray-200 border-1 cursor-pointer">6 Months</button>
                    <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100 rounded border-gray-200 border-1 cursor-pointer">12 Month</button>
                    <button className="flex-grow text-sm py-2 px-4 flex gap-1 items-center justify-center bg-gray-100 rounded border-gray-200 border-1 cursor-pointer">All Time</button>
                </div>
            </div>
            <button className="w-full text-sm py-2 px-4 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                    <FontAwesomeIcon icon={faDownload} />
                    <p>Export</p>
            </button>
        </div>
    )
}

export default SiteExport;