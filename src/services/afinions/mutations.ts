import { createAfinion } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AfinionData } from "./api";
import { updateLastCleaned, updateLastCalibration } from "./api";
import { useSupabase } from "@/utils/useSupabase";

function useCreateAfinion () {

    const supabase = useSupabase()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (afinionData: AfinionData) => createAfinion(afinionData, supabase),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['afinions']})
        }
    }) 

}

function useUpdateLastClean () {

    const queryClient = useQueryClient()
    const supabase = useSupabase()

    return useMutation({
        mutationFn: ({ afinionID }) => updateLastCleaned(afinionID, supabase),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['afinions']})
    })
}

function useUpdateLastCalibration () {

    const queryClient = useQueryClient()
    const supabase = useSupabase()

    return useMutation({
        mutationFn: ({ afinionID }) => updateLastCalibration(afinionID, supabase),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['afinions']})
    })
}

export { useCreateAfinion, useUpdateLastClean, useUpdateLastCalibration }