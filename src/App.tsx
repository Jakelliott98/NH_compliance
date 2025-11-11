import { Outlet } from 'react-router'
import './App.css'
import Header from './components/header/Header'

function App() {

  return (
    <div className='w-full min-h-screen rounded-xl flex flex-col'>
      <Header />
        <div className='rounded-xl p-2 bg-gray-100 min-h-full flex-1'>
          <Outlet />
        </div>
    </div>
  )

}

export default App
