import { useNavigate } from "react-router"
import { SiteHeader } from "../components/SiteHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function OptionForms () {

    const navigate = useNavigate();
    const onSubmit = (newPage: string) => { navigate(newPage) }

    return (
        <div className="w-9/12 h-10/12 flex flex-col gap-5 p-5 bg-gray-200 rounded">  
                <SiteHeader onSubmit={onSubmit}/>
        </div>
    )

}

interface FormButtonOption {
        title: string,
        text: string,
        value: string,
        optionalText? : string,
}

interface FormButtonsProps {
        option: FormButtonOption,
        onSubmit: (value: string) => void,
}

export function FormButtons ({ option, onSubmit }: FormButtonsProps) {

        return (
                <div className="bg-gray-300 h-full rounded p-5 cursor-pointer flex flex-col justify-center items-center gap-1" onClick={() => {onSubmit(option.value)}}>
                        <FontAwesomeIcon className="text-3xl" icon={faPlus} />
                        <h1 className="text-xl font-bold">{ option.title }</h1>
                        <p className="text-sm"> {option.text} </p>
                        <p className="text-xs text-red-500 italic text-center">{ option.optionalText ? option.optionalText : '' }</p>
                </div>
        )
}