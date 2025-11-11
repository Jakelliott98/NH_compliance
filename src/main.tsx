import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import SettingsHomepage from './pages/settings/SettingsHomepage.tsx'
import DashboardPage from './pages/dashboard_page/DashboardPage.tsx'
import CompliancePage from './pages/compliance_page/CompliancePage.tsx'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<DashboardPage />}/>
        <Route path="Compliance" element={<CompliancePage />} />
        <Route path="Settings" element={<SettingsHomepage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)

