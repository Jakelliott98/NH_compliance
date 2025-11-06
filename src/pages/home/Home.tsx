import CalibratedUI from "../../components/CalibratedUI"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
import { useEffect, useState } from "react"
import supabase from "../../utility/supabase"
import { Link } from "react-router"

interface RegionCardProps {
    title: string,
}

interface FetchState {
    data: Array<any>,
    loading: boolean,
    error: boolean,
}

interface RegionsState extends Omit<FetchState, 'data'> {
    data: Array<string>
}

export default function Home ({ name = 'Guest'}) {

    const [regions, setRegions] = useState<RegionsState>({
        data: [],
        loading: true,
        error: false,
    });

    useEffect(() => {
        const fetchRegions = async (): Promise<void> => {

            const { data } = await supabase 
                .from('sites')
                .select('site_region')

            if (!data) {
                setRegions((prev) => {
                    return {
                        ...prev,
                        error: true,
                    }
                })
            }
            else {
                const sortedData = data.map(item => item.site_region)
                setRegions((prev) => {
                    return {
                        ...prev,
                        data: sortedData,
                        loading: false,
                    }
                })
            }

            }
            fetchRegions();
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
                        <Link to="/sites"><RegionCard title={item} /> </Link>
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