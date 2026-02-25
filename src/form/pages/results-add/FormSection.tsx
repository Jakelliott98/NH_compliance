import { Checkbox } from "@/components/ui/checkbox"
import type { AfinionDatabaseType } from "@/types/afinion"
import { FormProvider, useForm } from "react-hook-form"
import { useParams } from "react-router"
import RangesComponent from "./RangesComponent"
import { useState } from "react"
import { useUpdateLastCalibration } from "@/services/afinions"
import { useUpdateSiteCalibration } from "@/services/sites"
import { useSiteBySlug } from '@/services/sites'
import { useControls } from "@/services/controls/queries"
import { useAfinions } from "@/services/afinions"
import { useCreateResult } from "@/services/results/mutations"
import { useUpdateLastClean } from "@/services/afinions"
import type { ResultType } from "@/services/results"

export default function FormSection () {

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useSiteBySlug(siteSlug)
    const { data: afinions, isError: afinionsError, isLoading: afinionsLoading} = useAfinions(activeSite)

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

    const methods = useForm<ResultType>();
    const { handleSubmit, register } = methods;
    const [isCleaned, setIsCleaned] = useState(false)

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useSiteBySlug(siteSlug)
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useControls(activeSite)
    const { mutate: updateCleaned } = useUpdateLastClean()
    const { mutate: updateCalibrated } = useUpdateLastCalibration()
    const { mutate: createResult } = useCreateResult()
    const { mutate: updateSiteCalibration } = useUpdateSiteCalibration()


    if ( siteError || controlsError) throw new Error('Could not fetch Active Site, Controls or Afinions')
    if ( siteLoading || controlsLoading ) return (<p>Loading...</p>)
    if (!activeSite) throw new Error('This site cannot be found')

    const onSubmit = handleSubmit((data) => {
        if (isCleaned) updateCleaned({ afinionID: data.afinionID})
        updateCalibrated({afinionID: data.afinionID})
        createResult(data)
        updateSiteCalibration(activeSite.site_id)
    })

    return (
        <FormProvider {...methods}>
            <form className="bg-white p-4 rounded outline m-2" onSubmit={onSubmit}>
                <div className="m-0.5">
                    <div className="flex flex-col gap-1">
                        <p className="flex items-center justify-center">
                            <span>Afinion {afinion.afinion_number}</span> 
                            <span className="sm-hidden-block">&nbsp;| {afinion.nh_number}</span>
                        </p>
                        <div className=" bg-blue-200 px-2 py-0.5 flex gap-2 justify-center items-center rounded">
                            <Checkbox 
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                            />
                            <label className="text-blue-500 text-sm flex">Not in rotation&nbsp;<span className="sm-hidden-block">this week</span></label>
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
                                className="data-[state=checked]:border-green-600 data-[state=checked]:bg-success data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                            />
                            <label className="text-success text-sm">Afinion Cleaned</label>
                        </div>
                    </div>
                </div>
                <input type="hidden" {...register('siteID', {valueAsNumber: true})} value={activeSite.site_id}/>
                <input type="hidden" {...register('afinionID', {valueAsNumber: true})} value={afinion.afinion_id}/>
                {
                    controls?.map((control) => {
                        return (
                            <>
                                <input type="hidden" {...register(`${control.test_type}.c1.low`)} value={control.calibration_ranges.c1.low}/>
                                <input type="hidden" {...register(`${control.test_type}.c1.high`)} value={control.calibration_ranges.c1.high}/>
                                <input type="hidden" {...register(`${control.test_type}.c2.low`)} value={control.calibration_ranges.c2.low}/>
                                <input type="hidden" {...register(`${control.test_type}.c2.high`)} value={control.calibration_ranges.c2.high}/>
                            </>
                        )
                    })
                }
                <button 
                    type="submit"
                    className="w-full py-2 tracking-wide shadow-md hover:shadow-lg cursor-pointer rounded btn"
                >
                    Add Calibration
                </button>
            </form>
        </FormProvider>
    )
}
