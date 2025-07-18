export default function Card({children, customStyles = ""}) {

    return (
        <div className={`bg-white px-10 py-10 drop-shadow-xl/50 h-full rounded-2xl ${customStyles}`}>
            {children}
        </div>
    )
}