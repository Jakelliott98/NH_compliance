import Header from "./components/Header"
import { Outlet } from "react-router"

export default function Portal () {

    return (
        <div className="bg-bg h-full w-full flex flex-col">
            <Header />
                <div className='mx-3 mb-3 rounded-lg p-2 bg-surface flex-1'>
                    <Outlet />
                </div>
        </div>
    )
}