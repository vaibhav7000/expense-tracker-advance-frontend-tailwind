export default function Input({label, action, type, placeHolder, id, ref, customStyles = ""}) {
    return (
        <div className={`flex ${customStyles}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input className="border p-2 border-gray-400 rounded-md focus:border-blue-400 transition-all duration-200" ref={ref} type={type} onChange={() => {
                if(action) action()
            }} placeholder={placeHolder} id={id} />
        </div>
    )
}