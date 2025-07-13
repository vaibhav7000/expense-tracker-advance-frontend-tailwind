import { Outlet } from "react-router"


export default function AuthWrapper() {


    return (
        <div className="h-screen w-screen flex items-center justify-center bg-blue-300">
            <div className="flex w-[30%] p-10 flex-col rounded-2xl gap-y-4 justify-center bg-white">
                <Outlet/>
            </div>
        </div>
    )
}