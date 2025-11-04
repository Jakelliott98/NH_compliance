import './App.css'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import SiteHomepage from './pages/sites/SiteHomepage'

function App() {

  return (
    <div className='w-full min-h-full rounded-xl flex-col'>
      <Header />
        <div className='rounded-xl p-2 bg-gray-300'>
          <SiteHomepage />
        </div>
    </div>
  )

}

export default App
