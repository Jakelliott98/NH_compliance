import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import fetchAffinions from "@/utils/fetchAffinions"
import { useQuery } from "@tanstack/react-query"
import SelectButton from "@/components/SelectButton"
import SelectDuration from "@/portal/components/SelectDuration"
import { useState } from "react"
import type { SelectedValue } from "react-day-picker"


interface SiteDataExportProps {
    siteID: number,
}

function SiteDataExport ({ siteID }: SiteDataExportProps) {

    const [selectedAffinion, setSelectedAffinion] = useState<string>('All Affinions')
    const [selectedDuration, setSelectedDuration] = useState<string>('Last Month')

    const { data: siteAffinions, isError: isSiteAffinionError, isLoading: isSiteAffinionLoading, error: siteAffinionError} = useQuery({
        queryKey: ['siteAffinion', siteID],
        queryFn: () => fetchAffinions(siteID),
    })

    if (isSiteAffinionLoading) return (<p>Loading...</p>)
    if (isSiteAffinionError) throw siteAffinionError
    if (siteAffinions === undefined || siteAffinions === null) throw siteAffinionError

    const setActiveAffinion: (SelectedValue: string) => void = (selectedValue) => setSelectedAffinion(selectedValue)
    const setActiveDuration: (SelectedValue: string) => void = (selectedValue) => setSelectedDuration(selectedValue)

    return (
            <div className="p-4 border-b border-gray-200 flex-1">
                <div>
                    <h2 className="font-semibold text-sm">Export Site Data</h2>
                </div>
                <div className="py-2 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-sm font-semibold">Affinion</p>
                            <p className="text-sm text-gray-400 font-light">Affinions to extract data from.</p>
                        </div>
                        <div className="flex gap-2">
                                <SelectButton text='All Affinions' activeSelect={selectedAffinion} onSelect={setActiveAffinion}/>
                                {
                                    siteAffinions
                                    .sort((a, b) => a.affinion_number - b.affinion_number)
                                    .map((affinion) => {
                                        return (
                                            <SelectButton onSelect={setActiveAffinion} activeSelect={selectedAffinion} text={`Affinion ${affinion.affinion_number}`}/>
                                            
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