import moment from 'moment';

interface SiteCardProps {
    site: {
        team_leader: string,
        site_name: string,
        last_calibrated: Date,
    }
}

export default function SiteCard ({site}: SiteCardProps) {

    const difference = moment().diff(site.last_calibrated, "days");
    const isCalibrated = difference <= 7 ? true : false;

    return (
        <div className={`${ isCalibrated ? 'bg-white' : 'bg-red-100'} rounded-xl w-full h-full p-4 border-solid border-2 border-gray-400 cursor-pointer`}>
            <div className="border-b-1 border-dashed border-black flex justify-between pb-2 min-h-5/12">
                <div className="w-6/12 flex-1">
                    <p className="text-sm">{site.site_name}</p>
                    <p className="text-xs text-gray-400">{site.team_leader}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">2 Affinions</p>
                </div>
            </div>
            <p className={`text-xs ${!isCalibrated ? 'text-red-700' : ''}`}>Last Calibrated: {difference} days ago </p>
            <div className="pt-2">
                <div className="flex justify-between">
                    <p>Affinion 1:</p>
                    <p>27th October</p>
                </div>
                <div className="flex justify-between">
                    <p>Affinion 2:</p>
                    <p>27th October</p>
                </div>
                <div className="flex justify-between">
                    <p>Affinion 3:</p>
                    <p>27th October</p>
                </div>
            </div>
        </div>
    )
}