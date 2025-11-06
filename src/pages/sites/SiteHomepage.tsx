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
                        <SiteCard title={site.site_name} date={"27th October"}/>
                    )
                })
            }
        </div>
    )
}


/*

FUTURE SITE PAGE

        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col justify-between">
                <h1 className="text-xl font-bold">Canary Wharf</h1>
                <p>Anne Weyer</p>
            </div>
            <div className="w-full flex flex-row justify-between">
                <div className="bg-white rounded-xl p-2">
                    <p>Affinion 1</p>
                    <p>NH234567</p>
                    <p>Last Calibrated: '27 October'</p>
                </div>
                <div className="bg-white rounded-xl p-2">
                    <p>Affinion 2</p>
                    <p>NH234567</p>
                    <p>Last Calibrated: '27 October'</p>
                </div>
                <div className="bg-white rounded-xl p-2">
                    <p>Affinion 3</p>
                    <p>NH234567</p>
                    <p>Last Calibrated: '27 October'</p>
                </div>
            </div>
            <div className="flex flex-col w-full gap-2">
                <CalibrationCard date='27 October 2025' clinician='JE'/>
                <CalibrationCard date='3 November 2025' clinician='JE'/>
                <CalibrationCard date='10 November 2025' clinician='JE'/>
                <CalibrationCard date='17 November 2025' clinician='JE'/>

            </div>
        </div>
*/