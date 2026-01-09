import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App, { HomeNav } from './App.tsx'
import SettingsHomepage from './portal/pages/settings/SettingsHomepage.tsx'
import DashboardPage from './portal/pages/dashboard/DashboardPage.tsx'
import CompliancePage from './portal/pages/compliance/CompliancePage.tsx'
import SitesDashboard from './portal/pages/compliance/sites/SitesHomepage.tsx'
import ReportSection from './portal/pages/compliance/reports/Reports.tsx'
import SitePage from './portal/pages/site/SitePage.tsx'
import Portal from './portal/Portal.tsx'
import Form from './form/Form.tsx'
import SiteSearchContainer from './form/pages/site-search/SiteSearchContainer.tsx'
import SiteProfile from './form/pages/site-profile/SiteProfile.tsx'
import SiteProfileContainer from './form/pages/site-profile/SiteProfileContainer.tsx'
import ReportsExports from './portal/pages/settings/reports-exports/ReportsExports.tsx'
import ComplianceRules from './portal/pages/settings/ComplianceRules.tsx'
import SiteConfiguration from './portal/pages/settings/SiteConfiguration.tsx'
import OrganiseSites from './portal/pages/settings/organise-sites/OrganiseSites.tsx'

const root = document.getElementById('root');

if (!root) throw Error;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomeNav />}/>

        <Route path="Portal" element={<Portal />}>
          <Route index element={<DashboardPage />}/>
          <Route path="Dashboard" element={<DashboardPage />}/>
          <Route path="Compliance" element={<CompliancePage />}>
            <Route index element={<SitesDashboard/>}/>
            <Route path="Sites/:Site" element={<SitePage/>}/>
            <Route path="Sites" element={<SitesDashboard/>}/>
            <Route path="Sites/:Site" element={<SitePage />}/>
            <Route path="Reports" element={<ReportSection />}/>
          </Route>
          <Route path="Settings" element={<SettingsHomepage />}>
            <Route index element={<OrganiseSites/>}/>
            <Route path="Sites" element={<OrganiseSites/>}/>
            <Route path="Configuration" element={<SiteConfiguration/>}/>
            <Route path="Compliance" element={<ComplianceRules/>}/>
            <Route path="Exports" element={<ReportsExports/>}/>
          </Route>

        </Route>

          <Route path="SiteForm" element={<Form />}>c
            <Route index element={<SiteSearchContainer />} />
            <Route path="Sites/:Site" element={<SiteProfileContainer />}>
              <Route index element={<SiteProfile />}/>
            </Route >
          </Route>

      </Route>
    </Routes>
  </BrowserRouter>
)