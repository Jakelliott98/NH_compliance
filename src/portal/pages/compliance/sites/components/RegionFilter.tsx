import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";
import type { IsFiltered } from "../SitesHomepage";

interface SortBtnProps {
    onSelect: (selectedRegion: string) => void,
    resetRegion: () => void,
    isFiltered: IsFiltered
}

function RegionFilter ({ onSelect, resetRegion, isFiltered }: SortBtnProps) {
    
    return (
            <Select value={isFiltered.region.regionTag} onValueChange={value => onSelect(value)}>
                <SelectTrigger>
                    <SelectValue placeholder='All Regions'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='All Regions'>All Regions</SelectItem>
                    <SelectItem value='North'>North</SelectItem>
                    <SelectItem value='East'>East</SelectItem>
                    <SelectItem value='South'>South</SelectItem>
                    <SelectItem value='West'>West</SelectItem>
                </SelectContent>
            </Select>
    )
}

export default RegionFilter;