import CalibrationCard from './CalibrationCard'
import AffinionCard from './AffinionCard'
import { useOutletContext } from 'react-router'
import { useEffect, useState } from 'react'
import supabase from '../../../../utility/supabase'

export default function SiteCalibration () {

    return (
        <div className='flex gap-20 p-2'>
            <AffinionSection />
            <div className='flex-1 flex flex-col gap-3 p-3'>
                <p className='font-medium text-lg'>Calibration Fluids</p>
                <div className='flex gap-8'>
                    <CalibrationCard lipid={true} title={'Lipids'}/>
                    <CalibrationCard lipid={false} title={'HBA1c'}/>
                </div>
            </div>
        </div>
    )
}


function AffinionSection () {

    const siteID = useOutletContext()
    const [affinions, setAffinions] = useState({
        data: [],
        loading: true,
        error: false,
    })

    useEffect(() => {

        const getAffinions = async () => {
            const { data } = await supabase
            .from('affinions')
            .select('*')
            .eq('site_id', siteID)
            setAffinions({
                data: data, 
                loading: false,
                error: false,
                })
        }
        getAffinions()
    }, [siteID])

    return (
        <div className='flex-1 flex flex-col gap-3 p-3'>
            <p className='font-medium text-lg'>Affinions</p>
            <div className="flex gap-8">
                {
                    affinions.data.map((item) => {
                        return (
                            <AffinionCard key={item.id} affinion={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}