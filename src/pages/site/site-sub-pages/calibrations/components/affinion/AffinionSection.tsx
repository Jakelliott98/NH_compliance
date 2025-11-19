import { useOutletContext } from "react-router"
import AffinionCard from "./AffinionCard"
import type { AffinionCardType } from "../../../../../../types/affinion"
import useFetchData from "../../../../../../components/custom-hooks/useFetchData"

export default function AffinionSection () {

    const { siteID } = useOutletContext()
    const affinions = useFetchData(siteID, 'affinions')

    return (
        <div className='flex-1 flex flex-col gap-3 p-3'>
            <p className='font-medium text-lg'>Affinions</p>
            <div className="flex gap-8">
                {
                    affinions.data.map((item: AffinionCardType) => {
                        return (
                            <AffinionCard key={item.affinion_id} affinion={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}