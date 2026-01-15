import AffinionCard from "./AffinionCard"
import { useParams } from "react-router"
import fetchSiteBySlug from "@/hooks/fetchSiteBySlug"
import fetchAffinions from "@/utils/fetchAffinions"
import { useQuery } from "@tanstack/react-query"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"

export default function AffinionSection () {

    const siteSlug = useParams().Site
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useQuery({
        queryKey: ['portalActiveSite', siteSlug],
        queryFn: () => {
            if (!siteSlug) throw new Error('Cannot find this site')
            return fetchSiteBySlug(siteSlug)
        },
            enabled: !!siteSlug,
    })
    const { data: affinions, isError: affinionError, isLoading: affinionsLoading } = useQuery({
        queryKey: ['portalAffinions', activeSite],
        queryFn: () => fetchAffinions(activeSite.site_id),
        enabled: !!activeSite,
    })

    if (siteError) return <p>Error loading site</p>;
    if (!activeSite) return <p>No site found</p>;
    if (siteLoading || affinionsLoading ) return <p>Loading...</p>;
    if (affinionError) return (<p>Something went wrong...</p>)
    if (!affinions) return (<p>No affinions found</p>)

    const sortedAffinions = affinions.sort((a, b) => a.affinion_number - b.affinion_number)

    return (
        <div className='flex-1 flex flex-col gap-3'>
            <div className="flex [&>*]:flex-1 gap-8">
                <table className="">
                    <thead className="text-xs text-gray-400  bg-gray-100">
                        <th className="text-left font-medium pl-2 py-2">Affinion</th>
                        <th className="text-center font-medium">NH Number</th>
                        <th className="text-center font-medium">Last Calibration</th>
                        <th className="text-center font-medium">Last Clean</th>
                        <th className="text-center font-medium pr-2">Status</th>
                    </thead> 
                    <tbody className="">
                        {
                            sortedAffinions.map((affinion) => {
                                return (
                                    <tr className="text-sm text-gray-600 bg-white">
                                        <td className="text-left pl-2 py-1">Affinion {affinion.affinion_number}</td>
                                        <td className="text-center">NH{affinion.nh_number}</td>
                                        <td className="text-center">{affinion.last_calibrated ? moment(affinion.last_calibrated).format("Do MMM") : 'No calibrations'}</td>
                                        <td className="text-center">{affinion.last_clean ? moment(affinion.last_clean).format("Do MMM") : 'No cleans'}</td>
                                        <td className="text-center pr-2"><FontAwesomeIcon icon={faCircle} className={`${affinion.last_clean && affinion.last_calibrated ? 'text-green-700' : 'text-red-700'} text-xs`}/></td>
                                    </tr>
                                )
                            })
                        }    
                    </tbody>   
                </table>
            </div>
        </div>
    )
}