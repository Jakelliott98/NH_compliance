import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines, faPlus, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import HandleSiteInformation from "./HandleSiteInformation"

export default function SettingsHomepage () {

    return (
        <div className="w-full">
            <div className="p-2 border-b-2 border-solid border-gray-200">
                <p className="font-semibold">Handle Sites</p>
                <div className="flex">
                    <button className="text-sm py-1 px-2 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                        <FontAwesomeIcon icon={faPlus} />
                        <p>Add New Site</p>
                    </button>
                    <button className="text-sm py-1 px-2 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                        <FontAwesomeIcon icon={faTrashCan} />
                        <p>Delete A Site</p>
                    </button>
                    <button className="text-sm py-1 px-2 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <p>Update Team Leader</p>
                    </button>
                </div>
            </div>
            <div className="w-full">
            <HandleSiteInformation />
            </div>
            <div className="p-2 border-b-2 border-solid border-gray-200">
                <p className="font-bold">Handle Calibration and Expiry Dates</p>
                <div>Affinion Calibration Duration : 7 Days</div>
                <div>Affinion Clean Duration : 30 days</div>
            </div>
            <div className="p-2 border-b-2 border-solid border-gray-200">
                <p className="font-bold">Handle Exporting Data</p>
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