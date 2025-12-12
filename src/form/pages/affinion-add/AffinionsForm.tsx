import { useForm } from 'react-hook-form'
import addAffinion from '@/form/utils/addAffinion'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router'
import fetchSiteBySlug from '@/hooks/fetchSiteBySlug'
import type { AffinionData } from '@/form/utils/addAffinion'

interface AffinionsFormProps {
    closePopover: () => void,
}

export default function AffinionsForm ({ closePopover }: AffinionsFormProps) {

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            <AffinionFormSection closePopover={closePopover}/>
        </div>        
    )
}

interface AffinionFormSectionProps {
    closePopover: () => void,
}

function AffinionFormSection ({ closePopover }: AffinionFormSectionProps) {

    const queryClient = useQueryClient()

    const addNewAffinion = useMutation({
        mutationFn: (affinionData: AffinionData) => addAffinion(affinionData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['affinions']})
        }
    }) 

    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({
        queryKey: ['site', siteSlug],
        queryFn: () => fetchSiteBySlug(siteSlug),
    })
    if (siteError) throw new Error ('Cannot find the site')
    if ( siteLoading ) return (<p>Loading...</p>)


    const onSubmit = handleSubmit((data) => {
        const affinionData: AffinionData = {
            number: data.number,
            nhNumber: data.nh_number,
            siteID: activeSite.site_id,
        }
        addNewAffinion.mutate(affinionData)
        closePopover()
    })

    return (
        <form className="p-4 bg-white flex flex-col gap-2 rounded" onSubmit={onSubmit}>
            <div className="flex flex-col">
                <label>Affinion Number</label>
                <div className='outline rounded flex p-0.5 gap-2'>
                    <p>Affinion</p>
                    <input className="" type="number" {...register("number", {required: "Each affinion requires a name", valueAsNumber: true})}/>
                </div>
                <p className='text-xs text-red-700'>{errors.number?.message}</p>
            </div>
            <div className="flex flex-col">
                <label>NH Number</label>
                <div className='outline rounded flex p-0.5 gap-2'>
                    <p>NH</p>
                    <input 
                        className="" 
                        type="number" 
                        {...register("nh_number", {
                            required: "A NH number is required",
                            valueAsNumber: true,
                        }
                    )}/>
                </div>
                <p className='text-xs text-red-700'>{errors.nh_number?.message}</p>
            </div>
            <button className="p-2 w-full bg-green-300 font-bold rounded cursor-pointer" type="submit">Add Affinion</button>
        </form>
    )
}