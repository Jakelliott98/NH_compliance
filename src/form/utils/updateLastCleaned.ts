import supabase from "@/utils/supabase"


const updateLastCleaned = async (affinionID) => {

    const today = new Date()

    const { error } = await supabase
    .from('affinions')
    .update({last_clean: today})
    .eq("affinion_id", affinionID)
    if (error) console.log(error)

}

export default updateLastCleaned;