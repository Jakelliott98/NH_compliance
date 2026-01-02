import { SitePage } from "./SitePage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function SiteProfile () {

    return (
        <div className="w-10/12 h-11/12 flex flex-col gap-5 p-5 bg-gray-100 rounded shadow-sm">  
                <SitePage />
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
}

export function FormButtons ({ option }: FormButtonsProps) {

        return (
                <div 
                        className="
                                h-full bg-gray-200 rounded p-5 cursor-pointer 
                                flex flex-col justify-center items-center gap-1 
                                shadow-md 
                                transition-all duration-200 ease-out
                                hover:shadow-lg hover:translate-y-0.5
                                active:shadow-inner active:translate-y-0 active:scale-95
                        " 
                >        
                        <FontAwesomeIcon className="text-3xl" icon={faPlus} />
                        <h1 className="text-xl font-bold">{ option.title }</h1>
                        <p className="text-sm"> {option.text} </p>
                        <p className="text-xs text-red-500 italic text-center">{ option.optionalText ? option.optionalText : '' }</p>
                </div>
        )
}