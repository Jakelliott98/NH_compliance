import CalibratedUI from "../../components/CalibratedUI"

interface RegionCardProps {
    title: string,
    regionalLead: string,
}


const regionalAreas: Array<RegionCardProps> = [
    {
        regionalLead: 'Sam T',
        title: 'South',
    },
    {
        regionalLead: 'Cherly',
        title: 'North',
    },
    {
        regionalLead: 'Tom',
        title: 'East',
    },
    {
        regionalLead: 'Sophie',
        title: 'West',
    }

]

export default function Home () {

    return (
        <div className="grid grid-cols-2 gap-2">
            {
                regionalAreas.map((item) => {
                    return (
                        <RegionCard title={item.title} regionalLead={item.regionalLead} /> 
                    )
                })
            }
        </div>
    )
}

function RegionCard ({ title, regionalLead }: RegionCardProps) {

    return (
        <div className="rounded-xl bg-white p-2 min-w-6/12">
            <h1>{title}</h1>
            <p>{regionalLead}</p>
            <CalibratedUI calibratedData={[{completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}]}/>
        </div>
    )
}