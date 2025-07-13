export default function Button({label, action, customStyles=""}) {

    return (
        <button onClick={() => {
            if (action) action()
        }} className={`bg-blue-500 text-white text-lg font-medium cursor-pointer py-2 hover:bg-blue-700 transition-all duration-200 ${customStyles}`}>
            {label}
        </button>
    )
}