import { fetchResults } from "./api";
import { useQuery } from "@tanstack/react-query";

function useResults (activeSite) {

    return useQuery({
        queryKey: ['portalResults', activeSite],
        queryFn: () => fetchResults(activeSite.site_id),
        enabled: !!activeSite,
    })

}

export { useResults }