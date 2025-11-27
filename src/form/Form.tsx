import { useState } from "react"
import { Outlet } from "react-router"
import FormContext from "./context/FormContext"
import type { SiteData } from "@/types/site"

export default function Form () {

    const [site, setSite] = useState<SiteData | null>(null)

    return (
        <FormContext.Provider value={{site, setSite}}>
                <Outlet/>
        </FormContext.Provider>
    )

}






