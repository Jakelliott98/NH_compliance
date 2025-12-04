import type { CalibrationType } from "@/types/calibration";
import type { FetchState } from "@/hooks/useFetchData";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlaskVial } from "@fortawesome/free-solid-svg-icons";

interface ReturnControlSectionProps {
    controlType: string,
    controlsData: FetchState<CalibrationType>,
    title: string,
}

function Loading () {
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

export function ReturnControlSection ({controlType, controlsData, title}: ReturnControlSectionProps) {

    const control = controlsData.find((item: CalibrationType) => { return item.control_type === controlType})

    if (controlsData.loading) {
        return (
            <Loading />
        )
    } else if (control === undefined) {
        return (
            <div className="bg-white rounded p-2 flex flex-col justify-center items-center">
                <p className="text-red-700 text-sm">No {title} control</p>
            </div>
        )
    } else {
        const isExpired = moment(control.expiry_date).isBefore(moment())
        return (
            <div className="bg-white rounded p-2 flex flex-col justify-center items-center">
                <FontAwesomeIcon className="text-3xl pb-2 text-red-900" icon={faFlaskVial} />
                <p className="font-semibold text-center">{title}</p>
                <p className="text-center">LOT{control.lot_number}</p>
                <p className={isExpired ? 'text-center text-red-500' : 'text-center'}>{isExpired ? 'Expired:' : 'Expires:'} {moment(control.expiry_date).format('Do MMMM')} </p>
            </div>
        )
    }

} 