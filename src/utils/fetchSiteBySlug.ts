import supabase from "@/utils/supabase"

const fetchSiteBySlug = async (siteSlug: string) => {
  console.log('called')
  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .eq('slug', siteSlug)
    .single()

  if (error) throw error
  return data

}

export default fetchSiteBySlug;