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
        <div className={`${ isCalibrated ? 'bg-white' : 'bg-red-100'} rounded-xl w-full h-full p-4 border-solid border-2 border-gray-400 cursor-pointer`}>
            <div className="border-b-1 border-dashed border-black flex flex-col pb-1">
                    <p className="text-sm">{site.site_name}</p>
                    <p className="text-xs text-gray-400">{site.team_leader}</p>
            </div>
            <p className={`text-xs pt-1  ${!isCalibrated ? 'text-red-700' : ''}`}>Last Calibrated: {difference} days ago </p>
            <div className="pt-2">
                {
                    sortedAffinions.map((affinion) => {
                        return (
                            <div className="flex justify-between">
                                <p className='text-sm'>Affinion {affinion.affinion_number}</p>
                                <p className={`text-sm ${!affinion.last_calibrated && 'italic'}`} >{affinion.last_calibrated ? moment(affinion.last_calibrated).format('DD MMM') : 'No calibrations'}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}