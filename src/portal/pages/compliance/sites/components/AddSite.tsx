import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import AddSiteSection from "@/portal/pages/settings/organise-sites/AddSiteSection";
import { FormProvider, useForm } from "react-hook-form";
import { useAddSite } from "@/services/sites";

function AddSiteContainer () {

    const methods = useForm();
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='py-1 px-2 flex items-center gap-2 border border-gray-300 rounded text-gray-500 text-sm cursor-pointer hover:text-gray-700 hover:border-gray-700'>
                    <FontAwesomeIcon icon={faPlus} className=''/>
                    <p className=''>Add Site</p>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Site</DialogTitle>
                </DialogHeader>
                    <AddSiteSection onSubmit={onSubmit}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddSiteContainer;