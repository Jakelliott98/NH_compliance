import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

export default function AffinionCard () {

    return (
            <div className="rounded-xl bg-gray-100 p-4 flex flex-col gap-4 items-center">
                <div className='bg-white rounded-full w-9/12 aspect-square flex items-center justify-center'>
                    <p className='uppercase font-medium'>Affinion 1</p>
                </div>
                <p className='text-gray-600'>NH234532</p>
                <div className='flex gap-2'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='bg-green-100 rounded-full p-3 flex items-center justify-center'>
                            <FontAwesomeIcon icon="fa-regular fa-calendar-check" className='text-xl text-green-400'/>
                        </div>
                        <p className='text-sm text-gray-500 text-center'>27th October</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <div className='bg-orange-100 rounded-full p-3 flex items-center justify-center'>                        
                            <FontAwesomeIcon icon="fa-solid fa-hand-sparkles" className='text-xl text-orange-400'/>
                        </div>
                        <p className='text-sm text-gray-500 text-center'>6th August</p>
                    </div>
                </div>
            </div>
    )
}