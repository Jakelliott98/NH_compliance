import { Outlet } from 'react-router'
import './App.css'
import Header from './components/header/Header'

function App() {

  return (
    <div className='w-full min-h-full rounded-xl flex-col'>
      <Header />
        <div className='rounded-xl p-2 bg-gray-300'>
          <Outlet />
        </div>
    </div>
  )

}

export default App
