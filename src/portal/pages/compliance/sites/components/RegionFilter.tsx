import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select";

interface SortBtnProps {
    onSelect: (selectedRegion: string) => void,
}

function RegionFilter ({ onSelect }: SortBtnProps) {

    return (
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder='All Regions'/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='Region' onClick={() => onSelect('')}>All Regions</SelectItem>
                    <SelectItem value='North' onClick={() => onSelect('North')}>North</SelectItem>
                    <SelectItem value='East' onClick={() => onSelect('East')}>East</SelectItem>
                    <SelectItem value='South' onClick={() => onSelect('South')}>South</SelectItem>
                    <SelectItem value='West' onClick={() => onSelect('West')}>West</SelectItem>
                </SelectContent>
            </Select>
    )
}

export default RegionFilter;