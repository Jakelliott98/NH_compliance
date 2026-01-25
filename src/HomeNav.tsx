import addFiles from './assets/add_files.svg';
import visualData from './assets/visual_data.svg'
import { useNavigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router';


export function HomeSection () {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full h-screen flex justify-center items-center'>
        <Outlet />
      </div>
    </QueryClientProvider>

)}

export function HomeNav () {

  const navigate = useNavigate();

  const navigateSite = (site: string) => {
    navigate(site)
  }

  return (
    <div className='bg-gray-200 h-screen w-screen flex flex-row justify-center items-around gap-5 p-10'>      
        <button className='p-10 flex-1 border-gray-400 border rounded-xl flex flex-col justify-center items-center cursor-pointer hover:bg-white' onClick={() => {navigateSite('Portal')}}>
          <img src={visualData} className='w-4/12 h-fit mb-5'/>
          <h1 className='font-bold uppercase text-2xl'>Portal</h1>
          <p className='text-gray-500 text-sm'>Login to view calibration history</p>
        </button>
        <button className='p-10 flex-1 border-gray-400 border rounded-xl flex flex-col justify-center items-center cursor-pointer hover:bg-white' onClick={() => {navigateSite('SiteForm')}}>
          <img src={addFiles} className='w-4/12 h-fit mb-5'/>
          <h1 className='font-bold uppercase text-2xl'>Form</h1>
          <p className='text-gray-500 text-sm'>Add calibrations, controls and affinions to your site.</p>
        </button>
    </div>
  )
}
