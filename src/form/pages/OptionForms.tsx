import { useNavigate } from "react-router"
import { Outlet } from "react-router"

export default function OptionForms () {

    const navigate = useNavigate();
    const onSubmit = (newPage: string) => { navigate(newPage) }

    return (
            <div className="flex gap-5">
                    <button className="bg-gray-200 rounded-xl p-5 cursor-pointer" onClick={() => {onSubmit("Results-Form")}}>Add Results</button>
                    <button className="bg-gray-200 rounded-xl p-5 cursor-pointer" onClick={() => {onSubmit("Calibration-Form")}}>Add Calibration Fluids</button>
                    <button className="bg-gray-200 rounded-xl p-5 cursor-pointer" onClick={() => {onSubmit("Affinion-Form")}}>Add Affinions</button>
                    <Outlet />
            </div>
    )

}