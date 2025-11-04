import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

export default function Header () {
    
    return (
    <div className='bg-white p-2 w-full flex justify-between content-center'>
        <p>Logo</p>
        <nav className='w-4/12 flex justify-between cursor-pointer'>
            <a>Home</a>
            <a>Sites</a>
            <a>Settings</a>
        </nav>
        <FontAwesomeIcon className='self-center' icon="fa-regular fa-circle-user" />
    </div>
    )
}