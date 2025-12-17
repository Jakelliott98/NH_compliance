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
        <table className="bg-gray-100 border-separate border-spacing-y-2">
            <thead>
                <tr className="bg-gray-200">
                    <th></th>
                    <th className="text-sm font-semibold">Lower Range</th>
                    <th className="text-sm font-semibold">Upper Range</th>
                </tr>
            </thead>

            <tbody className="">
            <tr className="">
                <td className="text-center font-medium text-sm">C1</td>
                <td colSpan={2}></td>
            </tr>
            {
                test.map(test => {
                    return (
                        <tr key={`${test.type}C1`} className="font-medium text-sm">
                            <td>{test.title}</td>
                            <td className="text-center">
                                <input className="text-center w-3/12 bg-gray-200 rounded" type="number" step={0.1} {...register(`${test.type}.c1.low`, {required: "Please provide controls range", valueAsNumber: true})}/>
                            </td>
                            <td className="text-center">
                                <input className="text-center w-3/12 bg-gray-200 rounded" type="number" step={0.1} {...register(`${test.type}.c1.high`, {required: "Please provide controls range", valueAsNumber: true})}/>
                            </td>
                        </tr>
                    )
                })
            }
            <tr className="">
                <td className="text-center font-medium text-sm">C2</td>
                <td colSpan={2}></td>
            </tr>
            {
                test.map(test => {
                    return (
                        <tr key={`${test.type}C2`} className="font-medium text-sm">
                            <td>{test.title}</td>
                            <td className="text-center">
                                <input className="text-center w-3/12 bg-gray-200 rounded" type="number" step={0.1} {...register(`${test.type}.c2.low`, {required: "Please provide controls range", valueAsNumber: true})}/>
                            </td>
                            <td className="text-center">
                                <input className="text-center w-3/12 bg-gray-200 rounded" type="number" step={0.1} {...register(`${test.type}.c2.high`, {required: "Please provide controls range", valueAsNumber: true})}/>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}