import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import moment from 'moment';
import type { ResultsDatabaseType } from '../../types/result';
import type { AffinionDatabaseType } from '../../types/affinion';

interface AffinionDropdownProps {
    result: ResultsDatabaseType,
}

function AffinionDropdown ({ result } :AffinionDropdownProps) {

    return (
        <div className='py-4'>
            <div className='grid grid-cols-3 text-center'>
                <p></p>
                <p className='font-bold'>Control 1</p>
                <p className='font-bold'>Control 2</p>
            </div>
            <div className='grid grid-cols-3 text-center bg-gray-100 p-2 gap-y-4'>
                <p className='font-bold text-left border-l-2 border-solid border-orange-500 pl-2'>Hba1c</p>
                <p>{result.hba1c_result.c1.result}</p>
                <p>{result.hba1c_result.c2.result}</p>
                <p className='font-bold text-left border-l-2 border-solid border-purple-500 pl-2'>Total Cholesterol</p>
                <p>{result.total_result.c1.result}</p>
                <p>{result.total_result.c2.result}</p>
                <p className='font-bold text-left border-l-2 border-solid border-purple-500 pl-2'>HDL Cholesterol</p>
                <p>{result.hdl_result.c1.result}</p>
                <p>{result.hdl_result.c2.result}</p>
                <p className='font-bold text-left border-l-2 border-solid border-purple-500 pl-2'>Triglycerides</p>
                <p>{result.triglycerides_result.c1.result}</p>
                <p>{result.triglycerides_result.c2.result}</p>
            </div>
        </div>
    )
}

interface CalibrationCardProps {
    result: ResultsDatabaseType,
    affinion: AffinionDatabaseType,
}

function CalibrationCard ({ result, affinion }: CalibrationCardProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div className='flex flex-col bg-green-100 rounded-xl p-6 gap-4'>
            <div className='flex flex-row justify-between' onClick={() => {setIsOpen(prev => !prev)}}>
                <p className='text-sm text-gray-500'>{ moment(result.calibration_date).format('Do MMMM YYYY') }</p>
                <p className='text-sm text-gray-500'>Affinion {affinion.affinion_number} | NH{affinion.nh_number}</p>
                <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} className='cursor-pointer text-gray-500'/>
            </div>
            {
                isOpen && <AffinionDropdown result={result}/>
            }
        </div>
    )
}

export default CalibrationCard;