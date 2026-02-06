import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import supabaseContext from "@/utils/supabaseContext"
import { deleteSite, addSite, updateSite, updateSiteCalibration, type SiteInfoData } from "./api"

function useUpdateSite () {

    const supabase = useContext(supabaseContext)
    const queryClient = useQueryClient()

    return useMutation({
            mutationFn: (siteInfo: SiteInfoData) => {
                return updateSite(siteInfo, supabase)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['allSites']})
        })

}

function useUpdateSiteCalibration (siteID: number) {

    const supabase = useContext(supabaseContext)

    return useMutation({
        mutationFn: (siteID) => updateSiteCalibration(siteID, supabase)
    })
}

interface onDeleteSite {
    siteID: number,
}

function useDeleteSite () {

    const queryClient = useQueryClient()
    const supabase = useContext(supabaseContext)

    return useMutation({
            mutationFn: ({ siteID }: onDeleteSite) => {
                return deleteSite(siteID, supabase)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey:['allSites']})
        })
}

function useAddSite () {

    const queryClient = useQueryClient()
    const supabase = useContext(supabaseContext)

    return useMutation({
            mutationFn: (data) => {return addSite(data, supabase)},
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['allSites']})
    })
}

export { useDeleteSite, useUpdateSite, useUpdateSiteCalibration, useAddSite }