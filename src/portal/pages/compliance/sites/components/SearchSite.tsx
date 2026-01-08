import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchSite () {
    
    return (
        <div className="w-3/12 rounded border border-gray-300 py-1 px-2 flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700">
            <FontAwesomeIcon icon={faMagnifyingGlass} className=''/>
            <p className='text-gray-400'>Search Sites...</p>
        </div>
    )
}

export default SearchSite;