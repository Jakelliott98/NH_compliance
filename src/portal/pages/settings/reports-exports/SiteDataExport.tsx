import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import fetchAfinions from "@/services/afinions/fetchAfinions"
import { useQuery } from "@tanstack/react-query"
import SelectButton from "@/components/SelectButton"
import SelectDuration from "@/portal/components/SelectDuration"
import { useState } from "react"
import type { SelectedValue } from "react-day-picker"


interface SiteDataExportProps {
    siteID: number,
}

function SiteDataExport ({ siteID }: SiteDataExportProps) {

    const [selectedAfinion, setSelectedAfinion] = useState<string>('All Afinions')
    const [selectedDuration, setSelectedDuration] = useState<string>('Last Month')

    const { data: siteAfinions, isError: isSiteAfinionError, isLoading: isSiteAfinionLoading, error: siteAfinionError} = useQuery({
        queryKey: ['siteAfinion', siteID],
        queryFn: () => fetchAfinions(siteID),
    })

    if (isSiteAfinionLoading) return (<p>Loading...</p>)
    if (isSiteAfinionError) throw siteAfinionError
    if (siteAfinions === undefined || siteAfinions === null) throw siteAfinionError

    const setActiveAfinion: (SelectedValue: string) => void = (selectedValue) => setSelectedAfinion(selectedValue)
    const setActiveDuration: (SelectedValue: string) => void = (selectedValue) => setSelectedDuration(selectedValue)

    return (
            <div className="p-4 border-b border-gray-200 flex-1">
                <div>
                    <h2 className="font-semibold text-sm">Export Site Data</h2>
                </div>
                <div className="py-2 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-sm font-semibold">Afinion</p>
                            <p className="text-sm text-gray-400 font-light">Afinions to extract data from.</p>
                        </div>
                        <div className="flex gap-2">
                                <SelectButton text='All Afinions' activeSelect={selectedAfinion} onSelect={setActiveAfinion}/>
                                {
                                    siteAfinions
                                    .sort((a, b) => a.afinion_number - b.afinion_number)
                                    .map((afinion) => {
                                        return (
                                            <SelectButton onSelect={setActiveAfinion} activeSelect={selectedAfinion} text={`Afinion ${afinion.afinion_number}`}/>
                                            
                                        )
                                    })
                                }
                        </div>
                    </div>
                    <SelectDuration onSelect={setActiveDuration} activeSelect={selectedDuration}/>
                    <button className="w-full text-sm py-2 px-4 flex gap-1 items-center justify-center bg-white rounded border-gray-200 border-1 cursor-pointer">
                        <FontAwesomeIcon icon={faDownload} />
                        <p>Export</p>
                    </button>
                </div>
            </div>

    )

}

export default SiteDataExport