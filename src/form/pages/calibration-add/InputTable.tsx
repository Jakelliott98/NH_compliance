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
                                <input {...register(`${test.type}_c1_low`, {required: "Please provide controls range"})}/>
                            </td>
                            <td>
                                <input {...register(`${test.type}_c1_high`, {required: "Please provide controls range"})}/>
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
                                <input {...register(`${test.type}_c2_low`, {required: "Please provide controls range"})}/>
                            </td>
                            <td>
                                <input {...register(`${test.type}_c2_high`, {required: "Please provide controls range"})}/>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}