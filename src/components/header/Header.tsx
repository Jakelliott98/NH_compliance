import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router'

export default function Header () {
    
    return (
    <div className='bg-white p-2 w-full flex justify-between content-center'>
        <p>Logo</p>
        <nav className='w-4/12 flex justify-between cursor-pointer'>
            <NavLink to="/" className={({isActive}) => {return isActive ? 'text-blue-500' : 'tet-black'}}>Dashboard</NavLink>
            <NavLink to="/Compliance" className={( {isActive}) => {return isActive ? 'text-blue-500' : 'text-black'}}>Compliance</NavLink>
            <NavLink to="/Settings" className={( {isActive}) => {return isActive ? 'text-blue-500' : 'text-black'}}>Settings</NavLink>
        </nav>
        <FontAwesomeIcon icon={faCircleUser} className='self-center'/>
    </div>
    )
}