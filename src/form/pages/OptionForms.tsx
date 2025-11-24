import { Link } from "react-router"
import { Outlet } from "react-router"

export default function OptionForms () {

    return (
        <div className="flex gap-5">
            <Link to="Results-Form">
                <button className="bg-gray-200 rounded-xl p-5 cursor-pointer">Add Results</button>
            </Link>
            <Link to="Calibration-Form">
                <button className="bg-gray-200 rounded-xl p-5 cursor-pointer">Add Calibration Fluids</button>
            </Link>
            <Link to="Affinion-Form">
                <button className="bg-gray-200 rounded-xl p-5 cursor-pointer">Add Affinions</button>
            </Link>
            <Outlet />
        </div>
    )

    // Change to use navigation instead of Link

}