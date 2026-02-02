
export interface SiteInfoData {
    siteID: number, 
    teamLeader: string, 
    siteName: string, 
    siteRegion: string  
}

const updateSite = async (siteInfo: SiteInfoData, supabase) => {
    
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

export default updateSite;