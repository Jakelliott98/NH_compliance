import supabase from "@/utils/supabase"


const updateLastCalibration = async (affinionID) => {

    const today = new Date()

    const { error } = await supabase
    .from('affinions')
    .update({last_calibrated: today})
    .eq("affinion_id", affinionID)
    if (error) console.log(error)

}

export default updateLastCalibration;