import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import SelectButton from "@/components/SelectButton";
import SelectDuration from "@/portal/components/SelectDuration";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function SiteExport () {

    const [selectedCompliance, setSelectedCompliance] = useState<string>('All Compliance')
    const [selectedDuration, setSelectedDuration] = useState<string>('Last Month')

    const setActiveCompliance = (selectedValue: string) => setSelectedCompliance(selectedValue)
    const setActiveDuration = (selectedValue: string) => setSelectedDuration(selectedValue)

    return (
        <div className="md:p-4 border-b border-gray-200 flex-1">
            <div>
                <h2 className="text-sm">Export Site Report</h2>
            </div>
            <div className="py-2 flex flex-col gap-2">
                <div>
                    <p className="text-sm">Content</p>
                    <p className="text-sm text-neutral-light font-light">Type of data to export.</p>
                </div>
                <div className="hidden md:flex gap-2">
                            <SelectButton text='All Compliance' onSelect={setActiveCompliance} activeSelect={selectedCompliance}/>
                            <SelectButton text='Calibrations' onSelect={setActiveCompliance} activeSelect={selectedCompliance}/>
                            <SelectButton text='Cleans' onSelect={setActiveCompliance} activeSelect={selectedCompliance}/>
                </div>
                <div className="md:hidden">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder='' />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value='All Compliance'>All Compliance</SelectItem>
                            <SelectItem value='Calibrations'>Calibrations</SelectItem>
                            <SelectItem value='Cleans'>Cleans</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <SelectDuration onSelect={setActiveDuration} activeSelect={selectedDuration}/>
            <button className="w-full text-sm py-2 px-4 flex btn">
                    <FontAwesomeIcon icon={faDownload} />
                    <p>Export</p>
            </button>
        </div>
    )
}

export default SiteExport;