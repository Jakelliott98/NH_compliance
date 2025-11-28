import { useNavigate } from "react-router"
import { Outlet } from "react-router"
import { SiteHeader } from "../components/SiteHeader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faFlaskVial, faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function OptionForms () {

    const navigate = useNavigate();
    const onSubmit = (newPage: string) => { navigate(newPage) }

    return (
        <div className="w-9/12 h-10/12 flex flex-col gap-5 p-5 bg-gray-200 rounded">  
                <SiteHeader />
                <div className="flex gap-5 w-full justify-center">
                        {
                                FormButtonOptions.map((option) => {
                                        return (
                                                <FormButtons option={option} onSubmit={onSubmit} />
                                        )
                                })
                        }
                </div>
                <Outlet />
        </div>
    )

}

interface FormButtonOption {
        icon: IconProp,
        title: string,
        text: string,
        value: string,
        optionalText? : string,
}

const FormButtonOptions:  FormButtonOption[] = [
        {
                icon: faSquarePollVertical,
                title: 'Add Result',
                text: 'Add a new set of affinion calibration results',
                value: 'Results-Form',
        },
        {
                icon: faFlaskVial,
                title: 'Add Calibration Fluids',
                text: 'Add a new calibration fluid.',
                optionalText: 'Note this will automatically replace the old calibration fluid.',
                value: 'Calibration-Form',
        },
        {
                icon: faFileLines,
                title: 'Add affinions',
                text: 'Add a new affinion to your site.',
                value: 'Affinion-Form',
        }
]

interface FormButtonsProps {
        option: FormButtonOption,
        onSubmit: (value: string) => void,
}

function FormButtons ({ option, onSubmit }: FormButtonsProps) {

        return (
                <div className="bg-green-200 h-full rounded-xl p-5 cursor-pointer flex flex-col justify-center items-center gap-1" onClick={() => {onSubmit(option.value)}}>
                        <FontAwesomeIcon className="text-3xl" icon={option.icon} />
                        <h1 className="text-xl font-bold">{ option.title }</h1>
                        <p className="text-sm"> {option.text} </p>
                        <p className="text-xs text-red-500 italic">{ option.optionalText ? option.optionalText : '' }</p>
                </div>
        )
}