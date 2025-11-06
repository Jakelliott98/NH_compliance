import CalibratedUI from "../CalibratedUI"

interface SiteCardProps {
    title: string,
    date: Date,
}

interface calibratedDataType {completed: boolean | null}

const calibratedData: Array<calibratedDataType> = [{completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: false}, {completed: null}, {completed: null}, {completed: null}, {completed: null}]

function SiteCard ({ title, date }: SiteCardProps) {

    return (
        <div className='rounded-xl bg-green-100 w-52 p-1 pb-2 flex flex-col gap-1.5'>
            <div className='bg-white p-1.5 rounded-xl'>
                <h1 className='text-sm font-bold'>{title}</h1>
                <CalibratedUI calibratedData={calibratedData}/>
            </div>
            <p className='text-xs'> 
                Last Calibrated: 
                <span className='text-xs italic text-gray-500'> {`${date}`}</span>

            </p>
        </div>
    )
}

export default SiteCard;