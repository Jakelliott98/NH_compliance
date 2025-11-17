import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import SettingsHomepage from './pages/settings/SettingsHomepage.tsx'
import DashboardPage from './pages/dashboard/DashboardPage.tsx'
import CompliancePage from './pages/compliance/CompliancePage.tsx'
import SitesDashboard from './pages/compliance/sites/SitesHomepage.tsx'
import ReportSection from './pages/compliance/reports/Reports.tsx'
import SitePage from './pages/site/SitePage.tsx'
import SiteResults from './pages/site/site-sub-pages/results/SiteResults.tsx'
import SiteCalibration from './pages/site/site-sub-pages/calibrations/SiteCalibration.tsx'
import SiteOverview from './pages/site/site-sub-pages/overview/SiteOverview.tsx'

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
            <Route path="Overview" element={<SiteOverview />}/>
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