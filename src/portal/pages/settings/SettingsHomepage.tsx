import SiteConfiguration from "./SiteConfiguration"
import ComplianceRules from "./ComplianceRules"
import ReportsExports from "./ReportsExports"
import OrganiseSites from "./organise-sites/OrganiseSites"

export default function SettingsHomepage () {

    return (
        <div className="w-full p-2">
            <div className="border-b border-gray-200 pb-2">
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-sm text-gray-500">Manage the different sites and preferences</p>
            </div>
            <div className="bg-gray-200 flex rounded p-1 justify-around my-2">
                <div className="flex-1 text-gray-400 text-sm text-center">
                    <p>Sites</p>
                </div>
                <div className="flex-1 text-gray-400 text-sm text-center">
                    Site Configuration
                </div>
                <div className="flex-1 text-gray-400 text-sm text-center">
                    Compliance Rules
                </div>
                <div className="flex-1 text-gray-400 text-sm text-center">
                    Reports & Exports
                </div>
            </div>
            <ReportsExports />
        </div>
    )
}

/*
    <OrganiseSites />
    <SiteConfiguration />
    <ComplianceRules />
    <ReportsExports />
*/