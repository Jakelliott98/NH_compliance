import { Outlet } from "react-router";
import { NavLink } from "react-router";

export default function CompliancePage () {

    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="w-4/12 flex justify-around rounded-xl py-1 px-2 bg-white">
                    <NavLink to="Sites" className={({isActive}) => {return isActive ? 'text-black' : 'text-neutral-400'}}>
                        <p className="py-0.5 px-2 rounded-lg">Sites</p>
                    </NavLink>
                    <NavLink to="Reports" className={({isActive}) => {return isActive ? 'text-black' : 'text-neutral-400'}}>
                        <p className="py-0.5 px-2 rounded-lg">Reports</p>
                    </NavLink>                    
                </div>
            </div>
            <Outlet />
        </div>
    )
}