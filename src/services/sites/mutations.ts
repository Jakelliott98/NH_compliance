import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteSite, addSite, updateSite, updateSiteCalibration, type SiteInfoData } from "./api"
import { useSupabase } from "@/utils/useSupabase";

function useUpdateSite () {

    const supabase = useSupabase()
    const queryClient = useQueryClient()

    return useMutation({
            mutationFn: (siteInfo: SiteInfoData) => {
                return updateSite(siteInfo, supabase)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['allSites']})
        })

}

function useUpdateSiteCalibration (siteID: number) {

    const supabase = useSupabase()

    return useMutation({
        mutationFn: (siteID) => updateSiteCalibration(siteID, supabase)
    })
}

interface onDeleteSite {
    siteID: number,
}

function useDeleteSite () {

    const queryClient = useQueryClient()
    const supabase = useSupabase()

    return useMutation({
            mutationFn: ({ siteID }: onDeleteSite) => {
                return deleteSite(siteID, supabase)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey:['allSites']})
        })
}

function useAddSite () {

    const queryClient = useQueryClient()
    const supabase = useSupabase()

    return useMutation({
            mutationFn: (data) => {return addSite(data, supabase)},
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['allSites']})
    })
}

export { useDeleteSite, useUpdateSite, useUpdateSiteCalibration, useAddSite }