import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faClipboardList, faShieldHalved, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from 'react-router'
import { UserButton } from '@clerk/clerk-react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Header () {

    return (
    <div className='bg-bg px-5 py-4 w-full flex justify-between items-center'>
        <p className='sm-hidden-block text-sm uppercase text-neutral-400'>CT</p>
        <div className='hidden md:block'>
        <Navbar onClick={() => {}}/>
        </div>
        <OverlayNavbar />
        <UserButton />

    </div>
    )
}

interface Navbar {
    onClick: () => void,
}

function Navbar ({onClick}: Navbar) {

    const location = useLocation().pathname
    const isDashboard = location === "/Portal/Dashboard" || location === '/Portal';
    return (
        <nav className='p-1 flex flex-col md:flex-row cursor-pointer bg-surface rounded-lg'>
            <NavLink onClick={() => onClick()} to="Dashboard" className={`cursor-pointer py-4 md:py-2 px-4 rounded-lg ${isDashboard ? 'bg-primary text-primary-foreground' : 'text-neutral-light hover:text-neutral'}`}>
                <div className='flex gap-1 items-center'>
                    <FontAwesomeIcon icon={faClipboardList} className='text-sm'/>
                    <p className='text-base md:text-sm uppercase'>Dashboard</p>
                </div>
            </NavLink>
            <NavLink onClick={onClick} to="Compliance" className={( {isActive}) => {return `cursor-pointer py-4 md:py-2 px-4 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'text-neutral-light hover:text-neutral'}`}}>
                <div className='flex gap-1 items-center'>
                    <FontAwesomeIcon icon={faShieldHalved} className='text-sm'/>
                    <p className='text-base md:text-sm  uppercase'>Compliance</p>
                </div>
            </NavLink>
            <NavLink onClick={onClick} to="Settings" className={( {isActive}) => {return `cursor-pointer py-4 md:py-2 px-4 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'text-neutral-light hover:text-neutral'}`}}>
                <div className='flex gap-1 items-center'>
                <FontAwesomeIcon icon={faGear} className='text-sm'/>
                <p className='text-base md:text-sm  uppercase'>Settings</p>
                </div>
            </NavLink>
        </nav>
    )
}

function OverlayNavbar () {

    const [isOpen, setIsOpen] = useState(false);



    return (
        <div className='md:hidden'>
            <FontAwesomeIcon icon={faBars} onClick={() => setIsOpen(true)}/>
            {
                isOpen && (
                    <div className='absolute z-50 h-full w-full bg-white/90 left-0 top-0'>
                        <div className='w-full flex bg-white justify-end p-5'>
                            <FontAwesomeIcon icon={faXmark} onClick={() => setIsOpen(false)} className=''/>
                        </div>
                        <Navbar onClick={() => setIsOpen(false)}/>
                    </div>
                )
            }
        </div>
    )

}