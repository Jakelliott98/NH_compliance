import { useState, useEffect } from "react";
import supabase from "../../utility/supabase";
import SiteCard from "../../components/site-card/siteCard";

    interface FetchState {
    data: Array<any>,
    loading: boolean,
    error: boolean,
}

interface SitesState extends Omit<FetchState, 'data'> {
    data: Array<{
        team_leader: string,
        site_name: string,
        site_region: string,
        last_calibrated: Date,
    }>
}

export default function SiteHomepage () {

    const [sites, setSites] = useState<SitesState>({
        data: [],
        loading: true,
        error: false,
    })

    useEffect(() => {
        const fetchSites = async (): Promise<void> => {
            const { data } = await supabase
            .from('sites')
            .select('*')

            if (!data) {
                return setSites((prev) => {
                    return {
                        ...prev,
                        error: true,
                    }
                })
            } else {
                return setSites((prev) => {
                    return {
                        ...prev,
                        loading: false,
                        data: data,
                    }
                })
            }
        }
        fetchSites()
    }, [])

    return (
        <div>
            {
                sites.data.map((site) => {
                    return (
                        <SiteCard title={site.site_name} date={site.last_calibrated}/>
                    )
                })
            }
        </div>
    )
}