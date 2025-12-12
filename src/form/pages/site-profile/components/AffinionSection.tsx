import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FormButtons } from "../SiteProfile";
import { useState } from "react";
import AffinionsForm from "../../affinion-add/AffinionsForm";
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
                {
                    sortedAffinions.map((affinion) => {
                        const lastClean = moment(affinion.last_clean).format('Do MMM')
                        const lastCalibrated = moment(affinion.last_calibrated).format('Do MMM')
                        return (
                            <div className="bg-white p-2 rounded flex-grow flex flex-col justify-around items-center" key={affinion.affinion_id}>
                                <FontAwesomeIcon className="text-green-700 text-3xl" icon={faCalendarCheck} />
                                <p className="font-semibold text-center text-lg">Affinion {affinion.affinion_number}</p>
                                <p className="text-sm">
                                    Last Calibrated:
                                    <span className="italics"> {lastCalibrated === null ? lastCalibrated : ''}</span>
                                </p>
                                <p className="text-sm">
                                    Last Cleaned:
                                    <span className="italics">{lastClean === null ? lastCalibrated : ''}</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="col-start-4 h-full w-full">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="h-full">
                            <FormButtons option={affinionButton} />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Add an Affinion</DialogTitle>
                        <div>
                            <AffinionsForm closePopover={() => {setOpen(false)}}/>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}