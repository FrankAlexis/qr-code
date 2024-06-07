import { InputHTMLAttributes } from "react"

interface Props extends  InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function Input ({ 
    required = true,
    id,
    type = 'text',
    label
}: Props) {
    return (
        <div>
            <label 
                htmlFor={id} 
                className="block mb-2 text-sm font-medium text-black"
            >{label}</label>
            <input 
                type={type} 
                name={id} 
                id={id}
                required={required} 
                className="w-full bg-purple-50 border border-purple-300 text-black text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"  
            />
        </div>
    )
}