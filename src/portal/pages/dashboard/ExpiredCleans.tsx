

export default function ExpiredCleans () {

    // Fetch all affinions
    // Filter by any > 30 days since last clean
    // Map affinions

	return (
		<div className="bg-white p-4 rounded">
			<p className="font-semibold text-center">Cleans</p>
			<table className="w-full">
				<thead>
					<tr>
						<th className="text-start">Site</th>
						<th className="text-start">Affinion</th>
						<th className="text-start">Date</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="text-start">Canary Wharf</td>
						<td className="text-start">2</td>
						<td className="text-start">27th Nov</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
