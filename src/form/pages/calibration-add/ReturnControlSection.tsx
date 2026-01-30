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
            <FontAwesomeIcon icon={faHandshakeSlash} className="p-2 md:pb-5 text-gray-300" />
            <p className="text-xs md:text-sm text-gray-500">No {title} added</p>
            <p className="hidden md:block text-xs text-gray-500">Add a {title} control to start submitting results.</p>
        </div>
    )
    const isExpired = moment(control.expiry_date).isBefore(moment())

    return (
        <div className="rounded p-2 flex flex-col justify-center items-center shadow-sm bg-gray-50 border border-gray-200">
            <FontAwesomeIcon className="sm:text-lg md:text-xl lg:text-3xl pb-2 text-red-800/80" icon={faFlaskVial} />
            <p className="text-sm font-light lg:font-semibold text-center pb-1 text-slate-900">{title}</p>
            <p className="hidden md:block text-center text-sm font-light pb-1 text-slate-700">LOT{control.lot_number}</p>
            <p className={isExpired ? 'hidden md:block text-center text-red-700 text-sm font-light' : 'font-light hidden md:block text-center text-sm text-slate-700'}>{isExpired ? 'Expired:' : 'Expires:'} {moment(control.expiry_date).format('Do MMMM')} </p>
        </div>
    )

}