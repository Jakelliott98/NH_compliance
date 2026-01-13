import SearchSite from "../SearchSite";
import RegionFilter from "../RegionFilter";
import AddSiteContainer from "../AddSite";
import { useState } from "react";

interface FilterSection {
    setSearchSite: ( value: string) => void,
    setActiveRegion: ( region: string) => void,
    resetFilters: () => void,
    resetRegion: () => void,
}

function FilterSection ({ setSearchSite, setActiveRegion, resetFilters, resetRegion }: FilterSection) {

    return (
        <div className='flex justify-between p-2 border-b'>
            <div className='flex-1 flex gap-5'>
                <SearchSite onChange={setSearchSite}/>
                <AddSiteContainer />
            </div>
            <div className='flex gap-2'>
                <RegionFilter onSelect={setActiveRegion} resetRegion={resetRegion}/>
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