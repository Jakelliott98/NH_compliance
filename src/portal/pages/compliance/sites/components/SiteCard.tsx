import type { SiteDatabaseType } from '@/types/site';
import moment from 'moment';
import { useAfinions } from "@/services/afinions"


interface SiteCardProps {
    site: SiteDatabaseType,
}

export default function SiteCard ({site}: SiteCardProps) {

    const difference = moment().diff(site.last_calibrated, "days");
    const isCalibrated = difference <= 7 ? true : false;
    const { data: afinions, isLoading, isError} = useAfinions(site)
    
    if (isLoading) return (<p>Loading...</p>)
    if (isError || !afinions) return (<p>Error fetching the sites</p>)
    const sortedAfinions = afinions.sort((a, b) => a.afinion_number - b.afinion_number)

    return (
        <div className={`${ isCalibrated ? 'bg-l-success' : 'border-l-warning'} bg-white rounded w-full h-full p-4 border-l border-l-5 border-l-green-700 border border-gray-400 cursor-pointer`}>
            <div className="border-b-1 border-gray-200 flex flex-col pb-1">
                    <p className="text-sm text-gray-700">{site.site_name}</p>
                    <p className="text-xs text-gray-500">{site.team_leader}</p>
            </div>
            <p className={`text-xs pt-1  ${!isCalibrated ? 'text-warning' : ''}`}>
                {difference ? `Last Calibrated: ${difference} days ago` : 'No Calibration Record'}
            </p>
            <div className="pt-2 sm-hidden-block">
                {
                    sortedAfinions.length === 0 && (
                        <p className='text-xs italic text-gray-500'>No afinions added yet</p>
                    )
                }
                {
                    sortedAfinions.map((afinion) => {
                        return (
                            <div className="flex justify-between" key={afinion.afinion_id}>
                                <p className='text-xs text-gray-500'>Afinion {afinion.afinion_number}</p>
                                <p className={`text-xs ${!afinion.last_calibrated && 'italic'} text-gray-500`} >{afinion.last_calibrated ? moment(afinion.last_calibrated).format('DD MMM') : 'No calibrations'}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}