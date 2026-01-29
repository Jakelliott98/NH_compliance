
const deleteSite = async (siteID: number, supabase) => {

    const { error } = await supabase
    .from('sites')
    .delete()
    .eq('site_id', siteID)

    if (error) throw Error;

}

export default deleteSite;