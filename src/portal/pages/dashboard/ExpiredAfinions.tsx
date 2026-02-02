import fetchAllAfinions from "@/services/afinions/fetchAllAfinions"
import { useQuery } from "@tanstack/react-query"
import type { AfinionDatabaseType } from "@/types/afinion"
import moment from "moment"
import fetchAllSites from "@/services/sites/fetchAllSites"
import type { SiteDatabaseType } from "@/types/site"

export default function ExpiredAfinions () {

	const { data: allAfinions, isLoading: isAllAfinionsLoading, isError: isAllAfinionsError, error: allAfinionsError } = useQuery<AfinionDatabaseType[]>({
		queryKey: ['allAfinions'],
		queryFn: () => fetchAllAfinions(),
	})
	const { data: allSites, isLoading: isAllSitesLoading, isError: isAllSitesError, error: allSitesError } = useQuery<SiteDatabaseType[]>({
		queryKey: ['allSites'],
		queryFn: () => fetchAllSites()
	})

	if (isAllAfinionsLoading || isAllSitesLoading) (<p>Loading...</p>)
	if (isAllAfinionsError) throw allAfinionsError
	if (allAfinions === null || allAfinions === undefined) (<p>Could not find any afinions</p>)
	if (isAllSitesError) throw allSitesError
	if (allSites === null || allSites === undefined) (<p>Error fetching the all sites</p>)	

	const sevenDaysAgo = moment().subtract(7, 'days');

	const expiredAfinions = allAfinions?.filter((afinion) => {
		const isExpired = moment(afinion.last_calibrated).isBefore(sevenDaysAgo)
		if (isExpired) return afinion
	})

	if (expiredAfinions === undefined || expiredAfinions.length === 0) {
		return (
			<div className="flex justify-center items-center">
				<p>All Afinions Calibrations are up to date!</p>
			</div>
		)
	}

	return (
		<div className="bg-gray-50 p-4 rounded">
			<h1 className="hidden md:block">CALIBRATIONS</h1>
			<table className="w-full bg-white">
					<thead className="bg-gray-50">
					<tr>
						<th className="text-start font-medium text-xs p-1 text-gray-500">SITE</th>
						<th className="hidden md:table-cell text-start font-medium text-xs text-gray-500">AFINION</th>
						<th className="text-start font-medium text-xs text-gray-500">DATE</th>
					</tr>
				</thead>
				<tbody>
					{
						expiredAfinions?.map((afinion) => {
							const site = allSites?.find(site => site.site_id === afinion.site_id)
							return (
								<tr className="border border-gray-200" key={afinion.afinion_id}>
									<td className="text-start text-sm p-1 text-gray-600 p-2">{site?.site_name}</td>
									<td className="hidden md:table-cell text-start text-sm text-gray-600">NH{afinion.nh_number}</td>
									<td className="text-start text-sm text-red-800">{moment(afinion.last_calibrated).format('Do MMM')}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}
