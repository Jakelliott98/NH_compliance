import type { FetchState } from "@/hooks/useFetchData"
import type { CalibrationType } from "@/types/calibration"
import { ReturnControlSection } from "../calibration-add/ReturnControlSection"
import { FormButtons } from "../SiteProfile"

interface ControlsSectionProps {
    controls: FetchState<CalibrationType>
    onSubmit: (value: string) => void,

}

const option = {
    title: 'New Calibrations',
    text: 'Add a new calibration fluid.',
    optionalText: 'Note this will automatically replace the old calibration fluid.',
    value: 'Calibration-Form',
}

export default function ControlsSection ({ controls, onSubmit }: ControlsSectionProps) {

    return (
        <div className="grid grid-cols-4 gap-2">
            <div className="col-start-1 col-end-4 flex [&>*]:grow gap-3">
                <ReturnControlSection title="Lipids" controlsData={controls} controlType="lipids"/>
                <ReturnControlSection title="HBA1c" controlsData={controls} controlType="hba1c"/>
            </div>
            <div className="col-start-4">
                <FormButtons option={option} onSubmit={onSubmit}/>
            </div>
        </div>
    )
}