import { useForm } from "react-hook-form"
import { Link } from "react-router"

export default function SiteForm () {

    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>What site are you looking for?</p>
            <input placeholder="What site are you looking for?" type="text" {...register("site_location")}/>
            <Link to="Options"><button type='submit'>Search</button></Link>
        </form>
    )
}