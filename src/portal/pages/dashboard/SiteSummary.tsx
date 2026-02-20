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
			<DashboardCards title='Calibrated Sites' dataPoint={calibratedSites ? calibratedSites.length : 0} icon={faSquareCheck} fontClass={'text-success bg-success/25'} cardClass={'bg-success/10 border-success/25'}/>
			<DashboardCards title='Flagging' dataPoint={1} icon={faTriangleExclamation} fontClass={'text-warning bg-warning/25'} cardClass={'bg-warning/10 border-warning/25'}/>
			<DashboardCards title='Flagging Calibrations' dataPoint={sitesFlaggingCalibrations ? sitesFlaggingCalibrations.length : 0} icon={faBug} fontClass={'text-warning bg-warning/25'} cardClass={'bg-warning/10 border-warning/25'}/>
			<DashboardCards title='Flagging Cleans' dataPoint={1} icon={faHandSparkles} fontClass={'text-warning bg-warning/25'} cardClass={'bg-warning/10 border-warning/25'}/>
		</div>
	)
}

interface DashboardCardsProps {
	title: string,
	dataPoint: number,
	icon: IconDefinition,
	fontClass: string,
	cardClass: string,
}

function DashboardCards ({dataPoint, title, icon, fontClass, cardClass}: DashboardCardsProps) {

	return (
		<div className={`p-2 rounded flex items-center justify-start gap-5 border ${cardClass}`}>
			<FontAwesomeIcon icon={icon} className={`text-secondary-foreground text-2xl md:text-md p-4 ${fontClass} rounded`}/>
			<div className="flex flex-col justify-center items-start">
				<h1 className="text-xs md:text-lg text-neutral-light font-light">{title}</h1>
				<p className="text-md text-center md:text-xl">{dataPoint}</p>
			</div>
		</div>
	)
}