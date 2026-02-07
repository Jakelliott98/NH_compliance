import { useMutation } from "@tanstack/react-query"
import { addCalibrationResults } from "./api"
import { useSupabase } from "@/utils/useSupabase"

function useCreateResult () {
    
    const supabase = useSupabase()

    return useMutation({
        mutationFn: (result) => addCalibrationResults(result, supabase)
    })
}

export { useCreateResult }