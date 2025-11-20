import { useEffect } from "react"
import SitesReducer from "../components/custom-hooks/SitesReducer"
import supabase from "../utility/supabase"
import Header from "../components/header/Header"
import RegionContext from "../components/context/RegionContext"
import { Outlet } from "react-router"

export default function Portal () {

    const {complianceData, setSites, setRegions} = SitesReducer()

    useEffect(() => {

    const fetchData = async (table: string, stateSetter: (data: Array<object>) => void) => {

        const { data } = await supabase
        .from(table)
        .select('*')
        stateSetter(data)
    }

    fetchData('sites', setSites)
    fetchData('regions', setRegions)

    }, [])

    return (
        <div className="h-full w-full">
            <Header />
            <RegionContext value={{ complianceData }}>
                <div className='rounded-xl p-2 bg-gray-100 min-h-full flex-1'>
                    <Outlet />
                </div>
            </RegionContext >
        </div>
    )
}