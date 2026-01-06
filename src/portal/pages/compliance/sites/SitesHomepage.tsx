import { useState } from 'react'
import RegionsFilter from './components/Regions/RegionFilter'
import SitesSection from './components/SitesSection'
import type { SiteDatabaseType } from '@/types/site'
import { useQuery } from '@tanstack/react-query'
import fetchAllSites from '@/utils/fetchAllSites'
import FilterButton from '@/components/FilterButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faSortDown } from '@fortawesome/free-solid-svg-icons'

interface ActiveRegionState{
    activeRegion: string,
    isFiltered: boolean,
}

export default function SitesDashboard () {

    const { data: sites, isLoading: isSitesLoading, isError: isSitesError, error: sitesError } = useQuery<SiteDatabaseType[] ,Error>({
        queryKey: ['sites'], 
        queryFn: () => fetchAllSites()
    })

    const [activeRegion, setActiveRegion] = useState<ActiveRegionState>({
        activeRegion: '',
        isFiltered: false,
    })

    const selectRegion: (selectedRegion: string) => void = (selectedRegion) => {

        setActiveRegion((prev) => {
            if (prev.activeRegion === selectedRegion) {
                return {
                    isFiltered: false,
                    activeRegion: '',
                }
            } else {
                return {
                    isFiltered: true,
                    activeRegion: selectedRegion,
                }
            }
        })

    }

    if (isSitesLoading) return (<p>Loading...</p>)
    if (isSitesError || sites === null || sites === undefined) throw sitesError;

    const filteredSites = activeRegion.isFiltered ? sites.filter((item: SiteDatabaseType) => {return item.site_region === activeRegion.activeRegion}) : sites;

    return (
        <div className=''>
            <div className='flex justify-between p-2 border-b'>
                <div className='flex-1 flex gap-5'>
                    <div className="w-3/12 rounded border border-gray-300 py-1 px-2 flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className=''/>
                        <p className='text-gray-400'>Search Sites...</p>
                    </div>
                    <div className='py-1 px-2 flex items-center gap-2 border border-gray-300 rounded text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700'>
                        <FontAwesomeIcon icon={faPlus} className=''/>
                        <p className=''>Add Site</p>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <div className='py-1 px-2 flex gap-2 border border-gray-300 rounded text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700'>
                        <p className='text-sm'>Sort By: <span className='text-sm pl-1 text-gray-800 font-bold'>All Categories</span></p>
                        <FontAwesomeIcon icon={faSortDown}/>
                    </div>
                    <FilterButton />
                </div>
            </div>
            <SitesSection sites={filteredSites} />
        </div>
    )
}