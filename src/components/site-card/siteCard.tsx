import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

interface SiteCardProps {
    title: string,
    date: string,
}

interface calibratedDataType {completed: boolean | null}

const calibratedData: Array<calibratedDataType> = [{completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: true}, {completed: false}, {completed: null}, {completed: null}, {completed: null}, {completed: null}]

function CalibratedUI () {

    return (
        <div className='grid grid-cols-4'>
            {
                calibratedData.map((item) => {
                    const boxColour = item.completed ? "text-green-500" : "text-gray-500"
                    return (
                        <FontAwesomeIcon className={`${boxColour} text-2xl`} icon={item.completed ? "fa-solid fa-square" : "fa-regular fa-square"} />
                    )
                })
            }
        </div>
    )
}

function SiteCard ({ title, date }: SiteCardProps) {

    return (
        <div className='rounded-xl bg-green-100 w-52 p-1 pb-2 flex flex-col gap-1.5'>
            <div className='bg-white p-1.5 rounded-xl'>
                <h1 className='text-sm font-bold'>{title}</h1>
                <CalibratedUI />
            </div>
            <p className='text-xs'> 
                Last Calibrated: 
                <span className='text-xs italic text-gray-500'> {date}</span>

            </p>
        </div>
    )
}

export default SiteCard;