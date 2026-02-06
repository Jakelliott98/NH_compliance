import { useParams } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"
import { useSiteBySlug } from '@/services/sites'
import { useAfinions } from "@/services/afinions"

export default function AfinionSection () {

    const siteSlug = useParams().Site
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useSiteBySlug(siteSlug)
    const { data: afinions, isError: afinionError, isLoading: afinionsLoading } = useAfinions(activeSite)

    if (siteError) return <p>Error loading site</p>;
    if (!activeSite) return <p>No site found</p>;
    if (siteLoading || afinionsLoading ) return <p>Loading...</p>;
    if (afinionError) return (<p>Something went wrong...</p>)
    if (!afinions) return (<p>No afinions found</p>)

    const sortedAfinions = afinions.sort((a, b) => a.afinion_number - b.afinion_number)

    if (afinions.length === 0) {
        return (
            <div>
                <p className="text-sm text-center text-red-900 italic">Site currently has no afinions</p>
            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col gap-3'>
            <div className="flex [&>*]:flex-1 gap-8">
                <table className="">
                    <thead className="text-xs text-gray-400  bg-gray-100">
                        <tr>
                            <th className="text-center font-medium pl-2 py-2">Afinion</th>
                            <th className="hidden md:table-cell text-center font-medium">NH Number</th>
                            <th className="hidden md:table-cell text-center font-medium">Last Calibration</th>
                            <th className="md:hidden text-center font-medium">Calibrated</th>
                            <th className="md:hidden text-center font-medium">Cleaned</th>
                            <th className="hidden md:table-cell text-center font-medium">Last Clean</th>
                            <th className="hidden md:table-cell text-center font-medium pr-2">Status</th>
                        </tr>
                    </thead> 
                    <tbody className="">
                        {
                            sortedAfinions.map((afinion) => {
                                return (
                                    <tr className="text-sm text-gray-600 bg-white">
                                        <td className="pl-2 py-1 text-center">{afinion.afinion_number}</td>
                                        <td className="hidden md:table-cell text-center">NH{afinion.nh_number}</td>
                                        <td className="hidden md:table-cell text-center">{afinion.last_calibrated ? moment(afinion.last_calibrated).format("Do MMM") : 'No calibrations'}</td>
                                        <td className="md:hidden text-center pr-2"><FontAwesomeIcon icon={faCircle} className={`${afinion.last_calibrated ? 'text-green-700' : 'text-red-700'} text-xs`}/></td>
                                        <td className="md:hidden text-center pr-2"><FontAwesomeIcon icon={faCircle} className={`${afinion.last_clean ? 'text-green-700' : 'text-red-700'} text-xs`}/></td>
                                        <td className="hidden md:table-cell text-center">{afinion.last_clean ? moment(afinion.last_clean).format("Do MMM") : 'No cleans'}</td>
                                        <td className="hidden md:table-cell text-center pr-2"><FontAwesomeIcon icon={faCircle} className={`${afinion.last_clean && afinion.last_calibrated ? 'text-green-700' : 'text-red-700'} text-xs`}/></td>
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