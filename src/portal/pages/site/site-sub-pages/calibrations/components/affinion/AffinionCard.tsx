import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { faHandSparkles } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment'
import type { AffinionDatabaseType } from '@/types/affinion';

interface AffinionCardProps{
    affinion: AffinionDatabaseType,
}

export default function AffinionCard ({ affinion }: AffinionCardProps) {
    return (
            <div className="rounded-xl bg-gray-100 p-4 flex flex-col gap-4 items-center">
                <div className='bg-white rounded-full w-9/12 aspect-square flex items-center justify-center'>
                    <p className='uppercase font-medium'>Affinion {affinion.affinion_number}</p>
                </div>
                <p className='text-gray-600'>NH{affinion.nh_number}</p>
                <div className='flex gap-2'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='bg-green-100 rounded-full p-3 flex items-center justify-center'>
                            <FontAwesomeIcon icon={faCalendarCheck} className='text-xl text-green-400'/>
                        </div>
                        <p className='text-sm text-gray-500 text-center'>{affinion.last_calibrated ? moment(affinion.last_calibrated).format("Do MMMM") : 'No calibrations'}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='bg-orange-100 rounded-full p-3 flex items-center justify-center'>                        
                            <FontAwesomeIcon icon={faHandSparkles} className='text-xl text-orange-400'/>
                        </div>
                        <p className='text-sm text-gray-500 text-center'>{affinion.last_clean ? moment(affinion.last_clean).format("Do MMMM") : 'No cleans'}</p>
                    </div>
                </div>
            </div>
    )
}