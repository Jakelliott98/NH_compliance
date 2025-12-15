import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router'

export default function Header () {
    
    return (
    <div className='bg-white px-5 py-4 w-full flex justify-between content-center'>
        <p className='text-sm uppercase text-neutral-600'>Logo</p>
        <nav className='w-4/12 flex justify-between cursor-pointer'>
            <NavLink to="Dashboard" className={({isActive}) => {return isActive ? 'text-black' : 'text-neutral-400'}}>
                <p className='text-sm uppercase'>Dashboard</p>
            </NavLink>
            <NavLink to="Compliance" className={( {isActive}) => {return isActive ? 'text-black' : 'text-neutral-400'}}>
                <p className='text-sm uppercase'>Compliance</p>
            </NavLink>
            <NavLink to="Settings" className={( {isActive}) => {return isActive ? 'text-black' : 'text-neutral-400'}}>
                <p className='text-sm uppercase'>Settings</p>

            </NavLink>
        </nav>
        <FontAwesomeIcon icon={faCircleUser} className='self-center text-lg text-neutral-600'/>
    </div>
    )
}