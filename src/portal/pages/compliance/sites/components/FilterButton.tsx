import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import type { IsFiltered } from "../SitesHomepage";

interface SortBtnProps {
    onSelect: (selectedRegion: string) => void,
    isFiltered: IsFiltered,
    dropdownOptions: Array<string>,
}

function FilterButton ({ onSelect, isFiltered, dropdownOptions }: SortBtnProps) {
    
    return (
            <Select value={isFiltered.region.regionTag} onValueChange={value => onSelect(value)}>
                <SelectTrigger>
                    <SelectValue placeholder='All Regions'/>
                </SelectTrigger>
                <SelectContent>
                    {
                        dropdownOptions.map((item, i) => (
                            <SelectItem key={i} value={item}>{item}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
    )
}

export default FilterButton;