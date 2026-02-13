import type { CalibrationDatabaseType } from "@/types/calibration"
import moment from "moment"
import CalibrationRangesLayout from "./CalibrationRangesLayout"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

interface Hba1cDisplayProps {
    hba1c: CalibrationDatabaseType | undefined,
}

function HBA1cControlDisplay ({ hba1c }: Hba1cDisplayProps) {

    const [isOpen, setIsOpen] = useState(false)
    if (!hba1c) return (<p className="text-sm text-warning italic text-center">Currently no HBA1c Controls</p>)

    return (
    <div className='p-0.5 bg-red-100 rounded-lg flex flex-col h-fit grow-1'>
            <div className='bg-white rounded-lg p-3'>
                <div className='border-b-2 border-solid border-gray-300 py-2'>
                    <p className='text-sm md:text-base font-medium'>{hba1c.display_name}</p>
                    <p className='text-sm md:text-base text-neutral-light text-xs'>Lot Number: {hba1c.lot_number}</p>
                </div>
                { !isOpen && <button className=" w-full pt-3 text-sm btn" onClick={() => {setIsOpen(true)}}>See Ranges <FontAwesomeIcon icon={faChevronDown} /></button>}
                { isOpen && (
                        <>
                            <CalibrationRangesLayout control={hba1c}/>
                            <button className=" w-full pt-3 text-sm btn" onClick={() => setIsOpen(false)}>See Less <FontAwesomeIcon icon={faChevronUp}/></button>
                        </>
                    )
                }
            </div>
            <p className='text-warning self-center text-xs p-1'>Expires {moment(hba1c.expiry_date).format('Do MMMM')}</p>
        </div>
    )

}

export default HBA1cControlDisplay;