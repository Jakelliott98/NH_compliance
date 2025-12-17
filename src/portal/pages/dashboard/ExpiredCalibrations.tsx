import type { CalibrationDatabaseType } from "@/types/calibration"
import type { SiteDatabaseType } from "@/types/site"
import fetchAllControls from "@/utils/fetchAllControls"
import fetchAllSites from "@/utils/fetchAllSites"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"

export default function ExpiredCalibrations () {

	const { data: allControls, isLoading: isAllControlsLoading, isError: isAllControlsError, error: allControlsError } = useQuery<CalibrationDatabaseType[]>({
		queryKey: ['allControls'],
		queryFn: () => fetchAllControls(),
	})
	const { data: allSites, isLoading: isAllSitesLoading, isError: isAllSitesError, error: allSitesError } = useQuery<SiteDatabaseType[]>({
		queryKey: ['allSites'],
		queryFn: () => fetchAllSites()
	})
	if (isAllControlsLoading || isAllSitesLoading) (<p>Loading...</p>)
	if (isAllControlsError) throw allControlsError
	if (allControls === null || allControls === undefined) (<p>Error fetching the calibrations</p>)
	if (allSites === null || allSites === undefined) (<p>Error fetching the all sites</p>)
	if (isAllSitesError) throw allSitesError

	const expiredControls = allControls?.filter((control) => {
			return control.test_type === 'hba1c' || control.test_type === 'total'
		})
		.filter((control) => {
			return moment(control.expiry_date).isBefore(moment())
		})

	return (
		<div className="bg-white p-4 rounded">
			<p className="font-semibold text-center">CONTROLS</p>
			<table className="w-full">
				<thead>
					<tr>
						<th className="text-start font-medium text-sm">SITE</th>
						<th className="text-start font-medium text-sm">LOT</th>
						<th className="text-start font-medium text-sm">EXPIRED</th>
					</tr>
				</thead>
				<tbody>
					{
						expiredControls?.map((control) => {
							const site = allSites?.find(site => site.site_id === control.site_id)
							return (
								<tr>
									<td className="text-start text-sm">{site?.site_name}</td>
									<td className="text-start text-sm">{control.control_type === 'hba1c' ? 'HBA1c' : 'Lipids'}</td>
									<td className="text-start text-sm text-red-700">{moment(control.expiry_date).format('Do MMM')}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)

}