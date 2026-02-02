import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import fetchSiteBySlug from "@/services/sites/fetchSiteBySlug"
import fetchCalibrations from "@/services/controls/fetchControls"
import type { CalibrationDatabaseType } from "@/types/calibration"
import LipidsControlDisplay from "./LipidsControlDisplay"
import HBA1cControlDisplay from "./HBA1cControlDisplay"

export default function CalibrationSection () {

    const siteSlug = useParams().Site
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useQuery({
        queryKey: ['portalActiveSite', siteSlug],
        queryFn: () => {
            if (!siteSlug) throw new Error('Cannot find this site')
            return fetchSiteBySlug(siteSlug)},
            enabled: !!siteSlug,
    })
    const { data: controls, isError: controlError, isLoading: controlLoading} = useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => {
            if (!activeSite) throw new Error('Cannot find this site')
            return fetchCalibrations(activeSite.site_id)},
        enabled: !!activeSite,
    })
    if (siteError) return <p>Error loading site</p>;
    if (!activeSite) return <p>No site found</p>;
    if (siteLoading || controlLoading) return <p>Loading...</p>;
    if (!controls) return (<p>No afinions found</p>)
    if (controlError) return (<p>Something went wrong...</p>)

    return (
        <div className='w-full flex-1 flex flex-col gap-3 p-3'>
            <div className=' flex gap-8'>
                {
                    <CalibrationHolder controls={controls}/>
                }
             </div>
        </div>
    )

}

interface CalibrationHolderProps {
    controls: CalibrationDatabaseType[],
}

function CalibrationHolder ({ controls }: CalibrationHolderProps) {

    const hba1c = controls.find(control => control.test_type === 'hba1c')
    const lipids = controls.filter(control => control.control_type === 'lipids')

    return (
        <div className="w-full flex flex-col [&>*]:flex-1 gap-2">
            <HBA1cControlDisplay hba1c={hba1c} />
            <LipidsControlDisplay lipids={lipids} />
        </div>
    )


}