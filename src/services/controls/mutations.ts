import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addControl, updateControl } from "./api";
import supabaseContext from "@/utils/supabaseContext";
import type { ControlType } from "./api";
import type { RangesType } from "./api";
import { useContext } from "react";

interface NewControlParameters {
    control: ControlType,
    testType: string,
    ranges: RangesType,
}

function useCreateControl () {

    const queryClient = useQueryClient()
    const supabase = useContext(supabaseContext)

    return useMutation({
        mutationFn: ({control, testType, ranges}: NewControlParameters) => addControl(control, testType, ranges, supabase),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['controls']})
        }
    })
}

function useUpdateControl () {

    const queryClient = useQueryClient()
    const supabase = useContext(supabaseContext)

    return useMutation({
        mutationFn: ({control, testType, ranges}: NewControlParameters) => updateControl(control, testType, ranges, supabase),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['controls']})
    })

}

export { useUpdateControl, useCreateControl }