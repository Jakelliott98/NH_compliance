import CreateSiteSlug from "../../utils/create-site-slug"
import type { SiteDatabaseType } from "@/types/site";
import supabase from "@/utils/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

interface DataObj {
teamLeader: string, siteName:string , region:string 
}

export interface SiteInfoData {
    siteID: number, 
    teamLeader: string, 
    siteName: string, 
    siteRegion: string  
}

const addSite = async (data: DataObj, supabase: SupabaseClient) => {

const { error } = await supabase
    .from('sites')
    .insert([{
        team_leader:  data.teamLeader,
        site_name: data.siteName,
        site_region: data.region,
        slug: CreateSiteSlug(data.siteName)

    }])
    if (error) throw error;
    
}


const deleteSite = async (siteID: number, supabase: SupabaseClient) => {

    const { error } = await supabase
    .from('sites')
    .delete()
    .eq('site_id', siteID)

    if (error) throw Error;

}

const fetchAllSites = async (): Promise<SiteDatabaseType[]> => {

    const { data, error } = await supabase
        .from('sites')
        .select('*')

    if (error) throw error;
    return data
    
}

const fetchSiteBySlug = async (siteSlug: string): Promise<SiteDatabaseType> => {

  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .eq('slug', siteSlug)
    .single()

  if (error) throw error
  return data

}

const updateSite = async (siteInfo: SiteInfoData, supabase: SupabaseClient) => {
    
    const { error } = await supabase
    .from('sites')
    .update({
        team_leader: siteInfo.teamLeader,
        site_name: siteInfo.siteName,
        site_region: siteInfo.siteRegion,
    })
    .eq('site_id', siteInfo.siteID)

    if (error) throw Error
}

const updateSiteCalibration = async (siteID: number, supabase: SupabaseClient) => {

    const { error } = await supabase
    .from('sites')
    .update({last_calibrated: new Date()})
    .eq('site_id', siteID)
    if (error) throw Error

}

export { deleteSite, addSite, updateSite, updateSiteCalibration, fetchAllSites, fetchSiteBySlug}