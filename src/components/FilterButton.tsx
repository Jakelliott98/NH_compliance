import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

function FilterButton () {

    return (
        <div className="w-fit rounded border border-gray-200 py-1 px-2 flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700">
            <FontAwesomeIcon icon={faFilter} />
            <p>Filter</p>
        </div>
    )
}

export default FilterButton