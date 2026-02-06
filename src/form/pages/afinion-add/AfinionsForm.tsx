import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import type { AfinionData } from '@/services/afinions'
import { useCreateAfinion } from '@/services/afinions'
import { useSiteBySlug } from '@/services/sites'

interface AfinionFormSectionProps {
    closeDialog: () => void,
}

export default function AfinionFormSection ({ closeDialog }: AfinionFormSectionProps) {

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: isSiteError, isLoading: isSiteLoading, error: siteError } = useSiteBySlug(siteSlug)

    const { mutate: createAfinion } = useCreateAfinion();

    const { register, handleSubmit } = useForm()
    
    if ( isSiteError ) throw siteError
    if ( isSiteLoading ) return (<p>Loading...</p>)
    if (activeSite === null || activeSite === undefined) (<p>Cannot find the current site</p>)


    const onSubmit = handleSubmit((data) => {
        const afinionData: AfinionData = {
            number: data.number,
            nhNumber: data.nh_number,
            siteID: activeSite.site_id,
        }
        createAfinion(afinionData)
        closeDialog()
    })

    return (
        <div className="bg-gray-100 w-full p-2 lg:p-5 rounded flex flex-col items-center text-slate-600">
            <form className="p-4 bg-white flex flex-col gap-2 rounded" onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <label>Afinion Number</label>
                    <div className='outline rounded flex py-1 px-2 gap-2'>
                        <p className='text-slate-400'>Afinion</p>
                        <input 
                            className="outline-none focuse:outline-none focus:ring-0" 
                            type="number" 
                            {...register("number", {required: "Each afinion requires a name", valueAsNumber: true})}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label>NH Number</label>
                    <div className='outline rounded flex py-1 px-2 gap-2'>
                        <p className='text-slate-400'>NH</p>
                        <input 
                            className="outline-none focuse:outline-none focus:ring-0" 
                            type="number" 
                            {...register("nh_number", {
                                required: "A NH number is required",
                                valueAsNumber: true,
                            }
                        )}/>
                    </div>
                </div>
                <button 
                    type="submit"
                    className="w-full py-2 tracking-wide shadow-md hover:shadow-lg cursor-pointer rounded bg-gray-100 text-gray-900"
                >
                    Add Afinion
                </button>
            </form>
        </div>
    )
}