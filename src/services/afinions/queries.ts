import { useQuery } from "@tanstack/react-query"
import type { SiteDatabaseType } from "@/types/site"
import { fetchAfinions, fetchAllAfinions } from "./api"

function useAfinions (activeSite: SiteDatabaseType) {

    return useQuery({
        queryKey: ['afinions', activeSite], 
        queryFn: () => fetchAfinions(activeSite.site_id),
        enabled: !!activeSite,
    })
}

function useAllAfinions () {

    return useQuery({
            queryKey: ['allAfinions'],
            queryFn: () => fetchAllAfinions(),
    }) 
}

export { useAllAfinions, useAfinions }