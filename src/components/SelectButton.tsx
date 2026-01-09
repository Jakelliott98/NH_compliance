
interface SelectButtonProps {
    text: string,
    onSelect: (selectedValue: string) => void,
    activeSelect: string,
}

function SelectButton ({ text, onSelect, activeSelect }: SelectButtonProps) {

    return (
        <button 
            onClick={() => onSelect(text)}
            className={`
                flex-grow py-2 px-4 bg-gray-100
                flex gap-1 items-center justify-center
                rounded border-1
                text-sm 
                cursor-pointer
                ${activeSelect === text ? 'bg-gray-300 text-gray-900 border-gray-500' : 'bg-gray-100 text-gray-500 border-gray-200'}
                `}
            >
                {text}
        </button>
    )
}

export default SelectButton;