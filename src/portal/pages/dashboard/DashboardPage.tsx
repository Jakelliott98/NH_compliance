import SiteSummary from "./SiteSummary"
import ExpiredAffinions from "./ExpiredAffinions"
import ExpiredCalibrations from "./ExpiredCalibrations"
import ExpiredCleans from "./ExpiredCleans"

export default function DashboardPage () {

    return (
		<div className="">
			<SiteSummary />
			<div>
				<p className="font-bold text-center">EXPIRED</p>
				<div className="flex justify-between [&>*]:flex-1 gap-3">
					<ExpiredCleans />
					<ExpiredAffinions />
					<ExpiredCalibrations />
				</div>
			</div>
		</div>
    )
}
