import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"
import EditSiteContainer from "./EditSite"
import DeleteSiteContainer from "./DeleteSite"
import { FormProvider, useForm } from "react-hook-form"
import { useAddSite, type AddSiteType } from "@/services/sites"
import AddSite from "./AddSiteSection"
import { useAllSites } from '@/services/sites'

export default function OrganiseSites () {

    const methods = useForm<AddSiteType>();
    const { handleSubmit }  = methods;

    const { data: allSites, isLoading: isAllSitesLoading, isError: isAllSitesError, error: allSitesError } = useAllSites()
    const { mutate: addSite } = useAddSite()
    if (isAllSitesLoading) (<p>Loading...</p>)
    if (isAllSitesError) throw allSitesError
    if (allSites === null || allSites === undefined) return (<p>'All Sites could not be fetched'</p>)

    const sevenDaysAgo = moment().subtract(7, 'days');

    const onAddSiteSubmit = handleSubmit((data) => {
        addSite(data)
    })

    return (
        <div className="py-4">
            <div className="flex-1 border-b border-gray-200 pb-2">
                <p className="font-semibold">Organisation & Sites</p>
                <p className="sm-hidden-inline text-sm text-neutral-light">Manage all sites within the organisation, including adding or removing sites and assigning site managers. Changes made here affect how data is grouped and reported across the system.</p>
            </div>
            <div className="border-b border-gray-200 py-4 flex flex-col md:flex-row">
                <div className="flex-1">
                    <h2 className="font-semibold">Add Site</h2>
                    <p className="sm-hidden-inline text-sm text-neutral-light">Add a new site to the database</p>
                </div>
                <FormProvider {...methods}>
                    <AddSite onSubmit={onAddSiteSubmit}/>
                </FormProvider>
            </div>
            <div className="py-2">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr className="bg-gray-200 [&>*]:py-2">
                            <th className="text-sm text-start pl-2">Site</th>
                            <th className="hidden md:table-cell text-sm text-start">Team Leader</th>
                            <th className="hidden md:table-cell text-sm">Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            allSites.map((site) => {
                                const isOutOfCalibration = moment(site.last_calibrated).isBefore(sevenDaysAgo)
                                return (
                                    <tr key={site.site_id} className="border-b border-gray-200 [&>*]:pb-1">
                                        <td className="text-sm text-neutral-light pl-2 pt-2">{site.site_name}</td>
                                        <td className="hidden md:table-cell text-sm text-neutral-light">{site.team_leader}</td>
                                        <td className="hidden md:table-cell text-sm text-center"><FontAwesomeIcon icon={faCircle} className={`${isOutOfCalibration ? 'text-warning' : 'text-success'}`}/></td>
                                        <td className="text-sm text-neutral-light text-center"><EditSiteContainer site={site}/></td>
                                        <td className="text-sm text-neutral-light text-center"><DeleteSiteContainer site={site}/></td>
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
