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
                <p>{title}</p>
                <FontAwesomeIcon className='cursor-pointer'  icon={ isOpen ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"} onClick={() => {setIsOpen(prev => !prev)}}/>
            </div>
            {
                isOpen && <AffinionResults />
            }
        </div>
    )
}

function AffinionResults () {
    return (
        <div className='grid grid-cols-3 text-center'>
            <p className='font-bold'>Test</p>
            <p className='font-bold'>Control 1</p>
            <p className='font-bold'>Control 2</p>
            <p className='font-bold'>Hba1c</p>
            <p>45</p>
            <p>65</p>
            <p className='font-bold'>Total Cholesterol</p>
            <p>6.2</p>
            <p>8.6</p>
            <p className='font-bold'>HDL Cholesterol</p>
            <p>2.3</p>
            <p>4.7</p>
            <p className='font-bold'>Triglycerides</p>
            <p>1.77</p>
            <p>4.6</p>
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
        <div className='flex flex-col bg-green-200 rounded-xl p-6 gap-4'>
            <div className='flex flex-row justify-between' onClick={() => {setIsOpen(prev => !prev)}}>
                <p>{ date }</p>
                <FontAwesomeIcon className='cursor-pointer' icon={ isOpen ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}/>
            </div>
            {
                isOpen && affinionDiv
            }
        </div>
    )
}

export default CalibrationCard;