import { FormButtons } from "../SiteProfile";
import FormSection from "../../results-add/FormSection";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

const option = {
    title: 'New Result',
    text: 'Add a new set of affinion calibration results',
    value: 'Results-Form',
}

export default function AddResults () {

    return (
            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <FormButtons option={option}/>
                    </div>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogTitle>Add Calibration Results</DialogTitle>
                        <FormSection />
                </DialogContent>
            </Dialog>
    )
}