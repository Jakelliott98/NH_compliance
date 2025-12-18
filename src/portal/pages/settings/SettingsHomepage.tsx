import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileLines, faPlus, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import SiteConfiguration from "./SiteConfiguration"
import ComplianceRules from "./ComplianceRules"
import ReportsExports from "./ReportsExports"
import OrganiseSites from "./OrganiseSites"

export default function SettingsHomepage () {

    return (
        <div className="w-full p-2">
            <div>
                <h1 className="text-2xl font-extrabold">Settings</h1>
                <p className="text-sm">Manage the different sites and preferences</p>
            </div>
            <OrganiseSites />
            <SiteConfiguration />
            <ComplianceRules />
            <ReportsExports />
        </div>
    )
}