import createAfinion from "./createAfinion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AfinionData } from "./createAfinion";
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

export default useCreateAfinion;