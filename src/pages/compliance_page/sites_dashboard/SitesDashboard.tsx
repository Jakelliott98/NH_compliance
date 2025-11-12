import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import SiteCard from './SiteCard'
import { useContext, useState } from 'react'
import RegionContext from '../../../components/context/RegionContext'
library.add(fas, far, fab)

export default function SitesDashboard () {

    const [activeRegion, setActiveRegion] = useState('')
    const { complianceData } = useContext(RegionContext)

    return (
        <div className=''>
            <div className="flex p-2">
                <div className="flex flex-cols flex-1 gap-5">
                    {
                        complianceData.regions.data.map((item) => {
                            return (
                                <RegionCard region={item} activeRegion={activeRegion} setActiveRegion={setActiveRegion}/>
                            )
                        })
                    }
                </div>
                <div className="flex gap-2 justify-center content-center">
                    <div className='p-2 bg-white rounded-full border-solid border-2 border-green-200'>
                        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    </div>
                    <div className='p-2 bg-white border-solid border-2 border-green-200 rounded-lg flex gap-1'>
                        <p>Filters</p>
                        <FontAwesomeIcon className='self-center' icon="fa-solid fa-caret-down" />
                    </div>
                </div>
            </div>
            <div className='p-2'>
                    <h1 className='text-lg'>Sites</h1>
                    <div className='grid grid-cols-4 gap-4'>
                        {
                            complianceData.sites.data.map((item) => {
                                return (
                                     <SiteCard site={item.site_name} teamLeader={item.team_leader}/> // ADD PERSONAL INFORMATION
                                )
                            })
                        }                                              
                    </div>
            </div>
        </div>
    )
}

interface RegionObj {
    region: string,
    number: number, 
    status: string,
}

interface RegionCardProp {
    region: Array<RegionObj>,
    activeRegion: string,
    setActiveRegion: (region: string) => void,
}

function RegionCard ({ region, activeRegion, setActiveRegion }: RegionCardProp) {

    return (
        <div className={`${ activeRegion === region.region ? 'bg-green-500' : 'bg-white'} border-green-200 border-2 border-solid rounded-xl flex gap-2 content-center justify-center py-1 px-2 cursor-pointer`} onClick={() => {setActiveRegion(region.region)}}>
            <p className='self-center'>{region.region}</p>
            <div className="self-center bg-green-200 rounded-full p-1"><p className='text-green-700'>{ 23}</p></div>
            <div className="self-center bg-red-200 rounded-full p-1"><p className='text-red-700'>{ 50 }</p></div>
        </div>
    )
}


