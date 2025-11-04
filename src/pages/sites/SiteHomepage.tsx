

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
                <div className="bg-green-200 w-full rounded-md p-4">Previous 4 results  ^</div>
                <div className="bg-green-200 w-full rounded-md p-4">Previous 4 results  ^</div>
                <div className="bg-green-200 w-full rounded-md p-4">Previous 4 results  ^</div>
                <div className="bg-green-200 w-full rounded-md p-4">Previous 4 results  ^</div>
            </div>
        </div>
    )
}