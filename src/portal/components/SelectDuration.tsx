import SelectButton from "@/components/SelectButton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface SelectDurationProps {
    onSelect: (selectedValue: string) => void,
    activeSelect: string,
}

function SelectDuration ({ onSelect, activeSelect }: SelectDurationProps) {

    return (
        <div className="py-2">
            <div className="pb-2">
                    <p className="text-sm">Export Date Range</p>
                    <p className="text-sm text-neutral-light font-light">All data within the selected date range.</p>
            </div>
            <div className="hidden md:flex gap-2">
                <SelectButton text='Last Month' onSelect={onSelect} activeSelect={activeSelect}/>
                <SelectButton text='3 Months' onSelect={onSelect} activeSelect={activeSelect}/>
                <SelectButton text='6 Months' onSelect={onSelect} activeSelect={activeSelect}/>
                <SelectButton text='12 Months' onSelect={onSelect} activeSelect={activeSelect}/>
                <SelectButton text='All Time' onSelect={onSelect} activeSelect={activeSelect}/>
            </div>
            <div className=" md:hidden">
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder='Last Month' />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                        <SelectItem value='Last Month'>Last Month</SelectItem>
                        <SelectItem value='3 Months'>3 Months</SelectItem>
                        <SelectItem value='6 Months'>6 Months</SelectItem>
                        <SelectItem value='12 Months'>12 Months</SelectItem>
                        <SelectItem value='All Time'>All Time</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default SelectDuration;