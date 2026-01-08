import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortDown } from "@fortawesome/free-solid-svg-icons"

function SortBtn () {

    return (
        <div className='py-1 px-2 flex gap-2 border border-gray-300 rounded text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700'>
            <p className='text-sm'>Sort By: <span className='text-sm pl-1 text-gray-800 font-bold'>All Categories</span></p>
            <FontAwesomeIcon icon={faSortDown}/>
        </div>
    )
}

export default SortBtn;