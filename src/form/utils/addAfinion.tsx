
export interface AffinionData {
    siteID: number, 
    nhNumber: number, 
    number: string,
}

const addAfinion = async (affinionData: AffinionData, supabase) => {
    const { error } = await supabase
    .from('affinions')
    .insert({
        site_id: affinionData.siteID, 
        affinion_number: affinionData.number, 
        nh_number: affinionData.nhNumber, 
        last_calibrated: null, 
        last_clean: null,
    })
    if (error) throw error;
}

export default addAfinion;