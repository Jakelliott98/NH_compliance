import type { CalibrationDatabaseType } from "@/types/calibration"
import fetchAllControls from "@/utils/fetchAllControls"
import { useQuery } from "@tanstack/react-query"
import moment from "moment"

export default function ExpiredCalibrations () {

	// Fetch all calibrations
	const { data: allControls, isLoading: isAllControlsLoading, isError: isAllControlsError, error: allControlsError } = useQuery<CalibrationDatabaseType[]>({
		queryKey: ['allControls'],
		queryFn: () => fetchAllControls(),
	})
	if (isAllControlsLoading) (<p>Loading...</p>)
	if (isAllControlsError) throw allControlsError
	if (allControls === null || allControls === undefined) (<p>Error fetching the calibrations</p>)
	// Filter by expiry date if it has passed
	// Map all the expired calibration controls & Site locations

	// HOW TO REDUCE THE 3 LIPID CONTROLS INTO 1 SINGLE CONTROL

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
						<th className="text-start font-medium">SITE</th>
						<th className="text-start font-medium">LOT</th>
						<th className="text-start font-medium">EXPIRED</th>
					</tr>
				</thead>
				<tbody>
					{
						expiredControls?.map((control) => {
							return (
								<tr>
									<td className="text-start text-sm">Site Name</td>
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