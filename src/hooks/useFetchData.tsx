import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

export interface FetchState<T> {
    data: T[],
    loading: boolean,
    error: boolean,
}

export default function useFetchData<T>(siteID: number, dataPoint: string) {

    const [data, setData] = useState<FetchState<T>>({
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
                data: data as T[],
                loading: false,
                error: false,
            })
        }

        fetchData();

    }, [siteID, dataPoint])

    return data;

}