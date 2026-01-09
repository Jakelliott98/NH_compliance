import SelectButton from "@/components/SelectButton"

interface SelectDurationProps {
    onSelect: (selectedValue: string) => void,
    activeSelect: string,
}

function SelectDuration ({ onSelect, activeSelect }: SelectDurationProps) {

    return (
        <div className="py-2 flex flex-col gap-2">
            <div>
                <p className="text-sm font-semibold">Export Date Range</p>
                <p className="text-sm text-gray-400 font-light">All data within the selected date range.</p>
            </div>
            <div className="flex gap-2">
                <SelectButton text='Last Month' onSelect={onSelect} activeSelect={activeSelect}/>
                <SelectButton text='3 Months' onSelect={onSelect} activeSelect={activeSelect}/>
                <SelectButton text='6 Months' onSelect={onSelect} activeSelect={activeSelect}/>
                <SelectButton text='12 Months' onSelect={onSelect} activeSelect={activeSelect}/>
                <SelectButton text='All Time' onSelect={onSelect} activeSelect={activeSelect}/>
            </div>
        </div>
    )
}

export default SelectDuration;