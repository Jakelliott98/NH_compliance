import supabase from "../utils/supabase";

export default async function fetchSiteBySlug(siteSlug: string) {
  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .eq('slug', siteSlug)
    .single() // if you expect only one site

  if (error) throw error
  return data
}