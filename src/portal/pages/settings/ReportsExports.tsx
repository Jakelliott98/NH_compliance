import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines } from "@fortawesome/free-solid-svg-icons"

export default function ReportsExports () {

    return (
        <div className="py-4 border-b-2 border-solid border-gray-200 flex gap-4">
                <div className="flex-1">
            <p className="font-bold">Reports & Exports</p>
            <p className="text-sm text-gray-600">Generate and export compliance reports for individual sites or across the organisation, including missed checks and overall compliance status.</p>
            </div>
            <div className="flex-3">
            <p>Export site data for calibrations</p>
            <p className="text-sm italic">Dropdown for Specific Affinion</p>
            <p className="text-sm italic">Dropdown for duration. Single Results, Month, 6 Months, 12 Months, All Data</p>
            <button className="text-sm py-1 px-2 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                <FontAwesomeIcon icon={faFileLines} />
                <p>Export</p>
            </button>
            <p>Export Site Report</p>
            <p className="text-sm italic">Dropdown for Missed Calibrations, Missed Cleans, Overall Compliance</p>
            <button className="text-sm py-1 px-2 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                <FontAwesomeIcon icon={faFileLines} />
                <p>Export</p>
            </button>
            </div>
        </div>
    )
}