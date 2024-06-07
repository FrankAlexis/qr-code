'use client'
import { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';

interface Props  {
    label: string
    id: string
}
export default function HexadecimalPicker ({ label, id}: Props) {
    const ref = useRef<MutableRefObject<LegacyRef<HTMLDivElement> | undefined>>(null);
    const [showPicker, setShowPicker] = useState(false)
    const [color, setColor] = useState<string>('#000000')

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (ref.current && !ref.current.contains(event.target)) {
            setShowPicker(prev => !prev)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);

    return (       
        <div className="">
            <label 
                htmlFor={id} 
                className="block mb-2 text-sm font-medium text-black"
            >{label}</label>
            <input className='hidden' id={id} name={id} value={color} />
            <button style={{ color: color }} onClick={() => setShowPicker(prev => !prev)} className="text-white end-2.5 bottom-2.5 border border-purple-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 h-max">{color}</button>
            {showPicker && 
                <div ref={ref} className='relative'>
                    <SketchPicker className='absolute' color={color} onChange={(colorResult) => setColor(colorResult.hex)} />
                </div>
            }
        </div>   
    )
}