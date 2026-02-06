import { useQuery } from "@tanstack/react-query"
import { fetchAllControls } from "./api"
import { fetchCalibrations } from "./api"

function useControls (activeSite) {

    return useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => fetchCalibrations(activeSite.site_id),
        enabled: !!activeSite,
    })
}

function useAllControls () {

    return useQuery({
		queryKey: ['allControls'],
		queryFn: () => fetchAllControls(),
	})
}

export { useAllControls, useControls }