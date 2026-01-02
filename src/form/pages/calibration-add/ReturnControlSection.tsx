import type { CalibrationDatabaseType } from "@/types/calibration";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlaskVial } from "@fortawesome/free-solid-svg-icons";

interface ReturnControlSectionProps {
    controlType: string,
    controlsData: Array<CalibrationDatabaseType>,
    title: string,
}

export function ReturnControlSection ({controlType, controlsData, title}: ReturnControlSectionProps) {

    const control = controlsData.find((item: CalibrationDatabaseType) => { return item.control_type === controlType})
    if (!control) return (<p>No Control Fluid Found</p>)
    const isExpired = moment(control.expiry_date).isBefore(moment())

    return (
        <div className="rounded p-2 flex flex-col justify-center items-center shadow-sm bg-gray-50 border border-gray-200">
            <FontAwesomeIcon className="text-3xl pb-2 text-red-900" icon={faFlaskVial} />
            <p className="font-semibold text-center">{title}</p>
            <p className="text-center">LOT{control.lot_number}</p>
            <p className={isExpired ? 'text-center text-red-500' : 'text-center'}>{isExpired ? 'Expired:' : 'Expires:'} {moment(control.expiry_date).format('Do MMMM')} </p>
        </div>
    )

}