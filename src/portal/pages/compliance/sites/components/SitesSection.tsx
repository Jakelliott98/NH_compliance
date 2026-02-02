import { Link, useLocation } from "react-router"
import SiteCard from "./SiteCard"
import type { SiteDatabaseType } from "@/types/site"
import NoSites from "./sites-filters/NoSites"

interface SitesSectionProps {
    sites: SiteDatabaseType[],
}

export default function SitesSection({ sites }: SitesSectionProps) {

    const location = useLocation().pathname
    const isComplianceHomepage = location === '/Portal/Compliance'

    if (sites.length === 0) {
        return (<NoSites />)
    }

    return (
        <div className='p-2'>
                <div className='grid grid-cols-1 md:grid-cols-5 auto-rows-fr gap-2 md:gap-4'>
                    {
                        sites.map((site) => {
                            return (
                                    <Link to={`${isComplianceHomepage ? 'Sites/' : ''}${site.slug}`} key={site.site_id}>
                                        <SiteCard key={site.site_id} site={site}/>
                                    </Link>
                            )
                        })
                    }                                              
                </div>
        </div>
    )
}
