import { useState } from 'react'
import SitesSection from './components/SitesSection'
import type { SiteDatabaseType } from '@/types/site'
import FilterSection from './components/sites-filters/FilterSection'
import { useEffect } from 'react'
import { useAllSites } from '@/services/sites'

export interface ActiveRegionState{
    activeRegion: string,
    isFiltered: boolean,
}

export interface SearchSiteState {
    isActive: boolean,
    searchTerm: string,
}

export default function SitesDashboardContainer () {
    
    const { data: sites, isLoading: isSitesLoading, isError: isSitesError, error: sitesError } = useAllSites()

    if (isSitesLoading) return (<p>Loading...</p>)
    if (isSitesError || sites === null || sites === undefined) throw sitesError;

    return (
        <SitesDashboard sites={sites} />
    )
}

interface SitesDashboardProps {
    sites: SiteDatabaseType[],
}

export interface IsFiltered {
    isFiltered: boolean,
    search: {
        isSearch: boolean,
        searchTag: string,
    },
    region: {
        isRegion: boolean,
        regionTag: string,
    },
}

function SitesDashboard ({sites}: SitesDashboardProps) {

    const [filteredSites, setFilteredSites] = useState(sites)
    const [isFiltered, setIsFiltered] = useState<IsFiltered>({
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

    useEffect(() => {

        let allSites = sites
        if (isFiltered.search.isSearch) {
            allSites = allSites.filter(site => site.site_name.toLowerCase().includes(isFiltered.search.searchTag.toLowerCase()))
        }
        if (isFiltered.region.isRegion) {
            allSites = allSites.filter((item: SiteDatabaseType) => {return item.site_region === isFiltered.region.regionTag})
        }
        setFilteredSites(allSites)

    }, [sites, isFiltered])
    
    const resetSites = () => setFilteredSites(sites)

    return (
        <div>
            <FilterSection  setIsFiltered={setIsFiltered} resetSites={resetSites} isFiltered={isFiltered}/>
            <SitesSection sites={filteredSites}/>
        </div>
    )
}