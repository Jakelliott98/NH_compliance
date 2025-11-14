import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import moment from 'moment'
library.add(fas, far, fab)


export default function AffinionCard ({ affinion }) {

    return (
            <div className="rounded-xl bg-gray-100 p-4 flex flex-col gap-4 items-center">
                <div className='bg-white rounded-full w-9/12 aspect-square flex items-center justify-center'>
                    <p className='uppercase font-medium'>{affinion.name}</p>
                </div>
                <p className='text-gray-600'>NH{affinion.nh_number}</p>
                <div className='flex gap-2'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='bg-green-100 rounded-full p-3 flex items-center justify-center'>
                            <FontAwesomeIcon icon="fa-regular fa-calendar-check" className='text-xl text-green-400'/>
                        </div>
                        <p className='text-sm text-gray-500 text-center'>{moment(affinion.last_calibrated).format("Mo MMMM")}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='bg-orange-100 rounded-full p-3 flex items-center justify-center'>                        
                            <FontAwesomeIcon icon="fa-solid fa-hand-sparkles" className='text-xl text-orange-400'/>
                        </div>
                        <p className='text-sm text-gray-500 text-center'>Last Clean Date</p>
                    </div>
                </div>
            </div>
    )
}