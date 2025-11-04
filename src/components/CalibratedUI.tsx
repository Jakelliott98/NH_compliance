import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

export default function CalibratedUI ({ calibratedData }) {

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