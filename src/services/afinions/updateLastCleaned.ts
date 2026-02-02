
const updateLastCleaned = async (afinionID: number, supabase) => {

    const today = new Date()

    const { error } = await supabase
    .from('afinions')
    .update({last_clean: today})
    .eq("afinion_id", afinionID)
    
    if (error) throw error;

}

export default updateLastCleaned;