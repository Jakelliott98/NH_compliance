import { useState } from "react"
import { Outlet } from "react-router"
import FormContext from "./FormContext"

export default function Form () {

    const [site, setSite] = useState()

    return (
        <FormContext.Provider value={{site, setSite}}>
            <div>
                <Outlet/>
            </div>
        </FormContext.Provider>
    )

}






