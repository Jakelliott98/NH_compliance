import type { SiteDatabaseType } from "@/types/site"
import supabase from "@/utils/supabase"

const fetchSiteById = async (siteID: number): Promise<SiteDatabaseType> => {

  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .eq('site_id', siteID)
    .single()

  if (error) throw error
  return data

}

export default fetchSiteById;