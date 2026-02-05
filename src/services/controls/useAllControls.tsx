import { useQuery } from "@tanstack/react-query"
import fetchAllControls from "./fetchAllControls"

export default function useAllControls () {

    return useQuery({
		queryKey: ['allControls'],
		queryFn: () => fetchAllControls(),
	})
}


