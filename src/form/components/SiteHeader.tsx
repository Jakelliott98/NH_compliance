import { useContext } from "react"
import FormContext from "../context/FormContext"
import SiteFormContext from "../context/SiteFormContext"
import { ReturnControlSection } from "../pages/calibration-add/CalibrationFluidForm"
import type { AffinionCardType } from "@/types/affinion"
import type { FetchState } from "@/hooks/useFetchData"
import moment from "moment"
import type { CalibrationType } from "@/types/calibration"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

export function SiteHeader () {

    const formContext = useContext(FormContext)
    const siteFormContext = useContext(SiteFormContext)

    if (formContext === null) throw new Error('FormContext has to be used within <FormContext.Provider>')

    if (siteFormContext === null) throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')
    const { site } = formContext
    if (site === null) throw new Error('Component has been rendered without site being selected')

    const { affinions, controls } = siteFormContext

    return (
        <div className="flex flex-col gap-5">
            <p className="text-center font-bold text-3xl">{site.site_name}</p>
            <div className="flex flex-row justify-between">
                <div className="flex-2">
                    <AffinionHeader affinions={affinions} />
                </div>
                <div className="flex-1">
                    <ControlHeader controls={controls}/>
                </div>
            </div>
        </div>
    )

}

interface AffinionHeaderProps {
    affinions: FetchState<AffinionCardType>,
}

function AffinionHeader ({ affinions }: AffinionHeaderProps) {
    
    return (
        <div className="flex flex-row gap-3 h-full mx-2">
            {
                affinions.data.map((affinion) => {
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
    )

}

interface ControlHeaderProps {
    controls: FetchState<CalibrationType>
}

function ControlHeader ({ controls }: ControlHeaderProps) {

    return (
        <div className="flex flex-col gap-2">
            <ReturnControlSection title="Lipids" controlsData={controls} controlType="lipids"/>
            <ReturnControlSection title="HBA1c" controlsData={controls} controlType="hba1c"/>
        </div>
    )

}