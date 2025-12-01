import { useOutletContext } from "react-router"
import CalibrationCard from "./CalibrationCard"
import LoadingComponent from "@/components/LoadingComponent"
import type { CalibrationType } from "@/types/calibration"
import useFetchData from "@/hooks/useFetchData"

export default function CalibrationSection () {

    const { siteID } = useOutletContext()
    const calibrations = useFetchData<CalibrationType>(siteID, 'calibrations')


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