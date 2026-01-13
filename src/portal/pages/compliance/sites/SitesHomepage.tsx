import { useState } from 'react'
import SitesSection from './components/SitesSection'
import type { SiteDatabaseType } from '@/types/site'
import { useQuery } from '@tanstack/react-query'
import fetchAllSites from '@/utils/fetchAllSites'
import FilterSection from './components/sites-filters/FilterSection'
import { useEffect } from 'react'

export interface ActiveRegionState{
    activeRegion: string,
    isFiltered: boolean,
}

export interface SearchSiteState {
    isActive: boolean,
    searchTerm: string,
}

export default function SitesDashboardContainer () {
    
    const { data: sites, isLoading: isSitesLoading, isError: isSitesError, error: sitesError } = useQuery<SiteDatabaseType[] ,Error>({
        queryKey: ['sites'], 
        queryFn: () => fetchAllSites()
    })

    if (isSitesLoading) return (<p>Loading...</p>)
    if (isSitesError || sites === null || sites === undefined) throw sitesError;

    return (
        <SitesDashboard sites={sites} />
    )
}

interface SitesDashboardProps {
    sites: SiteDatabaseType[],
}

function SitesDashboard ({sites}: SitesDashboardProps) {

    const [filteredSites, setFilteredSites] = useState(sites)
    const [isFiltered, setIsFiltered] = useState({
        isFiltered: false,
        search: {
            isSearch: false, 
            searchTag: '',
        },
        region: {
            isRegion: false,
            regionTag: ''
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
    const resetRegion = () => {
        return setIsFiltered((prev) => {
            const isFiltersActive = prev.search.isSearch;
            return {
                ...prev,
                isFiltered: isFiltersActive,
                region: {
                    isRegion: false,
                    regionTag: '',
                }
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
                regionTag: ''
            }
        })
        setFilteredSites(sites)
    }

    return (
        <div>
            <FilterSection setSearchSite={searchSite} setActiveRegion={setRegion} resetFilters={resetFilters} resetRegion={resetRegion}/>
            <SitesSection sites={filteredSites}/>
        </div>
    )
}