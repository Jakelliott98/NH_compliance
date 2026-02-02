import { Checkbox } from "@/components/ui/checkbox"
import type { AfinionDatabaseType } from "@/types/afinion"
import { FormProvider, useForm } from "react-hook-form"
import { useParams } from "react-router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import fetchSiteBySlug from "@/services/sites/fetchSiteBySlug"
import fetchAfinions from "@/services/afinions/fetchAfinions"
import fetchCalibrations from "@/services/controls/fetchControls"
import RangesComponent from "./RangesComponent"
import { useContext, useState } from "react"
import updateLastCleaned from "@/services/afinions/updateLastCleaned"
import updateLastCalibration from "@/services/afinions/updateLastCalibration"
import addCalibrationResults from "@/services/results/addResults"
import updateSiteCalibration from "@/services/sites/updateSiteCalibration"
import supabaseContext from "@/utils/supabaseContext"

export default function FormSection () {

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
    const { data: afinions, isError: afinionsError, isLoading: afinionsLoading} = useQuery({
        queryKey: ['afinions', activeSite], 
        queryFn: () => {
            if (!activeSite) throw new Error('Cannot find the current site')
            return fetchAfinions(activeSite.site_id)},
        enabled: !!activeSite,
    })

    if ( siteError || afinionsError ) throw new Error('Could not fetch active site or Afinions')
    if ( siteLoading || afinionsLoading ) return (<p>Loading...</p>)


    return (
        <div className="flex flex-row w-full justify-around overflow-scroll gap-3">
            {
                afinions?.map((afinion: AfinionDatabaseType) => {
                    return (
                        <AfinionResultCard key={afinion.afinion_id} afinion={afinion} />
                    )
                })
            }
        </div>
    )
}

interface AfinionResultCardProps {
    afinion: AfinionDatabaseType,
}

function AfinionResultCard ({ afinion }: AfinionResultCardProps) {

    const supabase = useContext(supabaseContext)
    const queryClient = useQueryClient()
    const methods = useForm();
    const { handleSubmit, setValue, register } = methods;
    const [isCleaned, setIsCleaned] = useState(false)

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => {
            if (!activeSite) throw new Error('This site cannot be found')
            return fetchCalibrations(activeSite.site_id)},
        enabled: !!activeSite,
    })
    const updateCleaned = useMutation({
        mutationFn: ({ afinionID }) => updateLastCleaned(afinionID, supabase),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['afinions']})
    })
    const updateCalibrated = useMutation({
        mutationFn: ({ afinionID }) => updateLastCalibration(afinionID, supabase),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['afinions']})
    })
    const addResult = useMutation({
        mutationFn: ({ result }) => addCalibrationResults(result, supabase)
    })
    const updateSite = useMutation({
        mutationFn: () => updateSiteCalibration(activeSite?.site_id, supabase)
    })


    if ( siteError || controlsError) throw new Error('Could not fetch Active Site, Controls or Afinions')
    if ( siteLoading || controlsLoading ) return (<p>Loading...</p>)
    if (!activeSite) throw new Error('This site cannot be found')

    setValue("afinionID", afinion.afinion_id)
    setValue("siteID", activeSite.site_id)
    controls?.map((control) => {
        setValue(`${control.test_type}.c1.low`, control.calibration_ranges.c1.low)
        setValue(`${control.test_type}.c1.high`, control.calibration_ranges.c1.high)
        setValue(`${control.test_type}.c2.low`, control.calibration_ranges.c2.low)
        setValue(`${control.test_type}.c2.high`, control.calibration_ranges.c2.high)
    })

    const onSubmit = handleSubmit((data) => {
        if (isCleaned) updateCleaned.mutate({ afinionID: data.afinionID})
        updateCalibrated.mutate({afinionID: data.afinionID})
        addResult.mutate({ result: data })
        updateSite.mutate()
    })

    return (
        <FormProvider {...methods}>
            <form className="bg-white p-4 rounded outline m-2" onSubmit={onSubmit}>
                <div className="m-0.5">
                    <div className="flex flex-col gap-1">
                        <p className="flex items-center justify-center"><span>Afinion {afinion.afinion_number}</span> <span className="hidden md:block">&nbsp;| {afinion.nh_number}</span></p>
                        <div className=" bg-blue-200 px-2 py-0.5 flex gap-2 justify-center items-center rounded">
                            <Checkbox 
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                            />
                            <label className="text-blue-500 text-sm flex">Not in rotation&nbsp;<span className="hidden md:block">this week</span></label>
                        </div>
                        {
                            controls?.map((control) => {
                                return (
                                    <RangesComponent key={control.id} control={control}/>
                                )
                            })
                        }
                        <div className="flex flex-col lg:flex-row">
                            <label className="text-sm">Clinician Name:</label>
                            <input className="flex-1 px-2 outline-none focus:outline-none" {...register('clinician', {required: 'Provide your initials'})}/>
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            <label className="text-sm">Number of attempts: </label>
                            <input className="px-2 outline-none focus:outline-none" type="number" {...register('attempts', {required: 'Complete number of attempts.'})}/>
                        </div>
                        <div className="bg-green-100 px-2 py-0.5 flex gap-2 justify-center items-center rounded">
                            <Checkbox 
                                onCheckedChange={(value: boolean) => setIsCleaned(value)}
                                checked={isCleaned}
                                className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                            />
                            <label className="text-green-500 text-sm">Afinion Cleaned</label>
                        </div>
                    </div>
                </div>
                <button 
                    type="submit"
                    className="w-full py-2 tracking-wide shadow-md hover:shadow-lg cursor-pointer rounded bg-gray-100 text-gray-900"
                >
                    Add Calibration
                </button>
            </form>
        </FormProvider>
    )
}
