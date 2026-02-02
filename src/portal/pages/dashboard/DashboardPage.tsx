import SiteSummary from "./SiteSummary"
import ExpiredAfinions from "./ExpiredAfinions"
import ExpiredCalibrations from "./ExpiredCalibrations"
import ExpiredCleans from "./ExpiredCleans"

export default function DashboardPage () {

    return (
		<div className="p-2">
			<div className="flex justify-between items-center pb-2 border-b border-gray-200">
				<div className="">
					<h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
					<p className="text-sm text-gray-500">Welcome back, here is your overview of all the sites.</p>
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
					<ExpiredAfinions />
					<ExpiredCalibrations />
				</div>
			</div>
			</div>
		</div>
    )
}

