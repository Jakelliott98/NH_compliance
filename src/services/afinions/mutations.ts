import { createAfinion } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AfinionData } from "./api";
import { useContext } from "react";
import supabaseContext from "@/utils/supabaseContext";
import { updateLastCleaned, updateLastCalibration } from "./api";

function useCreateAfinion () {

    const supabase = useContext(supabaseContext)
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
    const supabase = useContext(supabaseContext)

    return useMutation({
        mutationFn: ({ afinionID }) => updateLastCleaned(afinionID, supabase),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['afinions']})
    })
}

function useUpdateLastCalibration () {

    const queryClient = useQueryClient()
    const supabase = useContext(supabaseContext)

    return useMutation({
        mutationFn: ({ afinionID }) => updateLastCalibration(afinionID, supabase),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['afinions']})
    })
}

export { useCreateAfinion, useUpdateLastClean, useUpdateLastCalibration }