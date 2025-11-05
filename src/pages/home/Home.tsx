import CalibratedUI from "../../components/CalibratedUI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
import { useEffect, useState } from "react"
import supabase from "../../utility/supabase"

interface RegionCardProps {
    title: string,
}

interface StateInterface <T> {
    data: Array<T>,
    loading: boolean,
    error: boolean,
}

interface RegionState {
    site_region: string,
}

export default function Home ({ name = 'Guest'}) {

    const [regions, setRegions] = useState<StateInterface<RegionState>>({
        data: [],
        loading: true,
        error: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from('sites')
                .select('site_region')
            if (!data) {
                return console.log('Error fetching')
            } 
            const formattedData = data.map(item => item.site_region)
            setRegions((prev) => {
                return {
                    ...prev, 
                    data: formattedData,
                }
            })
        }
        fetchData();
    }, [])

    return (
        <div className="height-full p-6">
            <h1 className="text-xl">Welcome back, {name}!</h1>
            <div className="flex flex-col align-center gap-4 p-4">
                <div className="rounded-xl bg-white p-4 flex flex-col justify-center w-fit self-center">
                    <h2 className="text-4xl font-bold self-center">Compliance Tracker</h2>
                    <p className="text-gray-500 self-center">Use this tracker to stay on top of site checks, quickly identify any outstanding tasks, and maintain smooth operations across all regions.</p>
                </div>
                <div className="flex flex-row bg-white w-fit p-4 rounded-xl self-center"> 
                    <p>Select a region below to view site compliance status and take any necessary actions</p>
                    <FontAwesomeIcon className="self-center text-2xl" icon="fa-regular fa-hand-point-down" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 ">
            {
                regions.data.map((item) => {
                    return (
                        <RegionCard title={item} /> 
                    )
                })
            }
            </div>
        </div>
    )
}

function RegionCard ({ title }: RegionCardProps) {

    return (
        <div className="rounded-xl bg-white p-2 min-w-6/12">
            <h1>{title}</h1>
            <CalibratedUI calibratedData={[{completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}]}/>
            <p>View and manage compliance for all sites in the {title}</p>
        </div>
    )
}