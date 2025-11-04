import CalibrationCard from "../../components/calibration-card/CalibrationCard";


export default function SiteHomepage () {

    return (
        <div className="flex flex-col gap-4 p-4">
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
        </div>
    )
}