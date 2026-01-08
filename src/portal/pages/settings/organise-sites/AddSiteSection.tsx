import { useFormContext } from "react-hook-form";

interface AddSiteSectionProps {
    onSubmit: () => void,
}

function AddSiteSection ({onSubmit}: AddSiteSectionProps) {

    const { register } = useFormContext();

    return (
        <form className="flex-2 flex flex-col gap-2" onSubmit={onSubmit}>
            <div className="flex flex-col gap-1">
                <p className="text-sm">Site Name</p>
                <input className="border border-gray-300 bg-gray-200 rounded p-1 px-2" {...register('siteName', {required: 'Provide a site name', })}/>
            </div>
            <div className="flex gap-3">
                <div className="flex flex-col gap-1 flex-1">
                    <p className="text-sm">Team Leader</p>
                    <input className="border border-gray-300 bg-gray-200 rounded p-1 px-2" {...register('teamLeader', {required: 'Provide a team leader'})}/>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <p className="text-sm">Region</p>
                    <input className="border border-gray-300 bg-gray-200 rounded p-1 px-2" {...register('region', {required: 'Provide a region'})}/>
                </div>
            </div>
            <button className="bg-gray-700 text-white py-2 px-4 rounded cursor-pointer shadow-sm hover:bg-gray-900 transition-colors duration-200 font-semibold" type="submit">Submit</button>
        </form>
    )
}

export default AddSiteSection;