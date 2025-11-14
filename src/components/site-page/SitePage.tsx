import { Outlet } from "react-router"
import { useParams } from "react-router"
import { useContext, useEffect } from "react"
import RegionContext from "../context/RegionContext"
import { NavLink } from "react-router"
import supabase from "../../utility/supabase"
import { useState } from "react"


export default function SitePage () {

    const { complianceData } = useContext(RegionContext)
    const siteID = useParams()
    const site = complianceData.sites.data.find(item => item.slug === siteID.Site)
    const [affinions, setAffinions] = useState({
        loading: true,
        data: [],
        number: null,
    });

    useEffect(() => {
        const getAffinions = async () => {
            const { data } = await supabase
            .from('affinions')
            .select('*')
            .eq('site_id', site.site_id)
            setAffinions((prev) => {
                return {
                    loading: false,
                    data: data,
                    number: data.length,
                }
            })
        }
        getAffinions();
    }, [site])

    return (
        <div className="flex flex-col bg-white p-5 rounded-xl my-2">
            <div className="flex flex-col gap-4 border-b-1 border-solid border-gray-300 pb-2">
                <h1 className="font-bold text-xl">{site.site_name}</h1>
                <div className="flex flex-row gap-10">
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">Team Leader</p>
                        <p className="text-sm">{site.team_leader}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">Last Calibrated</p>
                        <p className="text-sm">{site.last_calibrated}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">Affinions</p>
                        <p className="text-sm">{affinions.number}</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <NavLink to="Overview" className={({isActive}) => {return isActive ? 'text-blue-500' : 'text-gray-500'}}><p className="text-sm">Overview</p></NavLink>
                    <NavLink to="Results" className={({isActive}) => {return isActive ? 'text-blue-500' : 'text-gray-500'}}><p className="text-sm">Results</p></NavLink>
                    <NavLink to="Calibration" className={({isActive}) => {return isActive ? 'text-blue-500' : 'text-gray-500'}}><p className="text-sm">Calibrations</p></NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    )
}


/*

            <div className="flex flex-col justify-between">
                <h1 className="text-xl font-bold">Canary Wharf</h1>
                <p>Anne Weyer</p>
            </div>
            <div className="w-full flex flex-row justify-between">
                <div className="bg-white rounded-xl p-2">
                    <p>Affinion 1</p>
                    <p>NH234567</p>
                    <p>Last Calibrated: '27 October'</p>
                </div>
                <div className="bg-white rounded-xl p-2">
                    <p>Affinion 2</p>
                    <p>NH234567</p>
                    <p>Last Calibrated: '27 October'</p>
                </div>
                <div className="bg-white rounded-xl p-2">
                    <p>Affinion 3</p>
                    <p>NH234567</p>
                    <p>Last Calibrated: '27 October'</p>
                </div>
            </div>
            <div className="flex flex-col w-full gap-2">
                <CalibrationCard date='27 October 2025' clinician='JE'/>
                <CalibrationCard date='3 November 2025' clinician='JE'/>
                <CalibrationCard date='10 November 2025' clinician='JE'/>
                <CalibrationCard date='17 November 2025' clinician='JE'/>

            </div>

            */