import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck, faHandshakeSlash } from "@fortawesome/free-solid-svg-icons";
import { FormButtons } from "../SiteProfile";
import { useState } from "react";
import AffinionFormSection from "../../affinion-add/AffinionsForm";
import type { AffinionDatabaseType } from "@/types/affinion";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

const affinionButton = {
    title: 'New Affinion',
    text: 'Add a new affinion to your site.',
    value: 'Affinion-Form',
}

interface AffinionSectionProps {
    affinions: AffinionDatabaseType[]
}

export default function AffinionSection ({ affinions }: AffinionSectionProps) {

    const [open, setOpen] = useState(false)
    const sortedAffinions = affinions.sort((a, b) => a.affinion_number - b.affinion_number)

    return (
        <div className="h-full grid grid-cols-4 gap-2">
            <div className="flex gap-3 col-start-1 col-end-4 h-full">
                <AffinionsDisplay affinions={sortedAffinions} />
            </div>
            <div className="col-start-4 h-full w-full">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div className="h-full">
                            <FormButtons option={affinionButton} />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Add an Affinion</DialogTitle>
                        <div>
                            <AffinionFormSection closeDialog={() => {setOpen(false)}}/>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

interface AffinionsDisplayProps {
    affinions: AffinionDatabaseType[],
}

function AffinionsDisplay ({ affinions }: AffinionsDisplayProps) {

    if (affinions.length === 0) {
        return (
            <div className="bg-white flex flex-col justify-center items-center w-full">
                        <FontAwesomeIcon icon={faHandshakeSlash} className="pb-5 text-gray-300" />
                        <p className="text-sm text-gray-500">No Affinions added yet</p>
                        <p className="text-xs text-gray-500">Add Affinions to start submitting results.</p>
            </div>
        )
    }

    return (
        affinions.map((affinion) => {
            return (
                <div className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded flex-grow flex flex-col justify-around items-center shadow-sm" key={affinion.affinion_id}>
                    <FontAwesomeIcon className="text-green-700/90 text-3xl" icon={faCalendarCheck} />
                    <p className="font-semibold text-center text-lg text-slate-900">Affinion {affinion.affinion_number}</p>
                    {
                        affinion.last_clean ? (
                            <p className="text-sm">
                                Calibrated:
                                <span className="italics text-slate-700"> {affinion.last_calibrated === null ? '' : moment(affinion.last_calibrated).format('Do MMM')}</span>
                            </p>
                        ) : (
                            <p className="text-sm text-red-700/80 italic">No Calibrations Yet</p>
                        )
                    }
                    {
                        affinion.last_clean ? (
                            <p className="text-sm">
                                Cleaned:
                                <span className="italics text-slate-700"> {affinion.last_clean === null ? '' : moment(affinion.last_clean).format('Do MMM')}</span>
                            </p>
                        ) : (
                            <p className="text-sm text-red-700/80 italic">No Cleans Yet</p>
                        )
                    }
                </div>
            )
                    })
        
    )
}