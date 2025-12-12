import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import fetchSiteBySlug from "@/utils/fetchSiteBySlug"
import fetchCalibrations from "@/utils/fetchControls"
import moment from "moment"

export default function CalibrationSection () {

    const siteSlug = useParams().Site
    const { data: activeSite, isError:siteError, isLoading: siteLoading} = useQuery({
        queryKey: ['portalActiveSite', siteSlug],
        queryFn: () => fetchSiteBySlug(siteSlug),
            enabled: !!siteSlug,
    })
    const { data: controls, isError: controlError, isLoading: controlLoading} = useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => fetchCalibrations(activeSite.site_id),
        enabled: !!activeSite,
    })
    if (siteError) return <p>Error loading site</p>;
    if (!activeSite) return <p>No site found</p>;
    if (siteLoading || controlLoading) return <p>Loading...</p>;
    if (!controls) return (<p>No affinions found</p>)
    if (controlError) return (<p>Something went wrong...</p>)

    return (
        <div className='flex-1 flex flex-col gap-3 p-3'>
            <p className='font-medium text-lg'>Calibration Fluids</p>
            <div className='flex gap-8'>
                {
                    <CalibrationHolder controls={controls}/>
                }
             </div>
        </div>
    )

}

function CalibrationHolder ({ controls }) {

    const hba1c = controls.find(control => control.test_type === 'hba1c')
    const lipids = controls.filter(control => control.control_type === 'lipids')

    return (
        <div className="flex">
            <Hba1cDisplay hba1c={hba1c} />
            <LipidsDisplay lipids={lipids} />
        </div>
    )


}

function LipidsDisplay ({ lipids }) {

    const total = lipids.find(control => control.test_type === 'total')

    return (
        <div className='p-1 bg-red-100 w-fit rounded-xl flex flex-col h-fit grow-1'>
            <div className='bg-white rounded-xl p-3'>
                <div className='border-b-2 border-solid border-gray-300 py-2'>
                    <p className='font-medium'>Lipids</p>
                    <p className='text-gray-400 text-sm'>Lot Number: {total.lot_number}</p>
                </div>
                <div className='py-2'>
                    {
                        lipids.map((control) => {
                            return (
                                <div key={control.id}>
                                    <p>{control.display_name}</p>
                                    <CalibrationRangesLayout control={control} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <p className='text-red-900 self-center text-sm p-1'>Expires {moment(total.expiry_date).format('dddd Do MMMM')}</p>
        </div>
    )
}

function CalibrationRangesLayout ({ control }) {
    return (
        <div className='py-2'>
            <div className='flex justify-between'>
                <p className="font-medium">C1</p>
                <p>{control.calibration_ranges.c1.low} - {control.calibration_ranges.c1.high}</p>
            </div>
            <div className='flex justify-between'>
                <p className="font-medium">C2</p>
                <p>{control.calibration_ranges.c2.low} - {control.calibration_ranges.c2.high}</p>
            </div>
        </div>
    )
}

function Hba1cDisplay ({ hba1c }) {

    return (
    <div className='p-1 bg-red-100 w-fit rounded-xl flex flex-col h-fit grow-1'>
            <div className='bg-white rounded-xl p-3'>
                <div className='border-b-2 border-solid border-gray-300 py-2'>
                    <p className='font-medium'>{hba1c.display_name}</p>
                    <p className='text-gray-400 text-sm'>Lot Number: {hba1c.lot_number}</p>
                </div>
                <CalibrationRangesLayout control={hba1c}/>
            </div>
            <p className='text-red-900 self-center text-sm p-1'>Expires {moment(hba1c.expiry_date).format('dddd Do MMMM')}</p>
        </div>
    )

}