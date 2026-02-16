import { NavLink, Outlet, useLocation } from "react-router"

export default function SettingsHomepage () {

    const location = useLocation().pathname
    const isHomepage = location === '/Portal/Settings/Sites' || location === '/Portal/Settings'

    return (
        <div className="w-full p-2">
            <div className=" pb-2">
                <h1 className="text-lg md:text-2xl font-bold text-neutral">Settings</h1>
                <p className="sm-hidden-block text-sm text-neutral-light">Manage the different sites and preferences</p>
            </div>
            <nav className="flex justify-around my-2 [&>*]:flex-1 [&>*]:text-center [&>*]:py-2 [&>*]:border-b-2">
                    <NavLink to="Sites" className={isHomepage ? 'text-secondary-foreground bg-secondary/25 border-b-primary' : 'text-neutral-light/75'}>Sites</NavLink>
                    <NavLink to="Configuration" className={({isActive}) => {return isActive ? 'text-secondary-foreground bg-secondary/25 border-b-primary' : 'text-neutral-light/75'}}><span className="sm-hidden-inline">Site&nbsp;</span>Configuration</NavLink>
                    <NavLink to="Compliance" className={({isActive}) => {return isActive ? 'text-secondary-foreground bg-secondary/25 border-b-primary' : 'text-neutral-light/75'}}>Compliance<span className="sm-hidden-inline">&nbsp;Rules</span></NavLink>
                    <NavLink to="Exports" className={({isActive}) => {return isActive ? 'text-secondary-foreground bg-secondary/25 border-b-primary' : 'text-neutral-light/75'}}><span className="sm-hidden-inline">Reports &&nbsp;</span>Exports</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}