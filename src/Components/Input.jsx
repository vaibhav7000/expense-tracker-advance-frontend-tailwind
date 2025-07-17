import { forwardRef } from "react"

const Input = forwardRef(({label, action, type, placeHolder, id, customStyles = ""}, ref) => {
    return (
        <div className={`flex ${customStyles}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input className="outline-2 outline-gray-200 p-2 border-gray-400 rounded-md focus:outline-blue-400 transition-all duration-200" ref={ref} type={type} onChange={() => {
                if(action) action()
            }} placeholder={placeHolder} id={id} />
        </div>
    )
})

export default Input;