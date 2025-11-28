import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App, { HomeNav } from './App.tsx'
import SettingsHomepage from './portal/pages/settings/SettingsHomepage.tsx'
import DashboardPage from './portal/pages/dashboard/DashboardPage.tsx'
import CompliancePage from './portal/CompliancePage.tsx'
import SitesDashboard from './portal/pages/compliance/sites/SitesHomepage.tsx'
import ReportSection from './portal/pages/compliance/reports/Reports.tsx'
import SitePage from './portal/pages/site/SitePage.tsx'
import SiteResults from './portal/pages/site/site-sub-pages/results/SiteResults.tsx'
import SiteCalibration from './portal/pages/site/site-sub-pages/calibrations/SiteCalibration.tsx'
import SiteOverview from './portal/pages/site/site-sub-pages/overview/SiteOverview.tsx'
import Portal from './portal/Portal.tsx'
import Form from './form/Form.tsx'
import SiteForm from './form/pages/site-search/SiteForm.tsx'
import OptionForms from './form/pages/OptionForms.tsx'
import ResultsForm from './form/pages/results-add/ResultsForm.tsx'
import FormHolder from './form/pages/FormHolder.tsx'
import CalibrationForm from './form/pages/calibration-add/CalibrationFluidForm.tsx'
import AffinionsForm from './form/pages/affinion-add/AffinionsForm.tsx'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomeNav />}/>
        <Route path="Portal" element={<Portal />}>
          <Route index element={<DashboardPage />}/>
          <Route path="Dashboard" element={<DashboardPage />}/>
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
        <Route path="Form" element={<Form />}>
          <Route index element={<SiteForm />}/>
          <Route path="Options" element={<FormHolder />}>
            <Route index element={<OptionForms />}/>
            <Route path="Results-Form" element={<ResultsForm />}/>
            <Route path="Calibration-Form" element={<CalibrationForm />}/>
            <Route path="Affinion-Form" element={<AffinionsForm />}/>
          </Route >
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)