import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import SelectButton from "@/components/SelectButton"
import SelectDuration from "@/portal/components/SelectDuration"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAfinions } from "@/services/afinions"
import type { SiteDatabaseType } from "@/types/site"


interface SiteDataExportProps {
    site: SiteDatabaseType,
}

function SiteDataExport ({ site }: SiteDataExportProps) {

    const [selectedAfinion, setSelectedAfinion] = useState<string>('All Afinions')
    const [selectedDuration, setSelectedDuration] = useState<string>('Last Month')

    const { data: siteAfinions, isError: isSiteAfinionError, isLoading: isSiteAfinionLoading, error: siteAfinionError} = useAfinions(site)

    if (isSiteAfinionLoading) return (<p>Loading...</p>)
    if (isSiteAfinionError) throw siteAfinionError
    if (siteAfinions === undefined || siteAfinions === null) throw siteAfinionError

    const setActiveAfinion: (SelectedValue: string) => void = (selectedValue) => setSelectedAfinion(selectedValue)
    const setActiveDuration: (SelectedValue: string) => void = (selectedValue) => setSelectedDuration(selectedValue)

    return (
            <div className="py-2 md:p-4 border-b border-gray-200 flex-1">
                <div>
                    <h2 className="text-sm">Export Site Data</h2>
                </div>
                <div className="py-2 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-sm">Afinion</p>
                            <p className="text-sm text-neutral-light font-light">Afinions to extract data from.</p>
                        </div>
                        <div className="hidden md:flex gap-2">
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
                        <div className="md:hidden">
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder='Afinion' />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                        {
                                            siteAfinions
                                            .sort((a, b) => a.afinion_number - b.afinion_number)
                                            .map((afinion) => {
                                                return (
                                                <SelectItem value={`Afinion ${afinion.afinion_number}`}>Afinion {afinion.afinion_number}</SelectItem>
                                            )})
                                        }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <SelectDuration onSelect={setActiveDuration} activeSelect={selectedDuration}/>
                    <button className="w-full text-sm py-2 px-4 flex gap-1 btn">
                        <FontAwesomeIcon icon={faDownload} />
                        <p>Export</p>
                    </button>
                </div>
            </div>

    )

}

export default SiteDataExport