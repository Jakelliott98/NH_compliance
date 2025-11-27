export default function DashboardPage () {

    return (
		<div className="">
			<div className=" p-3 rounded-xl">
				Total Compliance
			</div>
			<div className=" p-3 rounded-xl flex flex-row justify-around">
				<div className="bg-blue-500 p-3 rounded-xl">
					Calibrated
				</div>
				<div className="bg-blue-500 p-3 rounded-xl">
					Due Soon
				</div>
				<div className="bg-blue-500 p-3 rounded-xl">
					Overdue
				</div>
			</div>
			<div className="p-3 rounded-xl flex flex-row justify-around">
				<div className="bg-blue-500 p-3 rounded-xl">
					Flagging Sites
				</div>
				<div className="bg-blue-500 p-3 rounded-xl">
					Missing Data
				</div>
			</div>
			<div className="p-3 rounded-xl bg-white">
				<input placeholder="Search for Site of Affinion Machine..." className="w-full"/>
			</div>
		</div>
    )
}


/* 

—| Dashboard
	—| Compliance Graph ( Percentage of sites which are compliant over last 3 months / Calibrations completed on time )
	—| Region scores such as ( 3/9 Sites up to date on calibration )
	—| Current Site Flags

—| DashboardPage
	—| ComplianceReportSection
	—| RegionReports
	—| CurrentFlagsSection

*/
