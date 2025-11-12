import CalibrationCard from "../calibration-card/CalibrationCard"

export default function SitePage () {


    return (

        <div className="flex flex-col bg-white p-5 rounded-xl my-2">
            <div className="flex flex-col gap-4 border-b-1 border-solid border-gray-300 pb-2">
                <h1 className="font-bold text-xl">Title</h1>
                <div className="flex flex-row gap-10">
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">Team Leader</p>
                        <p className="text-sm">Anne Weyer</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">Last Calibrated</p>
                        <p className="text-sm">12th October 2025</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-xs uppercase text-gray-500">Report</p>
                        <p className="text-sm">12/20</p>
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <p className="text-sm text-gray-500">Overview</p>
                    <p className="text-sm text-gray-500">Results</p>
                    <p className="text-sm text-gray-500">Calibrations</p>
                </div>

            </div>
            <div className="flex flex-col w-full gap-2 my-2">
                <CalibrationCard date='27 October 2025' clinician='JE'/>
                <CalibrationCard date='3 November 2025' clinician='JE'/>
                <CalibrationCard date='10 November 2025' clinician='JE'/>
                <CalibrationCard date='17 November 2025' clinician='JE'/>
            </div>
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