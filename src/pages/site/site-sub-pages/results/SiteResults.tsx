import CalibrationCard from "../../../../components/calibration-card/CalibrationCard"
import { useOutletContext } from "react-router"
import useFetchData from "../../../../components/custom-hooks/useFetchData"
import type { AffinionCardType } from "../../../../types/affinion"
import type { ResultsType } from "@/types/result"

export default function SiteResults () {

    const {siteID, affinions}: {siteID: number, affinions: Array<AffinionCardType>} = useOutletContext()
    const results = useFetchData<ResultsType>(siteID, 'results')

    return (
            <div className="flex flex-col w-full gap-2 my-2">
                {
                    !results.loading && results.data.map(((result) => {
                        const affinion: AffinionCardType | undefined = affinions.find((item: AffinionCardType) => item.affinion_id === result.affinion_id)
                        if (affinion === undefined) {
                            return (
                                <p>Currently no affinions registered to this site</p>
                            )
                        }
                        return (
                            <CalibrationCard key={result.id} result={result} affinion={affinion}/>
                        )
                    }))
                }

            </div>
    )
}