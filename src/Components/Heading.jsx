export default function Heading({label, customStyles = ""}) {
    return (
        <>
            <div className={`${customStyles}`}>{label}</div>
        </>
    )
}