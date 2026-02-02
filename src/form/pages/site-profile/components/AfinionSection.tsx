import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck, faHandshakeSlash } from "@fortawesome/free-solid-svg-icons";
import { FormButtons } from "../SiteProfile";
import { useState } from "react";
import AfinionFormSection from "../../afinion-add/AfinionsForm";
import type { AfinionDatabaseType } from "@/types/afinion";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

const afinionButton = {
    title: 'New Afinion',
    text: 'Add a new afinion to your site.',
    value: 'Afinion-Form',
}

interface AfinionSectionProps {
    afinions: AfinionDatabaseType[]
}

export default function AfinionSection ({ afinions }: AfinionSectionProps) {

    const [open, setOpen] = useState(false)
    const sortedAfinions = afinions.sort((a, b) => a.afinion_number - b.afinion_number)

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-2">
            <div className="grow flex gap-1 lg:gap-3 col-start-1 col-end-4 lg:h-full max-w-full overflow-x-scroll">
                <AfinionsDisplay afinions={sortedAfinions} />
            </div>
            <div className="grow lg:col-start-4">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <div className="h-full">
                            <FormButtons option={afinionButton} />
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Add an Afinion</DialogTitle>
                        <div>
                            <AfinionFormSection closeDialog={() => {setOpen(false)}}/>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

interface AfinionsDisplayProps {
    afinions: AfinionDatabaseType[],
}

function AfinionsDisplay ({ afinions }: AfinionsDisplayProps) {

    if (afinions.length === 0) {
        return (
            <div className="py-2 px-1 bg-white flex flex-col justify-center items-center w-full">
                        <FontAwesomeIcon icon={faHandshakeSlash} className="pb-1 md:pb-5 text-gray-300" />
                        <p className="text-xs md:text-sm text-gray-500">No Afinions added yet</p>
                        <p className="hidden md:block text-xs text-gray-500">Add Afinions to start submitting results.</p>
            </div>
        )
    }

    return (
        afinions.map((afinion) => {
            return (
                <div className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded flex-grow flex flex-col justify-around items-center shadow-sm" key={afinion.afinion_id}>
                    <FontAwesomeIcon className="text-green-700/90 text-lg md:text-xl lg:text-3xl" icon={faCalendarCheck} />
                    <p className="font-light lg:font-semibold text-center text-sm lg:text-lg text-slate-900">Afinion {afinion.afinion_number}</p>
                    <div className="hidden lg:block">
                    {
                        afinion.last_clean ? (
                            <p className="text-xs text-center">
                                Calibrated <br/>
                                <span className="italics text-slate-700"> {afinion.last_calibrated === null ? '' : moment(afinion.last_calibrated).format('Do MMM')}</span>
                            </p>
                        ) : (
                            <p className="text-center text-xs text-red-700/80 italic">No Calibrations Yet</p>
                        )
                    }
                    {
                        afinion.last_clean ? (
                            <p className="text-center text-xs">
                                Cleaned<br/>
                                <span className="italics text-slate-700"> {afinion.last_clean === null ? '' : moment(afinion.last_clean).format('Do MMM')}</span>
                            </p>
                        ) : (
                            <p className="text-center text-xs text-red-700/80 italic">No Cleans Yet</p>
                        )
                    }
                    </div>
                </div>
            )
                    })
        
    )
}