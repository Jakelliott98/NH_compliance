import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import SelectButton from "@/components/SelectButton";
import SelectDuration from "@/portal/components/SelectDuration";
import { useState } from "react";

function SiteExport () {

    const [selectedCompliance, setSelectedCompliance] = useState<string>('All Compliance')
    const [selectedDuration, setSelectedDuration] = useState<string>('Last Month')

    const setActiveCompliance = (selectedValue: string) => setSelectedCompliance(selectedValue)
    const setActiveDuration = (selectedValue: string) => setSelectedDuration(selectedValue)

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
                            <SelectButton text='All Compliance' onSelect={setActiveCompliance} activeSelect={selectedCompliance}/>
                            <SelectButton text='Calibrations' onSelect={setActiveCompliance} activeSelect={selectedCompliance}/>
                            <SelectButton text='Cleans' onSelect={setActiveCompliance} activeSelect={selectedCompliance}/>
                </div>
            </div>
            <SelectDuration onSelect={setActiveDuration} activeSelect={selectedDuration}/>
            <button className="w-full text-sm py-2 px-4 flex gap-0.5 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                    <FontAwesomeIcon icon={faDownload} />
                    <p>Export</p>
            </button>
        </div>
    )
}

export default SiteExport;