import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useAllSites } from '@/services/sites'
import { useAllAfinions } from "@/services/afinions";


export default function SiteSummary () {

	const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useAllSites()
	const { data: allAfinions, isLoading: isAllAfinionsLoading, isError: isAllAfinionsError, error: allAfinionsError } = useAllAfinions()
	
    if (isAllSitesError) throw allSitesError;
	if (isAllAfinionsError) throw allAfinionsError;
    if (isAllSitesLoading || isAllAfinionsLoading) return (<p>Loading...</p>)

	const sevenDaysAgo = moment().subtract(7, 'days');
	
	const sitesFlaggingCalibrations = allSites?.filter((site) => { 
		const isCalibrationExpired = moment(site.last_calibrated).isBefore(sevenDaysAgo) || !site.last_calibrated
		if (isCalibrationExpired) return site;
	})

	const calibratedSites = allSites?.filter((site) => { 
		const isCalibrationExpired = moment(site.last_calibrated).isBefore(sevenDaysAgo) || !site.last_calibrated
		if (!isCalibrationExpired) return site;
	})

	const flaggingafinions = allAfinions?.filter((afinion) => {
		const isExpired = moment(afinion.last_clean).isBefore(sevenDaysAgo) || !afinion.last_clean
		if (!isExpired) return afinion;
	})

	const calibratedAfinions = allAfinions?.filter((afinion) => { 
		const isCalibrationExpired = moment(afinion.last_calibrated).isBefore(sevenDaysAgo) || !afinion.last_clean
		if (isCalibrationExpired) return afinion;
	})


	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-12">
			<DashboardCards title='Calibrated Sites' dataPoint={calibratedSites ? calibratedSites.length : 0} icon={faSquareCheck} fontClass={'text-success bg-success/25'} cardClass={'bg-success/10 border-success/25'}/>
			<DashboardCards title='Flagging Sites' dataPoint={sitesFlaggingCalibrations ? sitesFlaggingCalibrations.length : 0} icon={faTriangleExclamation} fontClass={'text-warning bg-warning/25'} cardClass={'bg-warning/10 border-warning/25'}/>
			<DashboardCards title='Calibrated Afinions' dataPoint={flaggingafinions ? flaggingafinions.length : 0} icon={faSquareCheck} fontClass={'text-success bg-success/25'} cardClass={'bg-success/10 border-success/25'}/>			
			<DashboardCards title='Flagging Afinions' dataPoint={calibratedAfinions ? calibratedAfinions.length : 0} icon={faTriangleExclamation} fontClass={'text-warning bg-warning/25'} cardClass={'bg-warning/10 border-warning/25'}/>
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
				<h1 className="text-xs md:text-base lg:text-lg text-neutral-light font-light">{title}</h1>
				<p className="text-md text-center md:text-xl">{dataPoint}</p>
			</div>
		</div>
	)
}