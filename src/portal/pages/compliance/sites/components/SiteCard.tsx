import fetchAfinions from '@/services/afinions/fetchAfinions';
import { useQuery } from '@tanstack/react-query';
import type { SiteDatabaseType } from '@/types/site';
import type { AfinionDatabaseType } from '@/types/afinion';
import moment from 'moment';

interface SiteCardProps {
    site: SiteDatabaseType,
}

export default function SiteCard ({site}: SiteCardProps) {

    const difference = moment().diff(site.last_calibrated, "days");
    const isCalibrated = difference <= 7 ? true : false;
    const { data: afinions, isLoading, isError} = useQuery<AfinionDatabaseType[]>({
        queryKey: ['siteAfinions', site.site_id], 
        queryFn: () => fetchAfinions(site.site_id)
    })
    if (isLoading) return (<p>Loading...</p>)
    if (isError || !afinions) return (<p>Error fetching the sites</p>)
    const sortedAfinions = afinions.sort((a, b) => a.afinion_number - b.afinion_number)

    return (
        <div className={`${ isCalibrated ? 'bg-l-green-800' : 'border-l-red-800'} bg-white rounded w-full h-full p-4 border-l border-l-5 border-l-green-700 border border-gray-400 cursor-pointer`}>
            <div className="border-b-1 border-gray-200 flex flex-col pb-1">
                    <p className="text-sm text-gray-700">{site.site_name}</p>
                    <p className="text-xs text-gray-500">{site.team_leader}</p>
            </div>
            <p className={`text-xs pt-1  ${!isCalibrated ? 'text-red-800' : ''}`}>
                {difference ? `Last Calibrated: ${difference} days ago` : 'No Calibration Record'}
            </p>
            <div className="pt-2 hidden md:block">
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