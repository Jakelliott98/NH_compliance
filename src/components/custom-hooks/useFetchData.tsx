import { useEffect, useState } from "react";
import supabase from "../../utility/supabase";


export default function useFetchData (siteID: number, dataPoint: string) {

    const [data, setData] = useState({
        data: [],
        loading: true,
        error: false,
    })

    useEffect(() => {

        const fetchData = async () => {
            const { data } = await supabase
            .from(dataPoint)
            .select('*')
            .eq('site_id', siteID)
            setData({
                data: data,
                loading: false,
                error: false,
            })
        }

        fetchData();

    }, [siteID, dataPoint])

    return data;

}