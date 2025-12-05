
interface ControlsSelectProps {
    onSelect: React.Dispatch<React.SetStateAction<string>>,
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ControlsSelect ({ onSelect, setIsFormOpen }: ControlsSelectProps) {

    return (
        <div>
            <p>Which calibration are you updating?</p>
            <div className="flex gap-5">
                <div className="p-4 bg-red-200 rounded flex-1 cursor-pointer" 
                    onClick={() => {
                        onSelect('hba1c')
                        setIsFormOpen(true)
                    }}
                >
                    <p className="text-center font-bold text-red-900">HBA1C</p>
                </div>
                <div 
                    className="p-4 bg-yellow-200 rounded flex-1 cursor-pointer"
                    onClick={() => {
                        onSelect('lipids')
                        setIsFormOpen(true)
                    }}
                >
                    <p className="text-center font-bold text-yellow-900">Lipids</p>
                </div>
            </div>
        </div>
    )
}
