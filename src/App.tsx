import { Outlet } from 'react-router'
import './App.css'
import Header from './components/header/Header'
import RegionContext from './components/context/RegionContext'
import SitesReducer from './components/custom-hooks/SitesReducer'
import { useEffect } from 'react'
import supabase from './utility/supabase'

function App() {

const temporaryRegions = [{number: 27, region: 'North', status: 'All Calibrated'}, {number: 31, region: 'South', status: 'All Calibrated'}, {number: 12, region: 'West', status: 'All Calibrated'}, {number: 17, region: 'East', status: 'Missing Calibrations'}]
const {complianceData, setSites} = SitesReducer()

useEffect(() => {

  const fetchSites = async () => {

    const {data} = await supabase
      .from('sites')
      .select('*')
      setSites(data)

  }

  // Region Fetch

  fetchSites()
  // Region Call

  // Move both sites and region call into a reusable hook

}, [])

console.log(complianceData)

  return (
    <div className='w-full min-h-screen rounded-xl flex flex-col'>
      <Header />
        <RegionContext value={{temporaryRegions, complianceData}}>
        <div className='rounded-xl p-2 bg-gray-100 min-h-full flex-1'>
          <Outlet />
        </div>
        </RegionContext >
    </div>
  )

}

export default App;
