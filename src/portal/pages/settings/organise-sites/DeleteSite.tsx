import { Dialog, DialogHeader, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import deleteSite from "@/portal/utils/deleteSite"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import type { SiteDatabaseType } from "@/types/site"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface DeleteSiteContainerProps {
    site: SiteDatabaseType,
}

interface onDeleteSite {
    siteID: number,
}

interface DeleteSiteProps {
    site: SiteDatabaseType,
    onSubmit: () => void,
}

export default function DeleteSiteContainer ({ site }: DeleteSiteContainerProps) {

    const queryClient = useQueryClient()

    const onSubmit = () => {
        deleteCurrentSite.mutate({siteID: site.site_id})
    }

        const deleteCurrentSite = useMutation({
        mutationFn: ({ siteID }: onDeleteSite) => {
            return deleteSite(siteID)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey:['allSites']})
    })

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
                    <span className="pl-0.5">Remove</span>
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
                    <button className="flex-1 rounded bg-gray-100 py-1 px-3 text-sm cursor-pointer">Cancel</button>
                    <button className="flex-1 rounded bg-red-700 py-1 px-3 text-sm text-white cursor-pointer" onClick={() => {onSubmit()}}>Confirm</button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
