import SiteCard from './SiteCard'
import { useContext, useState } from 'react'
import RegionContext from '../../../components/context/RegionContext'
import RegionsFilter from './components/RegionFilter'
import { Link } from 'react-router'

export default function SitesDashboard () {

    const { complianceData } = useContext(RegionContext)
    const [activeRegion, setActiveRegion] = useState({
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


function SitesSection({ sites }) {
    return (
        <div className='p-2'>
                <h1 className='text-lg'>Sites</h1>
                <div className='grid grid-cols-5 gap-4'>
                    {
                        sites.map((item) => {
                            return (
                                    <Link to={`${item.slug}`} key={item.site_id}><SiteCard key={item.site_id} site={item}/></Link>
                            )
                        })
                    }                                              
                </div>
        </div>
    )
}