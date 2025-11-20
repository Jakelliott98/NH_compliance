import './App.css'
import { Link } from 'react-router';
import { Outlet } from 'react-router';

function App() {

  return (
    <div className='w-full min-h-screen'>

      <Outlet />
    </div>

)}

export function HomeNav () {
  return (
    <div className='bg-gray-200 h-screen w-screen flex flex-row justify-center items-center gap-5'>      
      <Link to="Portal"><button className='p-10 flex-1 bg-orange-400 rounded-xl'>Portal</button></Link>
      <Link to="Form"><button className='p-10 flex-1 bg-purple-400 rounded-xl'>Form</button></Link>
    </div>
  )
}

export default App;
