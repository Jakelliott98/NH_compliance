import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import AddSiteSection from "@/portal/pages/settings/organise-sites/AddSiteSection";
import { FormProvider, useForm } from "react-hook-form";
import { useAddSite } from "@/services/sites";
import type { AddSiteType } from "@/services/sites";
import { useState } from "react";

function AddSiteContainer () {

    const methods = useForm<AddSiteType>();
    const { handleSubmit }  = methods;

    const { mutate: addSite } = useAddSite()

    const onAddSiteSubmit = handleSubmit((data) => {
        addSite(data)
    })

    return (
        <FormProvider {...methods}>
            <AddSite onSubmit={onAddSiteSubmit}/>
        </FormProvider>
    )

}

interface AddSiteProps {
    onSubmit: () => void,
}

function AddSite ({ onSubmit }: AddSiteProps) {

    const [open, setOpen] = useState(false)

    const OnSubmitForm = () => {
        onSubmit()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className='py-1 px-2 flex items-center gap-2 border border-gray-300 rounded text-neutral-light text-sm cursor-pointer hover:text-neutral-light hover:border-gray-700'>
                    <FontAwesomeIcon icon={faPlus} className=''/>
                    <p className=''>Add Site</p>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Site</DialogTitle>
                </DialogHeader>
                    <AddSiteSection onSubmit={OnSubmitForm}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddSiteContainer;