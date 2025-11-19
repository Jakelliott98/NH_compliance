import { useOutletContext } from "react-router"
import { useState, useEffect } from "react"
import supabase from "../../../../../../utility/supabase"
import CalibrationCard from "./CalibrationCard"
import LoadingComponent from "../../../../../../components/loading- component/LoadingComponent"
import type { CalibrationType } from "../../../../../../types/calibration"

export default function CalibrationSection () {

    const siteID = useOutletContext()
    const [calibrations, setCalibrations] = useState({
        data: [],
        loading: true,
        error: false,
    })

    useEffect(() => {

        const getCalibrations = async () => {
            const {data} = await supabase
            .from('calibrations')
            .select('*')
            .eq('site_id', siteID)
            setCalibrations({
                data: data,
                loading: false,
                error: false,
            })
        }
        getCalibrations()
    }, [siteID])

    return (
        <div className='flex-1 flex flex-col gap-3 p-3'>
            <p className='font-medium text-lg'>Calibration Fluids</p>
            <div className='flex gap-8'>
                {
                    <CalibrationHolder calibrations={calibrations}/>
                }
             </div>
        </div>
    )

}

interface CalibrationState{
    data: CalibrationType[],
    loading: boolean,
    error: boolean
}

interface CalibrationHolderProps{
    calibrations: CalibrationState,
}

function CalibrationHolder ({ calibrations }: CalibrationHolderProps) {
    if (calibrations.loading) {
        return <LoadingComponent />
    } else {
        return (
            <>
            {
                calibrations.data.map((item) => {
                    return (
                        <CalibrationCard key={item.id} calibration={item}/>
                    )
                })
            }   
        </>
    )
    }

}