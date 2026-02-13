
interface ControlsSelectProps {
    onSelect: React.Dispatch<React.SetStateAction<string>>,
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ControlsSelect ({ onSelect, setIsFormOpen }: ControlsSelectProps) {

    return (
        <div>
            <p>Select a calibration to update</p>
            <div className="flex gap-5 pt-5">
                <div className="py-4 px-6 shadow-sm bg-warning rounded-lg flex-1 cursor-pointer hover:shadow-lg hover:scale-105" 
                    onClick={() => {
                        onSelect('hba1c')
                        setIsFormOpen(true)
                    }}
                >
                    <p className="text-center font-bold text-orange-100">HBA1c</p>
                </div>
                <div 
                    className="py-4 px-6 bg-yellow-100 shadow-sm rounded-lg flex-1 cursor-pointer hover:shadow-lg hover:scale-105"
                    onClick={() => {
                        onSelect('lipids')
                        setIsFormOpen(true)
                    }}
                >
                    <p className="text-center font-bold text-yellow-900/75">Lipids</p>
                </div>
            </div>
        </div>
    )
}
