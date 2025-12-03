import { FormButtons } from "../SiteProfile";

const option = {
    title: 'New Result',
    text: 'Add a new set of affinion calibration results',
    value: 'Results-Form',
}

interface AddResultsProps {
    onSubmit: (value: string) => void,
}

export default function AddResults ({ onSubmit }: AddResultsProps) {

    return (
        <FormButtons option={option} onSubmit={onSubmit}/>
    )
}