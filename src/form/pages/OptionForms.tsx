import { Link } from "react-router"
import { Outlet } from "react-router"

export default function OptionForms () {

    return (
        <div>
            <Link to="Results-Form"><button>Add Results</button></Link>
            <Link to="Calibration-Form"><button>Add Calibration Fluids</button></Link>
            <Link to="Affinion-Form"><button>Add Affinions</button></Link>
            <Outlet />
        </div>
    )

}