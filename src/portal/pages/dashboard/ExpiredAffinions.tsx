import fetchAllAffinions from "@/utils/fetchAllAffinions"
import { useQuery } from "@tanstack/react-query"
import type { AffinionDatabaseType } from "@/types/affinion"
import moment from "moment"
import fetchAllSites from "@/utils/fetchAllSites"
import type { SiteDatabaseType } from "@/types/site"

export default function ExpiredAffinions () {

	const { data: allAffinions, isLoading: isAllAffinionsLoading, isError: isAllAffinionsError, error: allAffinionsError } = useQuery<AffinionDatabaseType[]>({
		queryKey: ['allAffinions'],
		queryFn: () => fetchAllAffinions(),
	})
	const { data: allSites, isLoading: isAllSitesLoading, isError: isAllSitesError, error: allSitesError } = useQuery<SiteDatabaseType[]>({
		queryKey: ['allSites'],
		queryFn: () => fetchAllSites()
	})

	if (isAllAffinionsLoading || isAllSitesLoading) (<p>Loading...</p>)
	if (isAllAffinionsError) throw allAffinionsError
	if (allAffinions === null || allAffinions === undefined) (<p>Could not find any affinions</p>)
	if (isAllSitesError) throw allSitesError
	if (allSites === null || allSites === undefined) (<p>Error fetching the all sites</p>)	

	const sevenDaysAgo = moment().subtract(7, 'days');

	const expiredAffinions = allAffinions?.filter((affinion) => {
		const isExpired = moment(affinion.last_calibrated).isBefore(sevenDaysAgo)
		if (isExpired) return affinion
	})

	return (
		<div className="bg-white p-4 rounded">
			<p className="font-semibold text-center">CALIBRATIONS</p>
			<table className="w-full">
				<thead>
					<tr>
						<th className="text-start font-medium text-sm">SITE</th>
						<th className="text-start font-medium text-sm">AFFINION</th>
						<th className="text-start font-medium text-sm">DATE</th>
					</tr>
				</thead>
				<tbody>
					{
						expiredAffinions?.map((affinion) => {
							const site = allSites?.find(site => site.site_id === affinion.site_id)
							return (
								<tr>
									<td className="text-start text-sm">{site?.site_name}</td>
									<td className="text-start text-sm">NH{affinion.nh_number}</td>
									<td className="text-start text-sm">{moment(affinion.last_calibrated).format('Do MMM')}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}
