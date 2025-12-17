import fetchAllAffinions from "@/utils/fetchAllAffinions"
import { useQuery } from "@tanstack/react-query"
import type { AffinionDatabaseType } from "@/types/affinion"
import moment from "moment"

export default function ExpiredAffinions () {

	const { data: allAffinions, isLoading: isAllAffinionsLoading, isError: isAllAffinionsError, error: allAffinionsError } = useQuery<AffinionDatabaseType[]>({
		queryKey: ['allAffinions'],
		queryFn: () => fetchAllAffinions(),
	})

	if (isAllAffinionsLoading) (<p>Loading...</p>)
	if (isAllAffinionsError) throw allAffinionsError
	if (allAffinions === null || allAffinions === undefined) (<p>Could not find any affinions</p>)
	
	const sevenDaysAgo = moment().subtract(7, 'days');

	const expiredAffinions = allAffinions?.filter((affinion) => {
		const isExpired = moment(affinion.last_calibrated).isBefore(sevenDaysAgo)
		if (isExpired) return affinion
	})

    // Filter if > 7 days from today
    // Exclude any on day 7
    // Map all affinions

	return (
		<div className="bg-white p-4 rounded">
			<p className="font-semibold text-center">CALIBRATIONS</p>
			<table className="w-full">
				<thead>
					<tr>
						<th className="text-start font-medium">SITE</th>
						<th className="text-start font-medium">AFFINION</th>
						<th className="text-start font-medium">DATE</th>
					</tr>
				</thead>
				<tbody>
					{
						expiredAffinions?.map((affinion) => {
							return (
								<tr>
									<td className="text-start text-sm">Site Name</td>
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
