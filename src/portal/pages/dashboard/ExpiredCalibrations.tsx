import moment from "moment"
import useAllSites from "@/services/sites/useAllSites"
import useAllControls from "@/services/controls/useAllControls"

export default function ExpiredCalibrations () {

	const { data: allControls, isLoading: isAllControlsLoading, isError: isAllControlsError, error: allControlsError } = useAllControls()
	const { data: allSites, isLoading: isAllSitesLoading, isError: isAllSitesError, error: allSitesError } = useAllSites()
	
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
	
	if (expiredControls === undefined || expiredControls.length === 0) {
		return (
			<div className="flex justify-center items-center">
				<p>All Controls are up to date!</p>
			</div>
		)
	}

	return (
		<div className="bg-gray-50 p-4 rounded">
			<h1 className="sm-hidden-block">CONTROLS</h1>
				<table className="w-full bg-white">
					<thead className="bg-gray-50">
						<tr className="">
							<th className="text-start font-medium text-xs p-1 text-gray-500">SITE</th>
							<th className="hidden md:table-cell text-start font-medium text-xs text-gray-500">LOT</th>
							<th className="text-start font-medium text-xs text-gray-500">EXPIRED</th>
						</tr>
					</thead>
					<tbody>
						{
							expiredControls?.map((control) => {
								const site = allSites?.find(site => site.site_id === control.site_id)
								return (
									<tr className="border border-gray-200" key={control.id}>
										<td className="text-start text-sm p-1 text-gray-600 p-2">{site?.site_name}</td>
										<td className="hidden md:table-cell text-start text-sm text-gray-600">{control.control_type === 'hba1c' ? 'HBA1c' : 'Lipids'}</td>
										<td className="text-start text-sm text-red-800">{moment(control.expiry_date).format('Do MMM')}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
		</div>
	)

}