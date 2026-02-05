import { useQuery } from "@tanstack/react-query"
import fetchSiteBySlug from "./fetchSiteBySlug"

export default function useSiteBySlug (siteSlug?: string) {

    return useQuery({
        queryKey: ['portalActiveSite', siteSlug],
        queryFn: () => fetchSiteBySlug(siteSlug!),
        enabled: !!siteSlug,
    })
}