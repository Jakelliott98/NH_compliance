import { useQuery } from "@tanstack/react-query"
import fetchAfinions from "./fetchAfinions"
import type { SiteDatabaseType } from "@/types/site"

export default function useAfinions (activeSite: SiteDatabaseType) {

    return useQuery({
        queryKey: ['afinions', activeSite], 
        queryFn: () => fetchAfinions(activeSite.site_id),
        enabled: !!activeSite,
    })
}