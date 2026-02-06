import { useParams } from "react-router"
import type { CalibrationDatabaseType } from "@/types/calibration"
import LipidsControlDisplay from "./LipidsControlDisplay"
import HBA1cControlDisplay from "./HBA1cControlDisplay"
import useSiteBySlug from "@/services/sites/useSiteBySlug"
import { useControls } from "@/services/controls/queries"

export default function CalibrationSection () {

    const siteSlug = useParams().Site
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useSiteBySlug(siteSlug)
    const { data: controls, isError: controlError, isLoading: controlLoading} = useControls(activeSite)
    if (siteError) return <p>Error loading site</p>;
    if (!activeSite) return <p>No site found</p>;
    if (siteLoading || controlLoading) return <p>Loading...</p>;
    if (!controls) return (<p>No afinions found</p>)
    if (controlError) return (<p>Something went wrong...</p>)

    return (
        <div className='w-full md:px-5'>
            <CalibrationHolder controls={controls}/>
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