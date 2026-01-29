import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router'
import fetchSiteBySlug from '@/utils/fetchSiteBySlug'
import type { AffinionData } from '@/form/utils/addAfinion'
import addAfinion from '@/form/utils/addAfinion'
import { useContext } from 'react'
import supabaseContext from '@/utils/supabaseContext'

interface AffinionFormSectionProps {
    closeDialog: () => void,
}

export default function AffinionFormSection ({ closeDialog }: AffinionFormSectionProps) {

    const supabase = useContext(supabaseContext)

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
        mutationFn: (affinionData: AffinionData) => addAfinion(affinionData, supabase),
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
        closeDialog()
    })

    return (
        <div className="bg-gray-100 w-full p-5 rounded flex flex-col items-center text-slate-600">
            <form className="p-4 bg-white flex flex-col gap-2 rounded" onSubmit={onSubmit}>
                <div className="flex flex-col">
                    <label>Affinion Number</label>
                    <div className='outline rounded flex py-1 px-2 gap-2'>
                        <p className='text-slate-400'>Affinion</p>
                        <input 
                            className="outline-none focuse:outline-none focus:ring-0" 
                            type="number" 
                            {...register("number", {required: "Each affinion requires a name", valueAsNumber: true})}
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
                    Add Affinion
                </button>
            </form>
        </div>
    )
}