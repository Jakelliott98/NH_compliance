import { useContext, useState } from 'react'
import RegionContext from '../../../components/context/RegionContext'
import RegionsFilter from './components/Regions/RegionFilter'
import SitesSection from './components/SitesSection'
import type { SiteData } from '../../../types/site'

interface ActiveRegionState{
    activeRegion: string,
    isFiltered: boolean,
}

export default function SitesDashboard () {

    const context = useContext(RegionContext)

    if (context === null) {
        throw new Error('RegionContext has to be used within <RegionContext.Provider>')
    }

    const { complianceData } = context;
    
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

    const filteredSites = activeRegion.isFiltered ? complianceData.sites.data.filter((item: SiteData) => {return item.site_region === activeRegion.activeRegion}) : complianceData.sites.data;

    return (
        <div className=''>
            <RegionsFilter activeRegion={activeRegion.activeRegion} selectRegion={selectRegion}/>
            <SitesSection sites={filteredSites} />
        </div>
    )
}