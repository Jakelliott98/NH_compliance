import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog"
import { useState } from "react"
import type { SiteInfoData } from '../../../utils/updateSite'
import updateSite from "@/portal/utils/updateSite"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import type { SiteDatabaseType } from "@/types/site"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface SiteDetails {
        name: string,
        teamLeader: string,
        region: string,
}

interface EditSiteProps {
    siteDetails: SiteDetails,
    onSubmit: () => void,
    onChange: (key: string, value: string) => void,
}

interface EditSiteContainerProps {
    site: SiteDatabaseType,
}

export default function EditSiteContainer ({site}: EditSiteContainerProps) {

    const queryClient = useQueryClient()

    const [siteDetails, setSiteDetails] = useState<SiteDetails>({
        name: site.site_name,
        teamLeader: site.team_leader,
        region: site.site_region
    })

    const saveSiteChanges = useMutation({
        mutationFn: (siteInfo: SiteInfoData) => {
            return updateSite(siteInfo)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['allSites']})
    })

    const onChange = (key: string, value: string) => {

        setSiteDetails((prev) => {
            return {
                key: value,
                ...prev,
            }
        })

    }

    const onSubmit = () => {
        const newSite = {
            siteID: site.site_id, 
            teamLeader: siteDetails.teamLeader, 
            siteName: siteDetails.name, 
            siteRegion: siteDetails.region, 
        }
        saveSiteChanges.mutate(newSite)
    }

    return (
        <>
            <EditSite siteDetails={siteDetails} onSubmit={onSubmit} onChange={onChange}/>
        </>
    )

}

function EditSite ({ siteDetails, onSubmit, onChange }: EditSiteProps) {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="cursor-pointer hover:text-black">
                    <FontAwesomeIcon icon={faPenToSquare}/> 
                    <span className="pl-0.5">Edit</span>
                </button>
            </DialogTrigger>
            <DialogContent>
                <h1 className="font-bold text-lg">Edit Site</h1>
                <div>

                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-400 text-sm">Site Name</label>
                        <input className="rounded border-1 border-gray-200 px-2 py-1 text-sm" value={siteDetails.name} onChange={(e) => {onChange('name' ,e.target.value)}}/>
                    </div>
                    <div className="flex gap-5 [&>*]:flex-1">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-sm">Team Leader</label>
                            <input className="rounded border-1 border-gray-200 px-2 py-1 text-sm" value={siteDetails.teamLeader} onChange={(e) => {onChange('teamLeader', e.target.value)}}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-sm">Region</label>
                            <input className="rounded border-1 border-gray-200 px-2 py-1 text-sm" value={siteDetails.region} onChange={(e) => {onChange('region', e.target.value)}}/>
                        </div>
                    </div>
                </div>
                <div className=" flex gap-2 items-end [&>*]:flex-1">
                    <DialogClose className="flex-1">
                    <button className="w-full rounded bg-gray-100 py-1 px-3 text-sm cursor-pointer hover:bg-gray-200">Cancel</button>
                    </DialogClose>
                    <DialogClose className="flex-1">
                    <button className="w-full rounded bg-green-700 py-1 px-3 text-sm text-white cursor-pointer hover:bg-green-800" onClick={() => {onSubmit()}}>Save</button>
                    </DialogClose>
                </div>
            </DialogContent>

        </Dialog>
    )

}
