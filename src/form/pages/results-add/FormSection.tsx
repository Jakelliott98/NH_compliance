// import { useForm } from "react-hook-form";
import SiteFormContext from "@/form/context/SiteFormContext"
import { Checkbox } from "@/components/ui/checkbox"
import { useContext } from "react"
import type { AffinionCardType } from "@/types/affinion"
import { FormProvider, useForm } from "react-hook-form"
import Hba1cSection from "./Hba1cSection"
import LipidSection from "./LipidSection"
import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import fetchSiteBySlug from "@/form/utils/fetchSiteBySlug"


export default function FormSection () {

    const siteFormContext = useContext(SiteFormContext)

    if (siteFormContext === null) {
        throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')
    }

    const { affinions } = siteFormContext    // Change type back to number

    return (
        <div className="flex flex-row w-full justify-around">
            {
                affinions.data.map((affinion: AffinionCardType) => {
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

    const siteFormContext = useContext(SiteFormContext)
    if (siteFormContext === null) throw new Error('SiteFormContext has to be used within <SiteFormContext.Provider>')
    const { controls } = siteFormContext

    const methods = useForm();
    const { handleSubmit, setValue } = methods;

    const siteSlug = useParams().Site;
    const { data, isError, isLoading } = useQuery({queryKey: ['activeSite', siteSlug], queryFn: () => fetchSiteBySlug(siteSlug)})
    if ( isError ) throw new Error('Could not fetch active site')
    if ( isLoading ) return (<p>Loading...</p>)

    setValue("affinion_id", affinion.affinion_id)
    setValue("site_id", data.site_id)

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
                        <Hba1cSection controlsData={controls} />
                        <LipidSection controlsData={controls} />
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