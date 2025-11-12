
interface SiteCardProps {
    site: string,
    teamLeader: string,
}

export default function SiteCard ({site, teamLeader}: SiteCardProps) {


    return (
        <div className="bg-white rounded-xl w-fit p-4 border-solid border-2 border-gray-400 cursor-pointer">
            <div className="border-b-1 border-dashed border-black flex justify-between pb-2">
                <div className="w-6/12">
                    <p className="text-sm">{site}</p>
                    <p className="text-xs text-gray-400">{teamLeader}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">2 Affinions</p>
                </div>
            </div>
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