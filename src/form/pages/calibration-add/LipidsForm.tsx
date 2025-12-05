import InputTable from "./InputTable"

const lipidsTable = [{title: 'Total Cholesterol', type: 'total'}, {title: 'HDL Cholesterol', type: 'hdl'}, {title: 'Triglycerides', type: 'triglycerides'}]

export default function LipidsForm () {

   return (
        <InputTable test={lipidsTable}/>
   )
}