import { useState, useEffect } from "react"
import supabase from "../../utility/supabase"
import SiteCard from "../../components/site-card/siteCard"

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
    }>
}

interface SitesHomeProps {
    region: string,
}

export default function SitesHome ({ region }: SitesHomeProps) {

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
            .eq('site_region', region)

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
    }, [region])

    const loadingDisplay = (<p>Loading...</p>)
    const cardsDisplay = sites.data.map(item => {
        return (
            <SiteCard title={item.site_name} date={'27th October'}/>
        )
    })

    return (
        <div>
            { sites.loading ? loadingDisplay : cardsDisplay}
        </div>
    )


}
