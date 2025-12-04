// import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"
import type { AffinionCardType } from "@/types/affinion"
import { FormProvider, useForm } from "react-hook-form"
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import fetchSiteBySlug from "@/form/utils/fetchSiteBySlug"
import fetchAffinions from "@/form/utils/fetchAffinions"
import fetchCalibrations from "@/form/utils/fetchControls"
import RangesComponent from "./RangesComponent"


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
        <div className="flex flex-row w-full justify-around">
            {
                affinions.map((affinion: AffinionCardType) => {
                    return (
                        <AffinionResultCard affinion={affinion} key={affinion.affinion_id}/>
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

    const methods = useForm();
    const { handleSubmit, setValue } = methods;

    const siteSlug = useParams().Site;
    const { data: activeSite, isError: siteError, isLoading: siteLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
    const { data: controls, isError: controlsError, isLoading: controlsLoading } = useQuery({
        queryKey: ['controls', activeSite],
        queryFn: () => fetchCalibrations(activeSite.site_id),
        enabled: !!activeSite,
    }) 

    if ( siteError || controlsError) throw new Error('Could not fetch Active Site, Controls or Affinions')
    if ( siteLoading || controlsLoading ) return (<p>Loading...</p>)

    setValue("affinion_id", affinion.affinion_id)
    setValue("site_id", activeSite.site_id)

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

    return (
        <FormProvider {...methods}>
            <form className="bg-white p-4 rounded outline" onSubmit={onSubmit}>
                <div>
                    <div>
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
                                    <RangesComponent control={control}/>
                                )
                            })
                        }
                        <div className=" bg-green-200 px-2 py-0.5 flex gap-2 justify-center items-center rounded">
                            <Checkbox 
                                className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                            />
                            <label className="text-green-500 text-sm">Affinion Cleaned</label>
                        </div>
                    </div>
                </div>
                <button type="submit" >Submit Results</button>
            </form>
        </FormProvider>
    )
}
