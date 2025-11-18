interface RegionObj {
    region: string,
    number: number, 
    status: string,
}

interface RegionCardProp {
    region: RegionObj,
    activeRegion: string,
    onSelected: (region: string) => void,
}

export default function RegionCard ({ region, activeRegion, onSelected }: RegionCardProp) {

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


