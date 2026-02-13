import SiteSummary from "./SiteSummary"
import ExpiredAfinions from "./ExpiredAfinions"
import ExpiredCalibrations from "./ExpiredCalibrations"
import ExpiredCleans from "./ExpiredCleans"
import { useState } from "react"

export default function DashboardPage () {

    return (
		<div className="p-2">
			<div className="flex justify-between items-center pb-2 border-b border-gray-200">
				<header className="text-center md:text-left">
					<h1 className="text-lg md:text-2xl font-bold text-gray-800">Dashboard Overview</h1>
					<p className="md:text-sm text-gray-500">Welcome back, here is your overview of all the sites.</p>
				</header>
			</div>
			<section className="flex flex-col gap-5 my-2">
				<SiteSummary />
				<section className="bg-white p-2"> 
					<div className="sm-hidden-block">
						<DashboardTables />
					</div>
					<div className="md:hidden">
						<MobileDashboardTables />
					</div>
				</section>
			</section>
		</div>
    )
}

function DashboardTables () {

	return (
		<div>
			<div className="mb-2 text-center md:text-left">
				<h1 className="text-md md:text-xl font-bold text-gray-800">Expired</h1>
				<p className="text-xs md:text-sm text-gray-500">All the flagging checks from the sites</p>
			</div>
			<div className="hidden md:flex justify-between [&>*]:flex-1 gap-3">
				<ExpiredCleans />
				<ExpiredAfinions />
				<ExpiredCalibrations />
			</div>
		</div>
	)
}

function MobileDashboardTables () {

	const [activeTable, setActiveTable] = useState('afinions')

	return (
		<div className="flex flex-col gap-1">
			<div className="flex [&>*]:flex-1 p-1 text-center bg-slate-50">
				<p className={`${activeTable === 'afinions' && 'bg-secondary text-secondary-foreground'} text-sm p-1 rounded`} onClick={() => setActiveTable('afinions')}>Afinions</p>
				<p className={`${activeTable === 'controls' && 'bg-secondary text-secondary-foreground'} text-sm p-1 rounded`} onClick={() => setActiveTable('controls')}>Controls</p>
				<p className={`${activeTable === 'calibrations' && 'bg-secondary text-secondary-foreground'} text-sm p-1 rounded`} onClick={() => setActiveTable('calibrations')}>Calibrations</p>
			</div>
			<div>
				{
					activeTable === 'afinions' ? <ExpiredAfinions /> : activeTable === 'controls' ? <ExpiredCalibrations /> : <ExpiredCleans />
				}
			</div>
		</div>
	)

}