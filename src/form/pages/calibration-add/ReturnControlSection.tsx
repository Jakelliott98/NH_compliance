import type { CalibrationDatabaseType } from "@/types/calibration";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlaskVial, faHandshakeSlash } from "@fortawesome/free-solid-svg-icons";

interface ReturnControlSectionProps {
    controlType: string,
    controlsData: Array<CalibrationDatabaseType>,
    title: string,
}

export function ReturnControlSection ({controlType, controlsData, title}: ReturnControlSectionProps) {

    const control = controlsData.find((item: CalibrationDatabaseType) => { return item.control_type === controlType})
    if (!control) return (
        <div className="py-2 px-1 bg-surface/80 backdrop-blur flexCenter flex-col w-full border border-neutral-light/25 rounded shadow-sm">
            <FontAwesomeIcon icon={faHandshakeSlash} className="p-2 md:pb-5 text-neutral-light" />
            <p className="text-xs md:text-sm text-neutral-light">No {title} added</p>
            <p className="sm-hidden-block text-xs text-neutral-light">Add a {title} control to start submitting results.</p>
        </div>
    )

    const isExpired = moment(control.expiry_date).isBefore(moment())

    return (
        <div 
            className="
                flex-1 
                p-3 flex-grow
                flex flex-col justify-center items-center gap-1
                border border-neutral-light/25 rounded shadow-sm
                bg-surface/80 backdrop-blur
            "
        >
            <FontAwesomeIcon className="sm:text-lg md:text-xl lg:text-3xl pb-1 text-warning" icon={faFlaskVial} />
            <p className="text-sm font-light lg:font-semibold text-center text-neutral">{title}</p>
            <p className="sm-hidden-block text-center text-sm font-light text-neutral-light">LOT{control.lot_number}</p>
            <p className={isExpired ? 'sm-hidden-block text-center text-warning text-sm font-light' : 'font-light sm-hidden-block text-center text-sm text-neutral-light'}>{isExpired ? 'Expired:' : 'Expires:'} {moment(control.expiry_date).format('Do MMMM')} </p>
        </div>
    )

}