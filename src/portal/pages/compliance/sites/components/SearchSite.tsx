import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";



function SearchSite ({ onChange }) {
    
    return (
        <div className="w-3/12 rounded border border-gray-300 py-1 px-2 flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700">
            <FontAwesomeIcon icon={faMagnifyingGlass} className=''/>
            <input placeholder={'Search Sites...'} className="flex-1 outline-transparent" onChange={(e) => {
                onChange({
                        searchTerm: e.target.value,
                        isActive: e.target.value ? true : false,
                    })
            }}/>
        </div>
    )
}

export default SearchSite;