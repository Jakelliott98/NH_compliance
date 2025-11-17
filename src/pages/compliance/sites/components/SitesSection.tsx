import { Link } from "react-router"
import SiteCard from "./SiteCard"

export default function SitesSection({ sites }) {
    return (
        <div className='p-2'>
                <h1 className='text-lg'>Sites</h1>
                <div className='grid grid-cols-5 grid-rows-[1fr] gap-4'>
                    {
                        sites.map((item) => {
                            return (
                                    <Link to={`${item.slug}`} key={item.site_id}><SiteCard key={item.site_id} site={item}/></Link>
                            )
                        })
                    }                                              
                </div>
        </div>
    )
}