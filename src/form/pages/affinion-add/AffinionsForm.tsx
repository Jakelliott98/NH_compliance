import { useForm } from 'react-hook-form'
import addAffinion from '@/form/utils/addAffinion'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router'
import fetchSiteBySlug from '@/utils/fetchSiteBySlug'
import type { AffinionData } from '@/form/utils/addAffinion'

interface AffinionFormSectionProps {
    closePopover: () => void,
}

export default function AffinionFormSection ({ closePopover }: AffinionFormSectionProps) {

    const queryClient = useQueryClient()

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: isSiteError, isLoading: isSiteLoading, error: siteError } = useQuery({
        queryKey: ['activeSite', siteSlug],
        queryFn: () => {
            if (!siteSlug) throw new Error('Cannot find this site as siteSlug is not available')    
            return fetchSiteBySlug(siteSlug)
        },
    })

    const addNewAffinion = useMutation({
        mutationFn: (affinionData: AffinionData) => addAffinion(affinionData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['affinions']})
        }
    }) 

    const { register, handleSubmit } = useForm()
    
    if ( isSiteError ) throw siteError
    if ( isSiteLoading ) return (<p>Loading...</p>)
    if (activeSite === null || activeSite === undefined) (<p>Cannot find the current site</p>)


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
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center">
            <form className="p-4 bg-white flex flex-col gap-2 rounded" onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <label>Affinion Number</label>
                    <div className='outline rounded flex p-0.5 gap-2'>
                        <p>Affinion</p>
                        <input className="" type="number" {...register("number", {required: "Each affinion requires a name", valueAsNumber: true})}/>
                    </div>
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
                </div>
                <button className="p-2 w-full bg-green-300 font-bold rounded cursor-pointer" type="submit">Add Affinion</button>
            </form>
        </div>
    )
}