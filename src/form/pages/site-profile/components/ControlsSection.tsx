import type { CalibrationDatabaseType } from "@/types/calibration"
import { ReturnControlSection } from "../../calibration-add/ReturnControlSection"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react"
import CalibrationForm from "../../calibration-add/CalibrationFluidForm"

interface ControlsSectionProps {
    controls: CalibrationDatabaseType[],
}

export default function ControlsSection ({ controls }: ControlsSectionProps) {

    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex flex-col lg:flex-row gap-2 lg:w-10/12">
                <ReturnControlSection title="Lipids" controlsData={controls} controlType="lipids"/>
                <ReturnControlSection title="HBA1c" controlsData={controls} controlType="hba1c"/>
            </div>
            <div className="lg:w-2/12">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <button 
                            className="
                                w-full h-full p-6
                                flexCenter flex-col gap-2
                                rounded bg-surface/40 text-neutral-light
                                text-lg font-medium tracking-wide
                                border border-neutral-light shadow-sm
                                transition-all cursor-pointer 
                                hover:bg-surface/80 hover:border-primary hover:text-primary  hover:shadow-lg
                                active:translate-y-0
                            "
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Add Control</p>
                        </button>
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