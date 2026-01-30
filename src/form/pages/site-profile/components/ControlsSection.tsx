import type { CalibrationDatabaseType } from "@/types/calibration"
import { ReturnControlSection } from "../../calibration-add/ReturnControlSection"
import { FormButtons } from "../SiteProfile"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react"
import CalibrationForm from "../../calibration-add/CalibrationFluidForm"

interface ControlsSectionProps {
    controls: CalibrationDatabaseType[],
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
        <div className="flex flex-col gap-1 lg:grid lg:grid-cols-4 gap-2">
            <div className=" lg:col-start-1 lg:col-end-4 flex [&>*]:grow gap-3">
                <ReturnControlSection title="Lipids" controlsData={controls} controlType="lipids"/>
                <ReturnControlSection title="HBA1c" controlsData={controls} controlType="hba1c"/>
            </div>
            <div className="h-full lg:col-start-4">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div className="h-full">
                            <FormButtons option={option} />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Add a control</DialogTitle>
                        <CalibrationForm closeDialog={() => setOpen(false)}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}