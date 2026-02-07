import { useQuery } from "@tanstack/react-query"
import { fetchAllControls } from "./api"
import { fetchCalibrations } from "./api"
import type { SiteDatabaseType } from "@/types/site"

function useControls (activeSite :SiteDatabaseType | undefined) {

    return useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => fetchCalibrations(activeSite!.site_id),
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