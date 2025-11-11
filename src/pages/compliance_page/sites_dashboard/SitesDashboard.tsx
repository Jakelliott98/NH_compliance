import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import SiteCard from './SiteCard'
library.add(fas, far, fab)


const tempRegions = [{number: 27, region: 'North', status: 'All Calibrated'}, {number: 31, region: 'South', status: 'All Calibrated'}, {number: 12, region: 'West', status: 'All Calibrated'}, {number: 17, region: 'East', status: 'Missing Calibrations'}]

export default function SitesDashboard () {

    return (
        <div className=''>
            <div className="flex p-2">
                <div className="flex flex-cols flex-1 gap-5">
                    {
                        tempRegions.map((item) => {
                            return (
                                <RegionCard region={item} />
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
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />
                        <SiteCard />                                                
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
    region: Array<RegionObj>
}

function RegionCard ({ region }: RegionCardProp) {

    return (
        <div className="bg-white border-green-200 border-2 border-solid rounded-xl flex gap-2 content-center justify-center py-1 px-2 cursor-pointer">
            <p className='self-center'>{region.region}</p>
            <div className="self-center bg-green-200 rounded-full p-1"><p className='text-green-700'>{ region.number }</p></div>
            <div className="self-center bg-red-200 rounded-full p-1"><p className='text-red-700'>{ region.number }</p></div>
        </div>
    )
}


