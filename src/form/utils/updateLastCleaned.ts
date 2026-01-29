
const updateLastCleaned = async (affinionID: number, supabase) => {

    const today = new Date()

    const { error } = await supabase
    .from('affinions')
    .update({last_clean: today})
    .eq("affinion_id", affinionID)
    
    if (error) throw error;

}

export default updateLastCleaned;