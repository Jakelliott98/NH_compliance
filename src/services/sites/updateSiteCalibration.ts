
const updateSiteCalibration = async (siteID: number, supabase) => {

    const { error } = await supabase
    .from('sites')
    .update({last_calibrated: new Date()})
    .eq('site_id', siteID)
    if (error) throw Error

}


export default updateSiteCalibration;