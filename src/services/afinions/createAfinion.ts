
export interface AfinionData {
    siteID: number, 
    nhNumber: number, 
    number: string,
}

const createAfinion = async (afinionData: AfinionData, supabase) => {
    const { error } = await supabase
    .from('afinions')
    .insert({
        site_id: afinionData.siteID, 
        afinion_number: afinionData.number, 
        nh_number: afinionData.nhNumber, 
        last_calibrated: null, 
        last_clean: null,
    })
    if (error) throw error;
}

export default createAfinion;