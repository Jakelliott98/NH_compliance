import type { CalibrationDatabaseType } from "@/types/calibration"
import moment from "moment"
import CalibrationRangesLayout from "./CalibrationRangesLayout"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

interface LipidsDisplayProps {
    lipids: CalibrationDatabaseType[] | undefined,
}

function LipidsControlDisplay ({ lipids }: LipidsDisplayProps) {

    const [isOpen, setIsOpen] = useState(false)
    if (!lipids) return (<p>No Lipids Control added yet</p>)
    const total = lipids.find(control => control.test_type === 'total')

    if (!total) return (<p className="text-sm text-warning italic text-center">Currently no Lipids Controls</p>)

    return (
        <div className='p-0.5 bg-red-100 rounded-lg flex flex-col h-fit grow-1'>
            <div className='bg-white rounded-lg p-3'>
                <div className='border-b-2 border-solid border-gray-300 py-2'>
                    <p className='font-medium'>Lipids</p>
                    <p className='text-gray-400 text-xs'>Lot Number: {total.lot_number}</p>
                </div>
                { !isOpen && <button className=" w-full pt-3 text-sm btn" onClick={() => {setIsOpen(true)}}>See Ranges <FontAwesomeIcon icon={faChevronDown} /></button>}
                {
                    isOpen && (
                        <div className="py-2">
                            {
                                lipids.map((control) => {
                                    return (
                                        <div key={control.id}>
                                            <p className="text-sm">{control.display_name}</p>
                                            <CalibrationRangesLayout control={control} />
                                        </div>
                                    )
                                })
                            }
                            <button className="w-full pt-3 text-sm btn" onClick={() => setIsOpen(false)}>See Less <FontAwesomeIcon icon={faChevronUp}/></button>
                        </div>
                    )
                }
            </div>
            <p className='text-warning self-center text-xs p-1'>Expires {moment(total.expiry_date).format('Do MMMM')}</p>
        </div>
    )
}

export default LipidsControlDisplay;