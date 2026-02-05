import fetchResults from "./fetchResults";
import { useQuery } from "@tanstack/react-query";

export default function useResults (activeSite) {

    return useQuery({
        queryKey: ['portalResults', activeSite],
        queryFn: () => fetchResults(activeSite.site_id),
        enabled: !!activeSite,
    })

}