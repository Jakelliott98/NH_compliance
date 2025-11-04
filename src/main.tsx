import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import SiteHomepage from './pages/sites/SiteHomepage.tsx'
import SettingsHomepage from './pages/settings/SettingsHomepage.tsx'
import Home from './pages/home/Home.tsx'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />}/>
        <Route path="Sites" element={<SiteHomepage />} />
        <Route path="Settings" element={<SettingsHomepage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)

