
export default function ExpiredCalibrations () {

	// Fetch all calibrations
	// Filter by expiry date if it has passed
	// Map all the expired calibration controls & Site locations

	return (
		<div className="bg-white p-4 rounded">
			<p className="font-semibold text-center">Controls</p>
			<table className="w-full">
				<thead>
					<tr>
						<th className="text-start">Site</th>
						<th className="text-start">LOT</th>
						<th className="text-start">Date</th>
					</tr>
				</thead>
			</table>
		</div>
	)

}