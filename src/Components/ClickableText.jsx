export default function ClickableText({label, action, customStyles}) {

    return (
        <button onClick={() => {
            if(action) action()
        }} className={`text-blue-400 underline text-sm font-normal cursor-pointer ${customStyles}`}>
            {label}
        </button>
    )
}