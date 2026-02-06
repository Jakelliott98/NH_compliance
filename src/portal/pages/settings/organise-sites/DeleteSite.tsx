import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import type { SiteDatabaseType } from "@/types/site"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDeleteSite } from "@/services/sites"

interface DeleteSiteContainerProps {
    site: SiteDatabaseType,
}


interface DeleteSiteProps {
    site: SiteDatabaseType,
    onSubmit: () => void,
}

export default function DeleteSiteContainer ({ site }: DeleteSiteContainerProps) {

    const { mutate: deleteSite } = useDeleteSite()

    const onSubmit = () => deleteSite({siteID: site.site_id})

    return (
        <DeleteSite site={site} onSubmit={onSubmit} />
    )
}

function DeleteSite ({ site, onSubmit }: DeleteSiteProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="cursor-pointer hover:text-black">
                    <FontAwesomeIcon icon={faTrashCan}/> 
                    <span className="sm-hidden-inline pl-0.5">Remove</span>
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                        <div className="flex flex-col items-center gap-5">
                            <FontAwesomeIcon icon={faTrashCan} className="text-3xl bg-red-100 p-5 rounded-full text-red-700"/>
                            <h1 className="font-bold text-lg">Delete</h1>  
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <p>Are you sure you want to delete {site.site_name} ?</p>
                            <p className="italic text-sm text-red-700">This will delete all sites results.</p>
                        </div>
                </DialogHeader>
                <div className="flex gap-5">
                    <DialogClose className="flex-1">
                        <button className="w-full rounded bg-gray-100 py-1 px-3 text-sm cursor-pointer hover:bg-gray-200">Cancel</button>
                    </DialogClose>
                    <DialogClose className="flex-1">
                        <button className="w-full rounded bg-red-700 py-1 px-3 text-sm text-white cursor-pointer hover:bg-red-800" onClick={() => {onSubmit()}}>Confirm</button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}
