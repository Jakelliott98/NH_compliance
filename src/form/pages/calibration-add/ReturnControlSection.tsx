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
        <div className="p-1 bg-white flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={faHandshakeSlash} className="p-2 md:pb-5 text-neutral-light" />
            <p className="text-xs md:text-sm text-neutral-light">No {title} added</p>
            <p className="sm-hidden-block text-xs text-neutral-light">Add a {title} control to start submitting results.</p>
        </div>
    )
    const isExpired = moment(control.expiry_date).isBefore(moment())

    return (
        <div className="rounded p-2 flex flex-col justify-center items-center shadow-sm bg-gray-50 border border-gray-200">
            <FontAwesomeIcon className="sm:text-lg md:text-xl lg:text-3xl pb-2 text-warning" icon={faFlaskVial} />
            <p className="text-sm font-light lg:font-semibold text-center pb-1 text-neutral">{title}</p>
            <p className="sm-hidden-block text-center text-sm font-light pb-1 text-neutral-light">LOT{control.lot_number}</p>
            <p className={isExpired ? 'sm-hidden-block text-center text-warning text-sm font-light' : 'font-light sm-hidden-block text-center text-sm text-neutral-light'}>{isExpired ? 'Expired:' : 'Expires:'} {moment(control.expiry_date).format('Do MMMM')} </p>
        </div>
    )

}