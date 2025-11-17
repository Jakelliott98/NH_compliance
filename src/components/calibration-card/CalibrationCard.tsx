import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useState } from 'react'
library.add(fas, far, fab)

interface AffinionDropdownProps {
    title: string,
}

function AffinionDropdown ({ title }: AffinionDropdownProps) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row w-2/12 '>
                    <p className='flex-1 text-gray-500'>{title}</p>
                    <p className='flex-1 text-gray-500 border-l-1 border-solid border-gray-300 px-1 text-center'>NH2353432</p>
                </div>
                <FontAwesomeIcon className='cursor-pointer text-gray-500'  icon={ isOpen ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"} onClick={() => {setIsOpen(prev => !prev)}}/>
            </div>
            {
                isOpen && <AffinionResults />
            }
        </div>
    )
}

function AffinionResults () {
    return (
        <div className='py-4'>
            <div className='grid grid-cols-3 text-center'>
                <p></p>
                <p className='font-bold'>Control 2</p>
                <p className='font-bold'>Control 2</p>
            </div>
            <div className='grid grid-cols-3 text-center bg-gray-100 p-2 gap-y-4'>
                <p className='font-bold text-left border-l-2 border-solid border-orange-500 pl-2'>Hba1c</p>
                <p>45</p>
                <p>65</p>
                <p className='font-bold text-left border-l-2 border-solid border-purple-500 pl-2'>Total Cholesterol</p>
                <p>6.2</p>
                <p>8.6</p>
                <p className='font-bold text-left border-l-2 border-solid border-purple-500 pl-2'>HDL Cholesterol</p>
                <p>2.3</p>
                <p>4.7</p>
                <p className='font-bold text-left border-l-2 border-solid border-purple-500 pl-2'>Triglycerides</p>
                <p>1.77</p>
                <p>4.6</p>
            </div>
        </div>
    )
}

interface CalibrationCardProps {
    date: string,
    clinician: string,
}

function CalibrationCard ({ date, clinician }: CalibrationCardProps) {

    const [isOpen, setIsOpen] = useState(false)

    const affinionDiv = (
        <div className='bg-white rounded-xl p-4'>
            <AffinionDropdown title={'Affinion 1'}/>
            <AffinionDropdown title={'Affinion 2'}/>
        </div>
    )

    return (
        <div className='flex flex-col bg-green-100 rounded-xl p-6 gap-4'>
            <div className='flex flex-row justify-between' onClick={() => {setIsOpen(prev => !prev)}}>
                <p className='text-sm text-gray-500'>{ date }</p>
                <FontAwesomeIcon className='cursor-pointer text-sm text-gray-500' icon={ isOpen ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}/>
            </div>
            {
                isOpen && affinionDiv
            }
        </div>
    )
}

export default CalibrationCard;