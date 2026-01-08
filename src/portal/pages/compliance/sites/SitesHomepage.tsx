import { useState } from 'react'
import SitesSection from './components/SitesSection'
import type { SiteDatabaseType } from '@/types/site'
import { useQuery } from '@tanstack/react-query'
import fetchAllSites from '@/utils/fetchAllSites'
import AddSiteContainer from './components/AddSite'
import SearchSite from './components/SearchSite'
import RegionFilter from './components/RegionFilter'

interface ActiveRegionState{
    activeRegion: string,
    isFiltered: boolean,
}

export interface SearchSiteState {
    isActive: boolean,
    searchTerm: string,
}

export default function SitesDashboard () {

    const [searchSite, setSearchSite] = useState<SearchSiteState>({
        isActive: false,
        searchTerm: '',
    })
    
    const { data: sites, isLoading: isSitesLoading, isError: isSitesError, error: sitesError } = useQuery<SiteDatabaseType[] ,Error>({
        queryKey: ['sites'], 
        queryFn: () => fetchAllSites()
    })

    const [activeRegion, setActiveRegion] = useState<ActiveRegionState>({
        activeRegion: '',
        isFiltered: false,
    })

    const selectRegion: (selectedRegion: string) => void = (selectedRegion) => {
        if (selectedRegion === '') {
            return setActiveRegion({
                isFiltered: false,
                activeRegion: '',
            })
        }
        setActiveRegion({
                    isFiltered: true,
                    activeRegion: selectedRegion,
        })

    }

    console.log(activeRegion)

    if (isSitesLoading) return (<p>Loading...</p>)
    if (isSitesError || sites === null || sites === undefined) throw sitesError;

    const filteredSites = activeRegion.isFiltered ? sites.filter((item: SiteDatabaseType) => {return item.site_region === activeRegion.activeRegion}) : sites;

    return (
        <div className=''>
            <div className='flex justify-between p-2 border-b'>
                <div className='flex-1 flex gap-5'>
                    <SearchSite onChange={setSearchSite}/>
                    <AddSiteContainer />
                </div>
                <div className='flex gap-2'>
                    <RegionFilter onSelect={selectRegion}/>
                    <div className='py-1 px-2 flex items-center gap-2 border border-gray-300 rounded text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700'>Reset</div>
                </div>
            </div>
            <SitesSection sites={filteredSites} searchSite={searchSite}/>
        </div>
    )
}