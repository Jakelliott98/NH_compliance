import { Outlet } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import RegionContext from './components/context/RegionContext'
import SitesReducer from './components/custom-hooks/SitesReducer'
import { useEffect } from 'react'
import supabase from './utility/supabase'

function App() {

const {complianceData, setSites, setRegions} = SitesReducer()

useEffect(() => {

  const fetchData = async (table: string, stateSetter: (data: Array<object>) => void) => {

    const { data } = await supabase
      .from(table)
      .select('*')
      stateSetter(data)
  }

  fetchData('sites', setSites)
  fetchData('regions', setRegions)

}, [])

  return (
    <div className='w-full min-h-screen rounded-xl flex flex-col'>
      <Header />
        <RegionContext value={{ complianceData }}>
          <div className='rounded-xl p-2 bg-gray-100 min-h-full flex-1'>
            <Outlet />
          </div>
        </RegionContext >
    </div>

)}

export default App;
