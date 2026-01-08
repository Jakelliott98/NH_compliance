import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import fetchAllSites from "@/utils/fetchAllSites"
import type { SiteDatabaseType } from "@/types/site"
import moment from "moment"
import EditSiteContainer from "./EditSite"
import DeleteSiteContainer from "./DeleteSite"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import addSite from "@/portal/utils/addSite"
import AddSiteSection from "./AddSiteSection"

export default function OrganiseSites () {

    const methods = useForm();
    const { handleSubmit }  = methods;
    const queryClient = useQueryClient();

    const { data: allSites, isLoading: isAllSitesLoading, isError: isAllSitesError, error: allSitesError } = useQuery<SiteDatabaseType[]>({
        queryKey:['allSites'], 
        queryFn: () => fetchAllSites()
    })
    const mutation = useMutation({
        mutationFn: (data) => {return addSite(data)},
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['allSites']})
    })
    if (isAllSitesLoading) (<p>Loading...</p>)
    if (isAllSitesError) throw allSitesError
    if (allSites === null || allSites === undefined) return (<p>'All Sites could not be fetched'</p>)

    const sevenDaysAgo = moment().subtract(7, 'days');

    const onAddSiteSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

    return (
        <div className="py-4">
            <div className="flex-1 border-b border-gray-200 pb-2">
                <p className="font-semibold">Organisation & Sites</p>
                <p className="text-sm text-gray-400">Manage all sites within the organisation, including adding or removing sites and assigning site managers. Changes made here affect how data is grouped and reported across the system.</p>
            </div>
            <div className="border-b border-gray-200 py-4 flex">
                <div className="flex-1">
                    <h2 className="font-semibold">Add Site</h2>
                    <p className="text-sm text-gray-400">Add a new site to the database</p>
                </div>
                <FormProvider {...methods}>
                    <AddSiteSection onSubmit={onAddSiteSubmit}/>
                </FormProvider>
            </div>
            <div className="py-2">
                <table className="w-full">
                    <thead className="bg-gray-200">
                        <tr className="bg-gray-200 [&>*]:py-2">
                            <th className="text-sm text-start pl-2">Site</th>
                            <th className="text-sm text-start">Team Leader</th>
                            <th className="text-sm">Status</th>
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
                                        <td className="text-sm text-gray-600 pl-2 pt-2">{site.site_name}</td>
                                        <td className="text-sm text-gray-600">{site.team_leader}</td>
                                        <td className="text-sm text-center"><FontAwesomeIcon icon={faCircle} className={`${isOutOfCalibration ? 'text-red-700' : 'text-green-700'}`}/></td>
                                        <td className="text-sm text-gray-500 text-center"><EditSiteContainer site={site}/></td>
                                        <td className="text-sm text-gray-500 text-center"><DeleteSiteContainer site={site}/></td>
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
