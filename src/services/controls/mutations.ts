import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addControl, updateControl } from "./api";
import type { ControlType } from "./api";
import type { RangesType } from "./api";
import { useSupabase } from "@/utils/useSupabase";

interface NewControlParameters {
    control: ControlType,
    testType: string,
    ranges: RangesType,
}

function useCreateControl () {

    const queryClient = useQueryClient()
    const supabase = useSupabase()

    return useMutation({
        mutationFn: ({control, testType, ranges}: NewControlParameters) => addControl(control, testType, ranges, supabase),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['controls']})
        }
    })
}

function useUpdateControl () {

    const queryClient = useQueryClient()
    const supabase = useSupabase()

    return useMutation({
        mutationFn: ({control, testType, ranges}: NewControlParameters) => updateControl(control, testType, ranges, supabase),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['controls']})
    })

}

export { useUpdateControl, useCreateControl }