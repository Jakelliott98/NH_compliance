import { useQuery } from "@tanstack/react-query";
import type { SiteDatabaseType } from "@/types/site";
import fetchAllSites from "@/utils/fetchAllSites";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faTriangleExclamation, faHandSparkles, faBug } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';


export default function SiteSummary () {

	    const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useQuery<SiteDatabaseType[]>({
        queryKey: ['allSites'], 
        queryFn: fetchAllSites
    })
    
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
		<div className="flex justify-between [&>*]:flex-1 gap-12">
			<DashboardCards title='Calibrated Sites' dataPoint={calibratedSites.length} icon={faSquareCheck}/>
			<DashboardCards title='Flagging' dataPoint={1} icon={faTriangleExclamation}/>
			<DashboardCards title='Flagging Calibrations' dataPoint={sitesFlaggingCalibrations.length} icon={faBug}/>
			<DashboardCards title='Flagging Cleans' dataPoint={1} icon={faHandSparkles}/>
		</div>
	)
}

interface DashboardCardsProps {
	title: string,
	dataPoint: number,
	icon: IconDefinition,
}

function DashboardCards ({dataPoint, title, icon}: DashboardCardsProps) {

	return (
		<div className="bg-white p-4 rounded flex flex-col">
			<div>
				<FontAwesomeIcon icon={icon} className="text-green-800"/>
			</div>
			<p className="text-gray-700 font-light">{title}</p>
			<p className="text-lg">{dataPoint}</p>
			<div className="flex gap-1 items-center text-gray-500 text-xs cursor-pointer hover:text-black">
				<p>View More →</p>
			</div>
		</div>
	)
}