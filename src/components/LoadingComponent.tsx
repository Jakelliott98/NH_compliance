import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from "@fortawesome/free-solid-svg-icons";

export default function LoadingComponent () {

    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <FontAwesomeIcon icon={faAtom} className='animate-spin text-xl text-gray-700'/>
            <p className='text-lg text-gray-700'>Fetching...</p>
        </div>
    )
}