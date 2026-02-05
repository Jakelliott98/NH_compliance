import Header from "./components/Header"
import { Outlet } from "react-router"

export default function Portal () {

    return (
        <div className="h-full w-full">
            <Header />
                <div className='rounded-xl p-2 bg-gray-100 min-h-full flex-1'>
                    <Outlet />
                </div>
        </div>
    )
}