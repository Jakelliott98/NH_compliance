import fetchAffinions from '@/utils/fetchAffinions';
import { useQuery } from '@tanstack/react-query';
import type { SiteDatabaseType } from '@/types/site';
import type { AffinionDatabaseType } from '@/types/affinion';
import moment from 'moment';

interface SiteCardProps {
    site: SiteDatabaseType,
}

export default function SiteCard ({site}: SiteCardProps) {

    const difference = moment().diff(site.last_calibrated, "days");
    const isCalibrated = difference <= 7 ? true : false;
    const { data: affinions, isLoading, isError} = useQuery<AffinionDatabaseType[]>({
        queryKey: ['siteAffinions', site.site_id], 
        queryFn: () => fetchAffinions(site.site_id)
    })
    if (isLoading) return (<p>Loading...</p>)
    if (isError || !affinions) return (<p>Error fetching the sites</p>)
    const sortedAffinions = affinions.sort((a, b) => a.affinion_number - b.affinion_number)

    return (
        <div className={`${ isCalibrated ? 'bg-l-green-800' : 'border-l-red-800'} bg-white rounded w-full h-full p-4 border-l border-l-5 border-l-green-700 border border-gray-400 cursor-pointer`}>
            <div className="border-b-1 border-gray-200 flex flex-col pb-1">
                    <p className="text-sm text-gray-700">{site.site_name}</p>
                    <p className="text-xs text-gray-500">{site.team_leader}</p>
            </div>
            <p className={`text-xs pt-1  ${!isCalibrated ? 'text-red-800' : ''}`}>
                {difference ? `Last Calibrated: ${difference} days ago` : 'No Calibration Record'}
            </p>
            <div className="pt-2">
                {
                    sortedAffinions.length === 0 && (
                        <p className='text-xs italic text-gray-500'>No affinions added yet</p>
                    )
                }
                {
                    sortedAffinions.map((affinion) => {
                        return (
                            <div className="flex justify-between" key={affinion.affinion_id}>
                                <p className='text-xs text-gray-500'>Affinion {affinion.affinion_number}</p>
                                <p className={`text-xs ${!affinion.last_calibrated && 'italic'} text-gray-500`} >{affinion.last_calibrated ? moment(affinion.last_calibrated).format('DD MMM') : 'No calibrations'}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}