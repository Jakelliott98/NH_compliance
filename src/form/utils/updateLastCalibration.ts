
const updateLastCalibration = async (affinionID: number, supabase) => {

    const today = new Date()

    const { error } = await supabase
    .from('affinions')
    .update({last_calibrated: today})
    .eq("affinion_id", affinionID)
    
    if (error) throw error;

}

export default updateLastCalibration;