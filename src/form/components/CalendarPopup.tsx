import { PopoverTrigger, PopoverContent, Popover } from "@radix-ui/react-popover"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface CalanderPopupProps {
    onSelect: React.Dispatch<React.SetStateAction<Date | undefined>>,
    date: Date | undefined,
}

export default function CalendarPopup ({ onSelect, date }: CalanderPopupProps) {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="w-full outline rounded flex items-center px-2 py-0.5" >
                    <p className={`flex-1 text-start text-sm ${date === undefined ? 'text-gray-300' : 'text-black'}`}>{ date === undefined ? 'Select a date....' : moment(date.toISOString()).format('Do MMMM YYYY') }</p>
                    <FontAwesomeIcon icon={faCalendar} className="text-gray-500"/>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar 
                    mode="single" 
                    onSelect={(date) => {
                        onSelect(date)
                        setOpen(false)
                    }
                    } />
            </PopoverContent>
        </Popover>
    )
}