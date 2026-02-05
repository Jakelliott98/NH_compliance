import { useQuery } from "@tanstack/react-query"
import fetchCalibrations from "./fetchControls"

export default function useControls (activeSite) {

    return useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => fetchCalibrations(activeSite.site_id),
        enabled: !!activeSite,
    })
}