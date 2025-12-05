// import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"
import type { AffinionCardType } from "@/types/affinion"
import { FormProvider, useForm } from "react-hook-form"
import { useParams } from "react-router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import fetchSiteBySlug from "@/form/utils/fetchSiteBySlug"
import fetchAffinions from "@/form/utils/fetchAffinions"
import fetchCalibrations from "@/form/utils/fetchControls"
import RangesComponent from "./RangesComponent"
import { useState } from "react"
import updateLastCleaned from "@/form/utils/updateLastCleaned"
import updateLastCalibration from "@/form/utils/updateLastCalibration"
import addCalibrationResults from "@/form/utils/addResults"



export default function FormSection () {

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
    const { data: affinions, isError: affinionsError, isLoading: affinionsLoading} = useQuery({
        queryKey: ['affinions', activeSite], 
        queryFn: () => fetchAffinions(activeSite.site_id),
        enabled: !!activeSite,
    })

    if ( siteError || affinionsError ) throw new Error('Could not fetch active site or Affinions')
    if ( siteLoading || affinionsLoading ) return (<p>Loading...</p>)


    return (
        <div className="flex flex-row w-full justify-around overflow-scroll gap-3">
            {
                affinions.map((affinion: AffinionCardType) => {
                    return (
                        <AffinionResultCard key={affinion.affinion_id} affinion={affinion} />
                    )
                })
            }
        </div>
    )
}

interface AffinionResultCardProps {
    affinion: AffinionCardType,
}

function AffinionResultCard ({ affinion }: AffinionResultCardProps) {

    const queryClient = useQueryClient()
    const methods = useForm();
    const { handleSubmit, setValue } = methods;
    const [isCleaned, setIsCleaned] = useState(false)

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => fetchCalibrations(activeSite.site_id),
        enabled: !!activeSite,
    })
    const updateCleaned = useMutation({
        mutationFn: ({affinionID}) => updateLastCleaned(affinionID),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['affinions']})
    })
    const updateCalibrated = useMutation({
        mutationFn: ({affinionID}) => updateLastCalibration(affinionID),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['affinions']})
    })
    const addResult = useMutation({
        mutationFn: ({ result }) => addCalibrationResults(result)
    })


    if ( siteError || controlsError) throw new Error('Could not fetch Active Site, Controls or Affinions')
    if ( siteLoading || controlsLoading ) return (<p>Loading...</p>)

    setValue("affinionID", affinion.affinion_id)
    setValue("siteID", activeSite.site_id)
    controls?.map((control) => {
        setValue(`${control.test_type}.c1.low`, control.calibration_ranges.c1.low)
        setValue(`${control.test_type}.c1.high`, control.calibration_ranges.c1.high)
        setValue(`${control.test_type}.c2.low`, control.calibration_ranges.c2.low)
        setValue(`${control.test_type}.c2.high`, control.calibration_ranges.c2.high)
    })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        if (isCleaned) updateCleaned.mutate({ affinionID: data.affinionID})
        updateCalibrated.mutate({affinionID: data.affinionID})
        addResult.mutate({ result: data })
    })

    return (
        <FormProvider {...methods}>
            <form className="bg-white p-4 rounded outline" onSubmit={onSubmit}>
                <div className="m-0.5">
                    <div className="flex flex-col gap-1">
                        <p className="text-center">{affinion.name} | {affinion.nh_number}</p>
                        <div className=" bg-blue-200 px-2 py-0.5 flex gap-2 justify-center items-center rounded">
                            <Checkbox 
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                            />
                            <label className="text-blue-500 text-sm">Not in rotation this week</label>
                        </div>
                        {
                            controls?.map((control) => {
                                return (
                                    <RangesComponent key={control.id} control={control}/>
                                )
                            })
                        }
                        <div className=" bg-green-200 px-2 py-0.5 flex gap-2 justify-center items-center rounded">
                            <Checkbox 
                                onCheckedChange={(value: boolean) => setIsCleaned(value)}
                                checked={isCleaned}
                                className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                            />
                            <label className="text-green-500 text-sm">Affinion Cleaned</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="rounded p-1 bg-green-300 w-full">Submit Results</button>
            </form>
        </FormProvider>
    )
}
