import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

import { useContext, useState } from 'react'
import RegionContext from '../../../../components/context/RegionContext'

interface RegionsFilterProps {
    activeRegion: string,
    selectRegion: () => void,
}

export default function RegionsFilter({activeRegion, selectRegion}: RegionsFilterProps) {

    const { complianceData } = useContext(RegionContext)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    const searchInput = <input className='text-gray-500 border-l-2 px-2 border-gray-300 border-solid focus:outline-none' placeholder='Search for a site...'></input>


    return (
        <div className="flex p-2">
            <div className="flex flex-cols flex-1 gap-5">
                {
                    complianceData.regions.data.map((item) => {
                        return (
                            <RegionCard key={item.id} region={item} activeRegion={activeRegion} onSelected={selectRegion}/>
                        )
                    })
                }
            </div>
            <div className="flex gap-2 justify-center content-center">
                <div className='p-2 bg-white rounded-lg border-solid border-2 border-green-200 flex gap-2' onClick={() => {setIsSearchOpen(true)}}>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className=' text-gray-300 self-center'/>
                    { isSearchOpen && searchInput }
                </div>
                <div className='p-2 bg-white border-solid border-2 border-green-200 rounded-lg flex gap-1'>
                    <p>Filters</p>
                    <FontAwesomeIcon className='self-center' icon="fa-solid fa-caret-down" />
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
    onSelected: (region: string) => void,
}

function RegionCard ({ region, activeRegion, onSelected }: RegionCardProp) {

    return (
        <div 
            className={`${ activeRegion === region.region ? 'bg-green-500' : 'bg-white'} border-green-200 border-2 border-solid rounded-xl flex gap-2 content-center justify-center py-1 px-2 cursor-pointer`} 
            onClick={() => {onSelected(region.region)}}
        >
            <p className='self-center'>{region.region}</p>
            <div className="self-center bg-green-200 rounded-full p-1"><p className='text-green-700'>{ 23}</p></div>
            <div className="self-center bg-red-200 rounded-full p-1"><p className='text-red-700'>{ 50 }</p></div>
        </div>
    )
}


