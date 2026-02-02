import SearchSite from "../SearchSite";
import FilterButton from "../FilterButton";
import AddSiteContainer from "../AddSite";
import type { IsFiltered } from "../../SitesHomepage";

const regionFilterOptions = ['All Regions', 'North', 'East', 'South', 'West']

interface FilterSection {
    setIsFiltered: React.Dispatch<React.SetStateAction<IsFiltered>>,
    resetSites: () => void,
    isFiltered: IsFiltered,
}

function FilterSection ({ setIsFiltered, resetSites, isFiltered }: FilterSection) {

    const searchSite = (value: string) => {
        return setIsFiltered((prev) => {
            return {
                ...prev, 
                isFiltered: true,
                search: {
                    isSearch: true,
                    searchTag: value,
                }
            }

        })
    }
    const setRegion = (region: string) => {
        if (region === 'All Regions') {
            return setIsFiltered((prev) => {
                const isFiltersActive = prev.search.isSearch;
                return {
                    ...prev,
                    isFiltered: isFiltersActive,
                    region: {
                        isRegion: false,
                        regionTag: 'All Regions'
                    }
                }
            })
        }
        return setIsFiltered((prev) => {
            return {
                ...prev, 
                isFiltered: true,
                region: {
                    isRegion: true, 
                    regionTag: region}
            }
        })
    }

    const resetFilters = () => {
        setIsFiltered({
            isFiltered: false,
            search: {
                isSearch: false, 
                searchTag: '',
            },
            region: {
                isRegion: false,
                regionTag: 'All Regions'
            }
        })
        resetSites()
    }

    return (
        <div className='flex justify-between p-2 border-b'>
            <div className='flex-1 flex gap-2 md:gap-5'>
                <SearchSite onChange={searchSite}/>
                <AddSiteContainer />
            </div>
            <div className='hidden md:flex gap-2'>
                <FilterButton onSelect={setRegion} isFiltered={isFiltered} dropdownOptions={regionFilterOptions}/>
                <button 
                    className='py-1 px-2 flex items-center gap-2 border border-gray-300 rounded text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700'
                    onClick={() => resetFilters()}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default FilterSection;