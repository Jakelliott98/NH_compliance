import supabase from "@/utils/supabase"


const updateLastCleaned = async (affinionID: number) => {

    const today = new Date()

    const { error } = await supabase
    .from('affinions')
    .update({last_clean: today})
    .eq("affinion_id", affinionID)
    
    if (error) throw error;

}

export default updateLastCleaned;