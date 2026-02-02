import CreateSiteSlug from "./create-site-slug"

interface DataObj {
teamLeader: string, siteName:string , region:string 
}

const addSite = async (data: DataObj, supabase) => {

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

export default addSite;