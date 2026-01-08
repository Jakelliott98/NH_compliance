import { useEffect, useState } from 'react'
import RegionsFilter from './components/Regions/RegionFilter'
import SitesSection from './components/SitesSection'
import type { SiteDatabaseType } from '@/types/site'
import { useQuery } from '@tanstack/react-query'
import fetchAllSites from '@/utils/fetchAllSites'
import FilterButton from '@/components/FilterButton'
import AddSiteContainer from './components/AddSite'
import SearchSite from './components/SearchSite'
import SortBtn from './components/SortBtn'

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
                    <SearchSite onChange={setSearchSite}/>
                    <AddSiteContainer />
                </div>
                <div className='flex gap-2'>
                    <SortBtn />
                    <FilterButton />
                </div>
            </div>
            <SitesSection sites={filteredSites} searchSite={searchSite}/>
        </div>
    )
}