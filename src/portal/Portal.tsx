import Header from "./components/Header"
import { Outlet } from "react-router"

export default function Portal () {

    return (
        <div className="h-full w-full">
            <Header />
                <div className='p-2 bg-bg min-h-full flex-1'>
                    <Outlet />
                </div>
        </div>
    )
}