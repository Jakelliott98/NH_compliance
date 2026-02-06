import { useMutation } from "@tanstack/react-query"
import { useContext } from "react"
import supabaseContext from "@/utils/supabaseContext"
import { addCalibrationResults } from "./api"

function useCreateResult () {
    
    const supabase = useContext(supabaseContext)

    return useMutation({
        mutationFn: ({ result }) => addCalibrationResults(result, supabase)
    })
}

export { useCreateResult }