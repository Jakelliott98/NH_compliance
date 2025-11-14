import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import SettingsHomepage from './pages/settings/SettingsHomepage.tsx'
import DashboardPage from './pages/dashboard_page/DashboardPage.tsx'
import CompliancePage from './pages/compliance_page/CompliancePage.tsx'
import SitesDashboard from './pages/compliance_page/sites_dashboard/SitesDashboard.tsx'
import ReportSection from './pages/compliance_page/reports/Reports.tsx'
import SitePage from './components/site-page/SitePage.tsx'
import SiteResults from './components/site-page/pages/SiteResults.tsx'
import SiteCalibration from './components/site-page/pages/site-calibration/SiteCalibration.tsx'
import SiteOverview from './components/site-page/pages/SiteOverview.tsx'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<DashboardPage />}/>
        <Route path="Compliance" element={<CompliancePage />}>
          <Route path="Sites" element={<SitesDashboard/>}/>
          <Route path="Sites/:Site" element={<SitePage />}>
            <Route index element={<SiteOverview />}/>
            <Route path="Results" element={<SiteResults />}/>
            <Route path="Calibration" element={<SiteCalibration />}/>
          </Route>
          <Route path="Reports" element={<ReportSection />}/>
        </Route>
        <Route path="Settings" element={<SettingsHomepage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)



/*           <Route path="Site" element={<SitePage />}/>
*/