import { useFormContext } from "react-hook-form";

interface TestObjectType {
    title: string,
    type: string,
}

interface InputTableProps {
    test: TestObjectType[],
}

export default function InputTable ({ test }: InputTableProps) {

    const { register } = useFormContext();

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Lower Range</th>
                    <th>Upper Range</th>
                </tr>
            </thead>

            <tbody>
            <tr>
                <td>C1</td>
            </tr>
            {
                test.map(test => {
                    return (
                        <tr key={`${test.type}C1`}>
                            <td>{test.title}</td>
                            <td>
                                <input type="number" {...register(`${test.type}.c1.low`, {required: "Please provide controls range", valueAsNumber: true})}/>
                            </td>
                            <td>
                                <input type="number" {...register(`${test.type}.c1.high`, {required: "Please provide controls range", valueAsNumber: true})}/>
                            </td>
                        </tr>
                    )
                })
            }
            <tr>
                <td>C2</td>
            </tr>
            {
                test.map(test => {
                    return (
                        <tr key={`${test.type}C2`}>
                            <td>{test.title}</td>
                            <td>
                                <input type="number" {...register(`${test.type}.c2.low`, {required: "Please provide controls range", valueAsNumber: true})}/>
                            </td>
                            <td>
                                <input type="number" {...register(`${test.type}.c2.high`, {required: "Please provide controls range", valueAsNumber: true})}/>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}