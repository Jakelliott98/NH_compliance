import InputTable from "./InputTable"

const hba1cOption = [{
    title: 'HBA1c',
    type: 'hba1c',
}]

export default function HBA1cForm () {

    return (
            <InputTable test={hba1cOption}/>
    )
}