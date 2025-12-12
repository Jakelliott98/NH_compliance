import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react'
import RegionCard from './RegionCard';
import type { RegionsDatabaseType } from '@/types/region';
import { useQuery } from '@tanstack/react-query';
import fetchRegions from '@/portal/utils/fetchRegions';

interface RegionsFilterProps {
    activeRegion: string,
    selectRegion: (selectedRegion: string) => void,
}

export default function RegionsFilter({activeRegion, selectRegion}: RegionsFilterProps) {

    const { data: regions, isLoading: isRegionsLoading, isError: isRegionsError, error: regionsError} = useQuery<RegionsDatabaseType[], Error>({queryKey: ['regions'], queryFn: () => fetchRegions()})

    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

    const searchInput = <input className='text-gray-500 border-l-2 px-2 border-gray-300 border-solid focus:outline-none' placeholder='Search for a site...'></input>

    if (isRegionsLoading) return (<p>Loading...</p>)
    if (isRegionsError) throw regionsError;
    if (regions === null || regions === undefined) throw new Error('Error fetching regions at useQuery')

    return (
        <div className="flex p-2">
            <div className="flex flex-cols flex-1 gap-5">
                {
                    regions.map((item: RegionsDatabaseType) => {
                        return (
                            <RegionCard key={item.id} region={item} activeRegion={activeRegion} onSelected={selectRegion}/>
                        )
                    })
                }
            </div>
            <div className="flex gap-2 justify-center content-center">
                <div className='p-2 bg-white rounded-lg border-solid border-2 border-green-200 flex gap-2' onClick={() => {setIsSearchOpen(true)}}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className=' text-gray-300 self-center'/>
                    { isSearchOpen && searchInput }
                </div>
                <div className='p-2 bg-white border-solid border-2 border-green-200 rounded-lg flex gap-1'>
                    <p>Filters</p>
                    <FontAwesomeIcon className='self-center' icon={faCaretDown} />
                </div>
            </div>
        </div>
    )

}

