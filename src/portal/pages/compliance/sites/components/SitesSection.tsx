import { Link, useLocation } from "react-router"
import SiteCard from "./SiteCard"
import type { SiteDatabaseType } from "@/types/site"
import { useEffect, useState } from "react"
import type { SearchSiteState } from "../SitesHomepage"

interface SitesSectionProps {
    sites: SiteDatabaseType[],
    searchSite: SearchSiteState,
}

export default function SitesSection({ sites, searchSite }: SitesSectionProps) {

    const location = useLocation().pathname
    const isComplianceHomepage = location === '/Portal/Compliance'

    console.log(searchSite)

    const [filteredSites, setFilteredSites] = useState(sites)

    useEffect(() => {
        if (searchSite.isActive) {
            setFilteredSites(sites.filter(site => site.site_name.toLowerCase().includes(searchSite.searchTerm.toLowerCase())))
        } else {
            setFilteredSites(sites)
        }
    }, [searchSite, sites])


    return (
        <div className='p-2'>
                <div className='grid grid-cols-5 grid-rows-[1fr] gap-4'>
                    {
                        filteredSites.map((site) => {
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