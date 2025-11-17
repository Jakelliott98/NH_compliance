import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

export default function LoadingComponent () {

    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <FontAwesomeIcon className='animate-spin text-xl text-gray-700' icon="fa-solid fa-atom" />
            <p className='text-lg text-gray-700'>Fetching...</p>
        </div>
    )
}