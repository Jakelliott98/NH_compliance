import { useQuery } from "@tanstack/react-query"
import type { SiteDatabaseType } from "@/types/site"
import fetchAllSites from "./fetchAllSites"

export default function useAllSites () {

    return useQuery<SiteDatabaseType[]>({
        queryKey: ['allSites'], 
        queryFn: () => fetchAllSites(),
    })

}