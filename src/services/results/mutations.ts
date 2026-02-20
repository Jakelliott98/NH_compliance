import { useMutation } from "@tanstack/react-query"
import { addCalibrationResults } from "./api"
import { useSupabase } from "@/utils/useSupabase"
import type { ResultType } from "./api"

function useCreateResult () {
    
    const supabase = useSupabase()

    return useMutation({
        mutationFn: (result: ResultType) => addCalibrationResults(result, supabase)
    })
}

export { useCreateResult }