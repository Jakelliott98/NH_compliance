import { NavLink, Outlet, useLocation } from "react-router"

export default function SettingsHomepage () {

    const location = useLocation().pathname
    const isHomepage = location === '/Portal/Settings/Sites' || location === '/Portal/Settings'

    return (
        <div className="w-full p-2">
            <div className="border-b border-gray-200 pb-2">
                <h1 className="text-lg md:text-2xl font-bold text-gray-800">Settings</h1>
                <p className="sm-hidden-block text-sm text-gray-500">Manage the different sites and preferences</p>
            </div>
            <nav className="bg-gray-200 flex rounded p-1 justify-around my-2">
                <nav className="flex-1 text-gray-400 text-xs md:text-sm text-center">
                    <NavLink to="Sites" className={isHomepage ? 'text-gray-800' : 'text-gray-400'}>Sites</NavLink>
                </nav>
                <nav className="flex-1 text-gray-400 text-xs md:text-sm text-center">
                    <NavLink to="Configuration" className={({isActive}) => {return isActive ? 'text-gray-800' : 'text-gray-400'}}><span className="sm-hidden-inline">Site&nbsp;</span>Configuration</NavLink>
                </nav>
                <nav className="flex-1 text-gray-400 text-xs md:text-sm text-center">
                    <NavLink to="Compliance" className={({isActive}) => {return isActive ? 'text-gray-800' : 'text-gray-400'}}>Compliance<span className="sm-hidden-inline">&nbsp;Rules</span></NavLink>
                </nav>
                <nav className="flex-1 text-gray-400 text-xs md:text-sm text-center">
                    <NavLink to="Exports" className={({isActive}) => {return isActive ? 'text-gray-800' : 'text-gray-400'}}><span className="sm-hidden-inline">Reports &&nbsp;</span>Exports</NavLink>
                </nav>
            </nav>
            <Outlet />
        </div>
    )
}