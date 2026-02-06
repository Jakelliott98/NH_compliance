import { useQuery } from "@tanstack/react-query"
import type { SiteDatabaseType } from "@/types/site"
import { fetchAllSites } from "./api"
import { fetchSiteBySlug } from "./api"

function useAllSites () {

    return useQuery<SiteDatabaseType[]>({
        queryKey: ['allSites'], 
        queryFn: () => fetchAllSites(),
    })
}

function useSiteBySlug (siteSlug?: string) {

    return useQuery({
        queryKey: ['portalActiveSite', siteSlug],
        queryFn: () => fetchSiteBySlug(siteSlug!),
        enabled: !!siteSlug,
    })
}

export { useSiteBySlug, useAllSites }