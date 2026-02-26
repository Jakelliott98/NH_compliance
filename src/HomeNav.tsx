import addFiles from './assets/add_files.svg';
import visualData from './assets/visual_data.svg'
import { useNavigate } from 'react-router';
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import LoginPage from './LoginPage';

export function HomeNav () {

  const navigate = useNavigate();

  const navigateSite = (site: string) => {
    navigate(site)
  }

  return (
    <>
      <SignedOut>
        
        <LoginPage/>
      </SignedOut>
      <SignedIn>
        <div 
          className='
            bg-gray-200 
            h-screen w-screen
            flex flex-col gap-5 justify-center items-center
            py-10 px-10
            md:flex-row
          '
        >      
            <button 
              className='
                flex-1
                border-gray-400 border rounded-lg 
                flex flex-col justify-center items-center 
                p-4 md:p-10
                cursor-pointer 
                bg-white hover:bg-primary
                hover:text-primary-foreground
                md:h-1/3
                lg:h-full
              ' 
              onClick={() => {navigateSite('Portal')}}
            >

              <img src={visualData} className="w-2/3 md:w-2/5 mb-2 md:mb-5"/>
              <h1 className='font-bold uppercase text-xl md:text-2xl'>Portal</h1>
              <p className='text-sm text-center'>Login to view calibration history</p>
            </button>

            <button 
              className='
                flex-1
                border-gray-400 border rounded-lg 
                flex flex-col justify-center items-center 
                p-4 md:p-10
                cursor-pointer 
                bg-white hover:bg-primary
                hover:text-primary-foreground
                md:h-1/3
                lg:h-full
              ' 
              onClick={() => {navigateSite('SiteForm')}}
            >
              <img src={addFiles} className='w-2/3 md:w-2/5 mb-2 md:mb-5'/>
              <h1 className='font-bold uppercase text-lg md:text-2xl'>Form</h1>
              <p className='text-sm text-center'>Add calibrations, controls and afinions to your site.</p>
            
            </button>
        </div>
      </SignedIn>
    </>
  )
}
