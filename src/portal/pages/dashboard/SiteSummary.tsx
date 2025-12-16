import { useQuery } from "@tanstack/react-query";
import type { SiteDatabaseType } from "@/types/site";
import fetchAllSites from "@/utils/fetchAllSites";
import moment from "moment";

export default function SiteSummary () {

	// Fetch all sites
	    const { data: allSites, isError: isAllSitesError, isLoading: isAllSitesLoading, error: allSitesError } = useQuery<SiteDatabaseType[]>({
        queryKey: ['allSites'], 
        queryFn: fetchAllSites
    })
    
    if (isAllSitesError) throw allSitesError;
    if (isAllSitesLoading) return (<p>Loading...</p>)

	const sevenDaysAgo = moment().subtract(7, 'days');
	
	const uncalibratedSites = allSites?.filter((site) => { 
		const isCalibrationExpired = moment(site.last_calibrated).isBefore(sevenDaysAgo)
		if (isCalibrationExpired) return site;
	})
	const calibratedSites = allSites?.filter((site) => { 
		const isCalibrationExpired = moment(site.last_calibrated).isBefore(sevenDaysAgo)
		if (!isCalibrationExpired) return site;
	})

	return (
		<div className="flex justify-between [&>*]:flex-1 gap-3">
			<div className="bg-green-200 p-4 rounded flex flex-col items-center gap-2">
				<p className="font-semibold text-xl">Calibrated Sites</p>
				<p className="text-5xl font-bold">{calibratedSites?.length}</p>
			</div>
			<div className="bg-amber-200 p-4 rounded flex flex-col items-center gap-2">
				<p className="text-center font-semibold text-xl">Concerned Sites</p>
				<p className="text-5xl font-bold">{}</p>
			</div>
			<div className="bg-red-200 p-4 rounded flex flex-col items-center gap-2">
				<p className="text-center font-semibold text-xl">Flagging Sites</p>
				<p className="text-5xl font-bold">{uncalibratedSites?.length}</p>
			</div>
		</div>
	)
}