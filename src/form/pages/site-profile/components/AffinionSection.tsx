import type { FetchState } from "@/hooks/useFetchData"
import type { AffinionCardType } from "@/types/affinion"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FormButtons } from "../SiteProfile";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import AffinionsForm from "../../affinion-add/AffinionsForm";


interface AffinionSectionProps {
    affinions: FetchState<AffinionCardType>,
    onSubmit: (value: string) => void,
}

const affinionButton = {
    title: 'New Affinion',
    text: 'Add a new affinion to your site.',
    value: 'Affinion-Form',
}

export default function AffinionSection ({ affinions, onSubmit }: AffinionSectionProps) {

    const [open, setOpen] = useState(false)

    return (
        <div className="h-full grid grid-cols-4 gap-2">
            <div className="flex gap-3 col-start-1 col-end-4 h-full">
                {
                    affinions.map((affinion) => {
                        const lastClean = moment(affinion.last_clean).format('Do MMM')
                        const lastCalibrated = moment(affinion.last_calibrated).format('Do MMM')
                        return (
                            <div className="bg-white p-2 rounded flex-grow flex flex-col justify-around items-center" key={affinion.affinion_id}>
                                <FontAwesomeIcon className="text-green-700 text-3xl" icon={faCalendarCheck} />
                                <p className="font-semibold text-center text-lg">{affinion.name}</p>
                                <p className="text-sm">
                                    Last Calibrated:
                                    <span className="italics"> {lastCalibrated}</span>
                                </p>
                                <p className="text-sm">
                                    Last Cleaned:
                                    <span className="italics"> {lastClean}</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="col-start-4 h-full w-full">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <div className="h-full">
                            <FormButtons option={affinionButton} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div>
                            <AffinionsForm />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}