import type { FetchState } from "@/hooks/useFetchData"
import type { CalibrationType } from "@/types/calibration"
import { ReturnControlSection } from "../../calibration-add/ReturnControlSection"
import { FormButtons } from "../SiteProfile"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { useState } from "react"
import CalibrationForm from "../../calibration-add/CalibrationFluidForm"

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

export default function ControlsSection ({ controls }: ControlsSectionProps) {

    const [open, setOpen] = useState(false)

    return (
        <div className="grid grid-cols-4 gap-2">
            <div className="col-start-1 col-end-4 flex [&>*]:grow gap-3">
                <ReturnControlSection title="Lipids" controlsData={controls} controlType="lipids"/>
                <ReturnControlSection title="HBA1c" controlsData={controls} controlType="hba1c"/>
            </div>
            <div className="cold-start-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <div>
                            <FormButtons option={option} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <CalibrationForm />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}