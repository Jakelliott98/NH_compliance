import { useEffect, useState } from "react";
import supabase from "../../utility/supabase";
import type { ResultsType } from "../../types/result";
import type { AffinionCardType } from "../../types/affinion";
import type { CalibrationType } from "../../types/calibration";

interface StateType{ 
    data: Array<AffinionCardType | CalibrationType | ResultsType | undefined>,
    loading: boolean,
    error: boolean,
}

export default function useFetchData (siteID: number, dataPoint: string) {

    const [data, setData] = useState<StateType>({
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