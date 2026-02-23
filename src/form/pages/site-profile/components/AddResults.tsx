import FormSection from "../../results-add/FormSection";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddResults () {

    return (
            <Dialog>
                <DialogTrigger asChild>
                    <button 
                        className="
                            w-full h-full p-6
                            flexCenter flex-col gap-2
                            rounded bg-surface/40 text-neutral-light
                            text-lg font-medium tracking-wide
                            border border-neutral-light/50 shadow-sm
                            transition-all cursor-pointer 
                            hover:bg-surface/80 hover:border-primary hover:text-primary hover:shadow-lg
                            active:translate-y-0
                        "
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <p>Add Calibration</p>
                    </button>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogTitle>Add Calibration Results</DialogTitle>
                        <FormSection />
                </DialogContent>
            </Dialog>
    )
}