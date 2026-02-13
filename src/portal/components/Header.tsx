import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faClipboardList, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from 'react-router'
import { UserButton } from '@clerk/clerk-react';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header () {
    
    const location = useLocation().pathname
    const isDashboard = location === "/Portal/Dashboard" || location === '/Portal';

    return (
    <div className='bg-bg px-5 py-4 w-full flex justify-between items-center'>
        <p className='sm-hidden-block text-sm uppercase text-neutral-400'>CT</p>
        <nav className='p-1 hidden md:flex cursor-pointer bg-surface rounded-lg'>
            <NavLink to="Dashboard" className={`cursor-pointer py-2 px-4 rounded-lg ${isDashboard ? 'bg-primary text-primary-foreground' : 'text-neutral-light hover:text-neutral'}`}>
                <div className='flex gap-1 items-center'>
                    <FontAwesomeIcon icon={faClipboardList} className='text-sm'/>
                    <p className='text-sm uppercase'>Dashboard</p>
                </div>
            </NavLink>
            <NavLink to="Compliance" className={( {isActive}) => {return `cursor-pointer py-2 px-4 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'text-neutral-light hover:text-neutral'}`}}>
                <div className='flex gap-1 items-center'>
                    <FontAwesomeIcon icon={faShieldHalved} className='text-sm'/>
                    <p className='text-sm uppercase'>Compliance</p>
                </div>
            </NavLink>
            <NavLink to="Settings" className={( {isActive}) => {return `cursor-pointer py-2 px-4 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'text-neutral-light hover:text-neutral'}`}}>
                <div className='flex gap-1 items-center'>
                <FontAwesomeIcon icon={faGear} className='text-sm'/>
                <p className='text-sm uppercase'>Settings</p>
                </div>
            </NavLink>
        </nav>
        <div className='md:hidden'>
            <FontAwesomeIcon icon={faBars}/>
        </div>
        <UserButton />

    </div>
    )
}