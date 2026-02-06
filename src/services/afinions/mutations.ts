import { createAfinion } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AfinionData } from "./api";
import { useContext } from "react";
import supabaseContext from "@/utils/supabaseContext";

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

export { useCreateAfinion }