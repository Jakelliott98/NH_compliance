import { Outlet } from "react-router";
import { NavLink } from "react-router";

export default function CompliancePage () {

    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="w-2/12 flex justify-around rounded-xl bg-white py-1">
                    <NavLink to="Sites" className={({isActive}) => {return isActive ? 'text-black' : 'text-neutral-400'}}>
                        <p className="text-sm">SITES</p>
                    </NavLink>
                    <NavLink to="Reports" className={({isActive}) => {return isActive ? 'text-black' : 'text-neutral-400'}}>
                        <p className="text-sm">REPORTS</p>
                    </NavLink>                    
                </div>
            </div>
            <Outlet />
        </div>
    )
}