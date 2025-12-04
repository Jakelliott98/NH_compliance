import { useState } from "react";
import { FormButtons } from "../SiteProfile";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import FormSection from "../../results-add/FormSection";

const option = {
    title: 'New Result',
    text: 'Add a new set of affinion calibration results',
    value: 'Results-Form',
}

export default function AddResults () {

    const [open, setOpen] = useState(false)

    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div>
                        <FormButtons option={option} />
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <FormSection />
                </PopoverContent>
            </Popover>
        </div>
    )
}