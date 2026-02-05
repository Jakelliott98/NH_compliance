import './App.css'
import SettingsHomepage from './portal/pages/settings/SettingsHomepage.tsx'
import DashboardPage from './portal/pages/dashboard/DashboardPage.tsx'
import CompliancePage from './portal/pages/compliance/CompliancePage.tsx'
import SitesDashboardContainer from './portal/pages/compliance/sites/SitesHomepage.tsx'
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
import { Route, Routes } from 'react-router'
import { HomeNav } from './HomeNav.tsx'
import { HomeSection } from './HomeSection.tsx'
import { useSession } from '@clerk/clerk-react'
import { createClient } from '@supabase/supabase-js'
import supabaseContext from './utils/supabaseContext.tsx'

function App() {

  const { session } = useSession()

  function createClerkSupabaseClient () {

      return createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        {
          async accessToken() {
            return session?.getToken() ?? null
          },
        },
      )
  }

  const client = createClerkSupabaseClient();
  
  return (
    <supabaseContext.Provider value={client}>
      <Routes>
        <Route path="/" element={<HomeSection />}>
          <Route path="/" element={<HomeNav />}/>
            <Route path="Portal" element={<Portal />}>
              <Route index element={<DashboardPage />}/>
              <Route path="Dashboard" element={<DashboardPage />}/>
              <Route path="Compliance" element={<CompliancePage />}>
                <Route index element={<SitesDashboardContainer/>}/>
                <Route path="Sites" element={<SitesDashboardContainer/>}/>
                <Route path="Sites/:Site" element={<SitePage />}/>
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
  </supabaseContext.Provider>
)}


export default App;