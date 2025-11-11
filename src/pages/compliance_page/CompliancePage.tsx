import SitesDashboard from "./sites_dashboard/SitesDashboard";


export default function CompliancePage () {

    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="w-4/12 flex justify-around rounded-xl py-1 px-2 bg-white">
                    <p className="bg-green-200 py-0.5 px-2 rounded-lg">Sites</p>
                    <p className="py-0.5 px-2 rounded-lg">Reports</p>
                </div>
            </div>
            <SitesDashboard />
        </div>
    )
}

function ReportSection () {
    return (
        <p>Report Section</p>
    )
}

/*

—| Compliance
	—| Mini NavBar with Sites | Reports
		—| Grid of all Nuffield Health Sites
			—| Flex-box over the top of 4 containers to set regions for the sites
			—| Filter drop-down for specific
			—| Search bar to find specific site
			—| All the sites container boxes for the calibrations
		—| Reports of the calibrations over the last 3 months

—| CompliancePage
	—| ComplianceNavBar
		—\ SitesDashboardSection
			—| RegionsFilterSection
			—| FiltersContainer
			—\ SearchBarContainer
			—| SitesDashboard 
		—\ ReportsSection


*/