import { useContext, useState } from 'react'
import RegionContext from '../../../components/context/RegionContext'
import RegionsFilter from './components/Regions/RegionFilter'
import SitesSection from './components/SitesSection'

interface ActiveRegionState{
    activeRegion: string,
    isFiltered: boolean,
}

export default function SitesDashboard () {

    const { complianceData } = useContext(RegionContext)
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

    const filteredSites = activeRegion.isFiltered ? complianceData.sites.data.filter(item => item.site_region === activeRegion.activeRegion) : complianceData.sites.data;

    return (
        <div className=''>
            <RegionsFilter activeRegion={activeRegion.activeRegion} selectRegion={selectRegion}/>
            <SitesSection sites={filteredSites} />
        </div>
    )
}