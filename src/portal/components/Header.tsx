import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faGear, faClipboardList, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from 'react-router'

export default function Header () {
    
    const location = useLocation().pathname
    const isDashboard = location === "/Portal/Dashboard" || location === '/Portal';

    return (
    <div className='bg-white px-5 py-4 w-full flex justify-between items-center'>
        <p className='text-sm uppercase text-neutral-400'>CT</p>
        <nav className='w-4/12 flex justify-between cursor-pointer'>
            <NavLink to="Dashboard" className={isDashboard ? 'text-black' : 'text-neutral-400 hover:text-black'}>
                <div className='flex gap-1 items-center'>
                    <FontAwesomeIcon icon={faClipboardList} className='text-sm'/>
                    <p className='text-sm uppercase'>Dashboard</p>
                </div>
            </NavLink>
            <NavLink to="Compliance" className={( {isActive}) => {return isActive ? 'text-black' : 'text-neutral-400 hover:text-black'}}>
                <div className='flex gap-1 items-center'>
                    <FontAwesomeIcon icon={faShieldHalved} className='text-sm'/>
                    <p className='text-sm uppercase'>Compliance</p>
                </div>
            </NavLink>
            <NavLink to="Settings" className={( {isActive}) => {return isActive ? 'text-black' : 'text-neutral-400 hover:text-black'}}>
                <div className='flex gap-1 items-center'>
                <FontAwesomeIcon icon={faGear} className='text-sm'/>
                <p className='text-sm uppercase'>Settings</p>
                </div>
            </NavLink>
        </nav>
        <FontAwesomeIcon icon={faCircleUser} className='self-center text-lg text-neutral-400 hover:text-black cursor-pointer'/>
    </div>
    )
}