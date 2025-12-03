import { Outlet } from "react-router"
import { useContext } from "react"
import FormContext from "../context/FormContext"

export default function FormHolder () {

    const context = useContext(FormContext)

    if (context === null) throw new Error('Error fetching the site')
    const { site } = context;
    if (site === null) throw new Error('Component rendered without site being selected')

    return (
        <>
            <Outlet />
        </>
    )
}