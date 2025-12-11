import { useState } from 'react'
import RegionsFilter from './components/Regions/RegionFilter'
import SitesSection from './components/SitesSection'
import type { SiteData } from '@/types/site'
import { useQuery } from '@tanstack/react-query'
import fetchAllSites from '@/utils/fetchAllSites'

interface ActiveRegionState{
    activeRegion: string,
    isFiltered: boolean,
}

export default function SitesDashboard () {

    const { data: allSites, isLoading: allSitesLoading, isError: allSitesError } = useQuery({queryKey: ['sites'], queryFn: () => fetchAllSites()})

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

    if (allSitesLoading) return (<p>Loading...</p>)
    if (allSitesError || allSites === null || allSites === undefined) throw new Error('Error fetching all sites')

    const filteredSites = activeRegion.isFiltered ? allSites.filter((item: SiteData) => {return item.site_region === activeRegion.activeRegion}) : allSites;

    return (
        <div className=''>
            <RegionsFilter activeRegion={activeRegion.activeRegion} selectRegion={selectRegion}/>
            <SitesSection sites={filteredSites} />
        </div>
    )
}