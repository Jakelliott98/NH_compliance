
interface SubmitButtonProps {
    text: string,
    onSubmit: () => void,
}

export default function SubmitButton ({ text, onSubmit }: SubmitButtonProps) {

    return (
        <button 
            onClick={() => onSubmit}
            className="py-4 px-6 shadow-sm rounded-lg flex-1 cursor-pointer hover:shadow-lg hover:scale-105"
        >
            {text}
        </button>
    )
}