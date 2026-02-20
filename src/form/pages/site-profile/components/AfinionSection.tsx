import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck, faHandshakeSlash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AfinionFormSection from "../../afinion-add/AfinionsForm";
import type { AfinionDatabaseType } from "@/types/afinion";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface AfinionSectionProps {
    afinions: AfinionDatabaseType[]
}

export default function AfinionSection ({ afinions }: AfinionSectionProps) {

    const [open, setOpen] = useState(false)
    const sortedAfinions = afinions.sort((a, b) => a.afinion_number - b.afinion_number)

    return (
        <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex gap-2 lg:w-10/12">
                <AfinionsDisplay afinions={sortedAfinions} />
            </div>
            <div className="w-2/12">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <button 
                            className="
                                w-full h-full p-6
                                flexCenter flex-col gap-2
                                rounded bg-surface/40 text-neutral-light
                                text-lg font-medium tracking-wide
                                border border-neutral-light shadow-sm
                                transition-all cursor-pointer 
                                hover:bg-surface/80 hover:border-primary hover:text-primary hover:shadow-lg
                                active:translate-y-0
                            "
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Add Afinion</p>
                        </button>
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
            <div className="py-2 px-1 bg-surface/80 backdrop-blur flexCenter flex-col w-full border border-neutral-light/25 rounded shadow-sm">
                        <FontAwesomeIcon icon={faHandshakeSlash} className="pb-1 md:pb-5 text-neutral-light" />
                        <p className="text-xs md:text-sm text-neutral-light">No Afinions added yet</p>
                        <p className="sm-hidden-block text-xs text-neutral-light">Add Afinions to start submitting results.</p>
            </div>
        )
    }

    return (
        afinions.map((afinion) => {
            console.log(afinion)
            return (
                <div 
                    className="
                        flex-1 
                        p-3 flex-grow
                        flexCenter flex-col gap-1
                        border border-neutral-light/25 rounded shadow-sm
                        bg-surface/80 backdrop-blur
                        " 
                    key={afinion.afinion_id}
                >
                    <FontAwesomeIcon className="text-success text-lg md:text-xl lg:text-3xl pb-1" icon={faCalendarCheck} />
                    <p className="font-light lg:font-semibold text-center text-sm lg:text-lg text-neutral">Afinion {afinion.afinion_number}</p>
                    <div className="hidden lg:block">
                        {
                            afinion.last_calibrated ? (
                                <p className="text-xs text-center">
                                    Calibrated <br/>
                                    <span className="italics text-neutral-light"> {afinion.last_calibrated === null ? '' : moment(afinion.last_calibrated).format('Do MMM')}</span>
                                </p>
                            ) : (
                                <p className="text-center text-xs text-warning italic">No Calibrations Yet</p>
                            )
                        }
                        {
                            afinion.last_clean ? (
                                <p className="text-center text-xs">
                                    Cleaned<br/>
                                    <span className="italics text-neutral-light"> {afinion.last_clean === null ? '' : moment(afinion.last_clean).format('Do MMM')}</span>
                                </p>
                            ) : (
                                <p className="text-center text-xs text-warning italic">No Cleans Yet</p>
                            )
                        }
                    </div>
                </div>
            )
        })
        
    )
}