import CalibrationCard from "../../calibration-card/CalibrationCard"

export default function SiteResults () {

    return (
            <div className="flex flex-col w-full gap-2 my-2">
                <CalibrationCard date='27 October 2025' clinician='JE'/>
                <CalibrationCard date='3 November 2025' clinician='JE'/>
                <CalibrationCard date='10 November 2025' clinician='JE'/>
                <CalibrationCard date='17 November 2025' clinician='JE'/>
            </div>
    )
}