import SiteSummary from "./SiteSummary"
import ExpiredAffinions from "./ExpiredAffinions"
import ExpiredCalibrations from "./ExpiredCalibrations"
import ExpiredCleans from "./ExpiredCleans"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

export default function DashboardPage () {

    return (
		<div className="p-2">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
					<p className="text-sm text-gray-500">Welcome back, here is your overview of all the sites.</p>
				</div>
				<div className="rounded border border-gray-200 py-1 px-2 flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700">
					<FontAwesomeIcon icon={faFilter} />
					<p>Filter</p>
				</div>
			</div>
			<div className="flex flex-col gap-5 my-2">
			<SiteSummary />
			<div className="bg-white p-2">
				<div className="mb-2">
					<h1 className="text-xl font-bold text-gray-800">Expired</h1>
					<p className="text-sm text-gray-500">All the flagging checks from the sites</p>
				</div>
				<div className="flex justify-between [&>*]:flex-1 gap-3">
					<ExpiredCleans />
					<ExpiredAffinions />
					<ExpiredCalibrations />
				</div>
			</div>
			</div>
		</div>
    )
}
