import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faTriangleExclamation, faHandSparkles, faBug } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useAllSites } from '@/services/sites'


export default function SiteSummary () {

	    const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useAllSites()
    
    if (isAllSitesError) throw allSitesError;
    if (isAllSitesLoading) return (<p>Loading...</p>)

	const sevenDaysAgo = moment().subtract(7, 'days');
	
	const sitesFlaggingCalibrations = allSites?.filter((site) => { 
		const isCalibrationExpired = moment(site.last_calibrated).isBefore(sevenDaysAgo)
		if (isCalibrationExpired) return site;
	})
	const calibratedSites = allSites?.filter((site) => { 
		const isCalibrationExpired = moment(site.last_calibrated).isBefore(sevenDaysAgo)
		if (!isCalibrationExpired) return site;
	})

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-12">
			<DashboardCards title='Calibrated Sites' dataPoint={calibratedSites.length} icon={faSquareCheck} colour={'green'}/>
			<DashboardCards title='Flagging' dataPoint={1} icon={faTriangleExclamation} colour={'red'}/>
			<DashboardCards title='Flagging Calibrations' dataPoint={sitesFlaggingCalibrations.length} icon={faBug} colour={'red'}/>
			<DashboardCards title='Flagging Cleans' dataPoint={1} icon={faHandSparkles} colour={'red'}/>
		</div>
	)
}

interface DashboardCardsProps {
	title: string,
	dataPoint: number,
	icon: IconDefinition,
	colour: string,
}

function DashboardCards ({dataPoint, title, icon, colour}: DashboardCardsProps) {

	return (
		<div className="bg-white p-2 md:p-5 rounded flex flex-col">
			<div className="flex items-center gap-1">
				<FontAwesomeIcon icon={icon} className={`text-${colour}-700 text-xs md:text-md`}/>
				<p className="text-xs md:text-lg text-gray-700 font-light">{title}</p>
			</div>
			<p className="text-md text-center md:text-xl">{dataPoint}</p>
			<div className="sm-hidden-block flex gap-1 items-center text-gray-500 text-xs cursor-pointer hover:text-black">
				<a>View More →</a>
			</div>
		</div>
	)
}