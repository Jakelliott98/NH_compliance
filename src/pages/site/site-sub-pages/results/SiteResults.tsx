import CalibrationCard from "../../../../components/calibration-card/CalibrationCard"

export default function SiteResults () {

    return (
            <div className="flex flex-col w-full gap-2 my-2">
                <CalibrationCard date='27 October 2025'/>
                <CalibrationCard date='3 November 2025'/>
                <CalibrationCard date='10 November 2025'/>
                <CalibrationCard date='17 November 2025'/>
            </div>
    )
}