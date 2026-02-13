import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";



function SearchSite ({ onChange }) {
    
    return (
        <div className="flex-1  md:max-w-3/12 rounded border border-gray-300 py-1 px-2 flex items-center gap-1 text-neutral-light text-sm cursor-pointer hover:text-neutral-light hover:border-gray-700">
            <FontAwesomeIcon icon={faMagnifyingGlass} className=''/>
            <input placeholder={'Search Sites...'} className="flex-1 outline-transparent" onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default SearchSite;