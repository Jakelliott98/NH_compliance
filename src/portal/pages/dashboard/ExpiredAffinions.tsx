


export default function ExpiredAffinions () {

    // Fetch all affinions
    // Filter if > 7 days from today
    // Exclude any on day 7
    // Map all affinions

	return (
		<div className="bg-white p-4 rounded">
			<p className="font-semibold text-center">Affinions</p>
			<table className="w-full">
				<thead>
					<tr>
						<th className="text-start">Site</th>
						<th className="text-start">Affinion</th>
						<th className="text-start">Date</th>
					</tr>
				</thead>
			</table>
		</div>
	)
}
