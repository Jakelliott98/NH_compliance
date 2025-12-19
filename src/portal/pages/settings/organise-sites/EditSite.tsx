import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useState } from "react"
import type { SiteInfoData } from '../../../utils/updateSite'
import updateSite from "@/portal/utils/updateSite"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import type { SiteDatabaseType } from "@/types/site"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface EditSiteProps {
    site: SiteDatabaseType,
}


function EditSite ({ site }: EditSiteProps) {

    const queryClient = useQueryClient()

    const [siteName, setSiteName] = useState(site.site_name)
    const [teamLeader, setTeamLeader] = useState(site.team_leader)
    const [region, setRegion] = useState(site.site_region)

    const saveSiteChanges = useMutation({
        mutationFn: (siteInfo: SiteInfoData) => {
            return updateSite(siteInfo)
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['allSites']})
    })



    const saveChanges = () => {
        const newSite = {
            siteID: site.site_id, 
            teamLeader: teamLeader, 
            siteName: siteName, 
            siteRegion: region, 
        }
        saveSiteChanges.mutate(newSite)
    }

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
                        <input className="rounded border-1 border-gray-200 px-2 py-1 text-sm" value={siteName} onChange={(e) => {setSiteName(e.target.value)}}/>
                    </div>
                    <div className="flex gap-5 [&>*]:flex-1">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-sm">Team Leader</label>
                            <input className="rounded border-1 border-gray-200 px-2 py-1 text-sm" value={teamLeader} onChange={(e) => {setTeamLeader(e.target.value)}}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-400 text-sm">Region</label>
                            <input className="rounded border-1 border-gray-200 px-2 py-1 text-sm" value={region} onChange={(e) => {setRegion(e.target.value)}}/>
                        </div>
                    </div>
                </div>
                <div className=" flex gap-2 items-end [&>*]:flex-1">
                    <button className="flex-1 rounded bg-white py-1 px-3 text-sm cursor-pointer border-1 border-green-700">Cancel</button>
                    <button className="flex-1 rounded bg-green-700 py-1 px-3 text-sm text-white cursor-pointer" onClick={() => {saveChanges()}}>Save</button>
                </div>
            </DialogContent>

        </Dialog>
    )

}

export default EditSite