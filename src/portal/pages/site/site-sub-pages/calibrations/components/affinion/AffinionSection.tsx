import { useOutletContext } from "react-router"
import AffinionCard from "./AffinionCard"
import useFetchData from "@/hooks/useFetchData"
import type { AffinionCardType } from "@/types/affinion"

export default function AffinionSection () {

    const { siteID }: { siteID: number} = useOutletContext();

    const affinions = useFetchData<AffinionCardType>(siteID, 'affinions')

    return (
        <div className='flex-1 flex flex-col gap-3 p-3'>
            <p className='font-medium text-lg'>Affinions</p>
            <div className="flex gap-8">
                {
                    affinions.data.map((item) => {
                        return (
                            <AffinionCard key={item.affinion_id} affinion={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}