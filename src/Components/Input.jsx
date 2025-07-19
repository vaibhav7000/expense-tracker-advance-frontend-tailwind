import { forwardRef, useCallback, useMemo, useState } from "react";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';


const Input = forwardRef(({label, action, type, placeHolder, id, customStyles = "", showEye = false}, ref) => {
    const [showEyeIcon, setShowEyeIcon] = useState(true);

    const inputType = useMemo(function() {
        return showEye ? showEyeIcon ? type : "text" : type 
    }, [showEyeIcon]);

    const toggleEyeIcon = useCallback(function() {
        setShowEyeIcon((value) => !value);
    }, []);

    return (
        <div className={`flex relative ${customStyles}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input className="outline-2 outline-gray-200 p-2 border-gray-400 rounded-md focus:outline-blue-400 transition-all duration-200" ref={ref} type={inputType} onChange={() => {
                if(action) action()
            }} placeholder={placeHolder} id={id} />

            {
                showEye &&
                <div className="absolute w-6 aspect-square right-4 top-[55%]">
                    {showEyeIcon ? <EyeIcon onClick={toggleEyeIcon}/> : <EyeSlashIcon onClick={toggleEyeIcon}/>}
                </div>
            }
        </div>
    )
})

export default Input;