import type { AffinionDatabaseType } from "@/types/affinion"
import type { SiteDatabaseType } from "@/types/site"
import fetchAllSites from "@/utils/fetchAllSites"
import { useQuery } from "@tanstack/react-query"
import fetchAllAffinions from "@/utils/fetchAllAffinions"
import moment from "moment"

export default function ReportSection () {

    const { data: sites, isLoading: isSitesLoading, isError: isSitesError, error: sitesError } = useQuery<SiteDatabaseType[] ,Error>({
        queryKey: ['sites'], 
        queryFn: () => fetchAllSites()
    })
    const { data: allAffinions, isLoading: isAllAffinionsLoading, isError: isAllAffinionsError, error: allAffinionsError } = useQuery<AffinionDatabaseType[], Error>({
        queryKey: ['allAffinions'],
        queryFn: () => fetchAllAffinions()
    })

    if (isSitesLoading || isAllAffinionsLoading) return (<p>Loading...</p>)
    if (isSitesError || sites === null || sites === undefined) throw sitesError;
    if (isAllAffinionsError || allAffinions === null || allAffinions === undefined) throw allAffinionsError

    return (
        <div>
            <div>
                <p className="font-bold">LAST CLEANED</p>
                {
                    allAffinions.map((affinion) => {
                        return (
                            <OutOfClean affinion={affinion}/>
                        )
                    })
                }
            </div>
            <div>
                <p className="font-bold">OUT OF CALIBRATIONS</p>
            </div>
        </div>
    )
}

interface OutOfCleanProps {
    affinion: AffinionDatabaseType,
}


function OutOfClean ({ affinion }: OutOfCleanProps) {

    return (
        <div className="flex justify-between">
            <p>SITE NAME</p>
            <p>Affinion {affinion.affinion_number}</p>
            <p>
                Last Cleaned: <span>{moment(affinion.last_clean).format('Do MMM')}</span>
            </p>
        </div>
    )
}
